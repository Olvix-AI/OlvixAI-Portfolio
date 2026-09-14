/**
 * OlvixAI — contact form backend
 * ==============================
 *
 * olvix.io is a static export on GitHub Pages, which has no server-side
 * runtime of any kind: no API routes, no server actions, no functions. This
 * Google Apps Script web app is the endpoint the contact form posts to. It
 * appends every submission to a Google Sheet and emails email@olvix.io.
 *
 * Client side: `submitContactForm()` in components/contact/contact-form.tsx.
 *
 *
 * DEPLOYING IT
 * ------------
 * 1. Create a Google Sheet — name it something like "OlvixAI — Contact form".
 *    Use a Google account the whole team can reach; the sheet IS the database
 *    and the notification email sends FROM this account.
 *
 * 2. In that sheet: Extensions > Apps Script. Delete the stub `myFunction`,
 *    paste this whole file in, and save. The script must stay bound to the
 *    sheet — `getActiveSpreadsheet()` below is what makes it find it.
 *
 * 3. Deploy > New deployment > gear icon > Web app.
 *      Description:     olvix.io contact form
 *      Execute as:      Me
 *      Who has access:  Anyone            <- NOT "Anyone with a Google account"
 *    Deploy, then authorise. Google will warn that the app is unverified:
 *    Advanced > Go to <project> (unsafe). That warning is about your own
 *    unpublished script, not about the site.
 *
 * 4. Copy the Web app URL. It ends in `/exec` — the `/dev` URL requires a
 *    logged-in Google session and will fail for visitors. Paste it into
 *    CONTACT_ENDPOINT in components/contact/contact-form.tsx and redeploy the
 *    site.
 *
 *
 * CHANGING IT LATER — the one thing that catches everybody
 * --------------------------------------------------------
 * Saving the script does NOT update the live web app. The /exec URL keeps
 * serving the version that was deployed. After every edit:
 *
 *      Deploy > Manage deployments > (pencil) > Version: New version > Deploy
 *
 * That keeps the same URL. Creating a *new deployment* instead gives you a new
 * URL and leaves the old code live on the old one.
 *
 *
 * WHY THE CLIENT POSTS text/plain
 * -------------------------------
 * A cross-origin POST with `Content-Type: application/json` makes the browser
 * send a preflight OPTIONS request first, and Apps Script cannot answer one.
 * A string body defaults to `text/plain;charset=UTF-8`, which is CORS
 * safelisted, so the preflight is skipped. The body is still JSON — only the
 * declared type differs, which is why this file parses it by hand below.
 *
 *
 * LIMITS WORTH KNOWING
 * --------------------
 * - MailApp is capped per day: 100 recipients on a consumer @gmail account,
 *   1,500 on Workspace. Far above this form's volume, but if the cap is ever
 *   hit the send throws and the submission is still safely in the sheet —
 *   which is why the append happens first.
 * - Apps Script never exposes the caller's IP, so there is no rate limiting
 *   here. The honeypot is the only spam control. If real spam starts arriving,
 *   the upgrade is Cloudflare Turnstile with the secret verified in doPost.
 */

/** Tab the submissions land on. Created automatically if it is missing. */
const SHEET_NAME = 'Submissions';

/** Where the notification goes. The shared inbox, not a personal address. */
const NOTIFY_TO = 'email@olvix.io';

/** Display name on the notification email. */
const NOTIFY_FROM_NAME = 'olvix.io contact form';

/**
 * Fields in the order they appear in the sheet, with the caps applied server
 * side. Client validation is a UX affordance — anything can POST here, so
 * these are the real limits.
 */
const FIELDS = [
  { key: 'name', label: 'Name', max: 120, required: true },
  { key: 'email', label: 'Email', max: 200, required: true },
  { key: 'company', label: 'Company', max: 300, required: false },
  { key: 'need', label: 'What they need', max: 200, required: true },
  { key: 'project', label: 'Project', max: 5000, required: true },
  { key: 'timeline', label: 'Timeline', max: 80, required: false },
  { key: 'budget', label: 'Budget', max: 80, required: false },
  { key: 'source', label: 'How they found us', max: 500, required: false },
];

/** Same shape as the client's EMAIL_PATTERN. Deliberately loose. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Anything larger than this is not a person filling in a form. */
const MAX_PAYLOAD_BYTES = 20000;

/**
 * Hidden field the form renders off-screen. A human never sees it; bots fill
 * every input they find. The client already drops these before posting, so
 * this only catches something posting straight at the endpoint.
 */
const HONEYPOT_FIELD = 'website_url';

/* -------------------------------------------------------------------------- */

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return json({ ok: false, error: 'Empty request body' });
    }

    if (e.postData.contents.length > MAX_PAYLOAD_BYTES) {
      return json({ ok: false, error: 'Payload too large' });
    }

    var data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (err) {
      return json({ ok: false, error: 'Body is not valid JSON' });
    }

    if (!data || typeof data !== 'object') {
      return json({ ok: false, error: 'Body is not an object' });
    }

    // Honeypot tripped. Answer exactly like a success so a bot learns nothing,
    // and record nothing.
    if (str(data[HONEYPOT_FIELD])) {
      return json({ ok: true });
    }

    var values = {};
    for (var i = 0; i < FIELDS.length; i++) {
      var field = FIELDS[i];
      var value = str(data[field.key]).slice(0, field.max);
      if (field.required && !value) {
        return json({ ok: false, error: 'Missing required field: ' + field.key });
      }
      values[field.key] = value;
    }

    if (!EMAIL_PATTERN.test(values.email)) {
      return json({ ok: false, error: 'Invalid email address' });
    }

    // The sheet is the record of truth, so write it before anything that can
    // fail. A bounced notification must never lose the submission.
    appendRow(values);

    try {
      notify(values);
    } catch (err) {
      // Already saved. Log and still report success — the visitor did nothing
      // wrong and the message is not lost.
      console.error('Notification email failed: ' + err);
    }

    return json({ ok: true });
  } catch (err) {
    console.error('doPost failed: ' + err);
    return json({ ok: false, error: 'Server error' });
  }
}

/**
 * Opening the /exec URL in a browser is a GET. Answer something honest so it
 * does not look broken while you are checking the deployment is live.
 */
function doGet() {
  return json({ ok: true, service: 'olvix.io contact form', method: 'POST' });
}

/* -------------------------------------------------------------------------- */

function appendRow(values) {
  // Two submissions arriving together would otherwise race for the same row.
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var sheet = getSheet();
    var row = [new Date()];
    for (var i = 0; i < FIELDS.length; i++) {
      row.push(values[FIELDS[i].key]);
    }
    sheet.appendRow(row);
  } finally {
    lock.releaseLock();
  }
}

function getSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    var header = ['Received'];
    for (var i = 0; i < FIELDS.length; i++) {
      header.push(FIELDS[i].label);
    }
    sheet.appendRow(header);
    sheet.getRange(1, 1, 1, header.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function notify(values) {
  var lines = [];
  for (var i = 0; i < FIELDS.length; i++) {
    var field = FIELDS[i];
    lines.push(field.label + ': ' + (values[field.key] || '—'));
  }
  lines.push('');
  lines.push('Received ' + new Date().toISOString());

  var subject = 'olvix.io — ' + values.name;
  if (values.company) {
    subject += ' (' + values.company + ')';
  }

  MailApp.sendEmail({
    to: NOTIFY_TO,
    // Reply goes straight back to whoever wrote in, not to the script owner.
    replyTo: values.email,
    name: NOTIFY_FROM_NAME,
    subject: subject,
    body: lines.join('\n'),
  });
}

/* -------------------------------------------------------------------------- */

/** Coerce anything to a trimmed string. Guards against nulls, numbers, objects. */
function str(value) {
  if (value === null || value === undefined) return '';
  return String(value).trim();
}

/**
 * ContentService cannot set an HTTP status code — every response is 200, so
 * the client reads `ok` out of the body rather than trusting res.ok alone.
 */
function json(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
