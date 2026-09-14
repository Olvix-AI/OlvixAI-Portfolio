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
 *    paste this whole file in, and save. Opening the editor this way binds the
 *    script to the sheet, which is what lets `getActiveSpreadsheet()` find it
 *    with no further configuration.
 *
 *    If instead this is a STANDALONE script project, it has no active
 *    spreadsheet and you must point it at one: Project Settings (gear) >
 *    Script Properties > add SPREADSHEET_ID, with the sheet's ID as the value.
 *    See SPREADSHEET_ID_PROPERTY below. Every submission fails with a plain
 *    "No spreadsheet found" until you do.
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

/**
 * Name of the script property holding the target spreadsheet's ID.
 *
 * Set it once in the Apps Script editor:
 *
 *     Project Settings (gear) > Script Properties > Add script property
 *       Property: SPREADSHEET_ID
 *       Value:    the long token in the sheet's URL, between /d/ and /edit
 *                 https://docs.google.com/spreadsheets/d/<THIS PART>/edit
 *
 * It lives OUTSIDE the code on purpose, and this is worth understanding before
 * changing it back to a constant. A constant has to be re-entered every time
 * this file is pasted into the editor — forget once and every submission fails
 * with "No spreadsheet found" until someone notices. A script property survives
 * pastes, redeploys and version changes, so the repo copy of this file is
 * complete and safe to paste over the top at any time.
 *
 * It also keeps the ID out of a public repo's history. The ID is not a
 * credential and grants nothing by itself, but it is the one thing an attacker
 * would need if the sheet's sharing were ever loosened by accident.
 *
 * Only needed when the script is a STANDALONE project. If it lives inside the
 * sheet (Extensions > Apps Script) then getActiveSpreadsheet() finds it with no
 * configuration at all — but setting the property is harmless either way, so
 * when in doubt, set it.
 */
const SPREADSHEET_ID_PROPERTY = 'SPREADSHEET_ID';

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

/**
 * How long an already-handled submissionId is remembered, in seconds. 6 hours
 * is the CacheService maximum, and vastly longer than the seconds-apart retry
 * this exists for.
 *
 * The client retries a submission whose reply it could not read — Google's
 * redirect hop is not reliably readable cross-origin, and the POST lands even
 * when the answer does not. Without this the retry would write the message a
 * second time. Cache entries can be evicted early under memory pressure, so
 * this makes a duplicate very unlikely rather than impossible; the failure mode
 * is one repeated row, which is the right way round.
 */
const DEDUPE_TTL_SECONDS = 21600;

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
    var written = appendRow(values, str(data.submissionId).slice(0, 100));

    // A retry of something already recorded. Say ok — it IS recorded — but do
    // not mail a second copy of it.
    if (!written) {
      return json({ ok: true, duplicate: true });
    }

    try {
      notify(values);
    } catch (err) {
      // Already saved. Log and still report success — the visitor did nothing
      // wrong and the message is not lost.
      console.error('Notification email failed: ' + err);
    }

    return json({ ok: true });
  } catch (err) {
    console.error('doPost failed: ' + (err && err.stack ? err.stack : err));
    // A misconfiguration is about our own setup, not about the visitor or their
    // data, so it is safe — and much faster to diagnose — to say it out loud.
    // Anything else stays generic.
    if (err && err.isConfigError) {
      return json({ ok: false, error: err.message });
    }
    return json({ ok: false, error: 'Server error' });
  }
}

/** Marks an error as a setup problem, so doPost can report it verbatim. */
function configError(message) {
  var err = new Error(message);
  err.isConfigError = true;
  return err;
}

/**
 * Opening the /exec URL in a browser is a GET. Answer something honest so it
 * does not look broken while you are checking the deployment is live.
 */
function doGet() {
  return json({ ok: true, service: 'olvix.io contact form', method: 'POST' });
}

/**
 * Diagnostic. Run it from the Apps Script editor (select it in the toolbar
 * dropdown, press Run, read the Execution log) to find out exactly which file
 * and tab submissions are landing in.
 *
 * Worth reaching for when a submission returns ok but you cannot find the row:
 * a successful append always wrote SOMEWHERE, and it is nearly always either a
 * tab you have not scrolled to or a different spreadsheet than the one you
 * have open. This prints both, so you stop guessing.
 *
 * Not a doGet/doPost, so it is not reachable from the web.
 */
function logTargetSheet() {
  var sheet = getSheet();
  var ss = sheet.getParent();
  console.log('Spreadsheet: ' + ss.getName());
  console.log('URL:         ' + ss.getUrl());
  console.log('Tab:         ' + sheet.getName());
  console.log('Rows used:   ' + sheet.getLastRow() + ' (1 of them is the header)');
}

/* -------------------------------------------------------------------------- */

/**
 * Writes one submission. Returns true if it was written, false if this
 * submissionId has already been recorded and this is a retry of it.
 *
 * The dedupe check and the write both happen inside the lock, so two copies
 * arriving at the same instant cannot both decide they are the first.
 */
function appendRow(values, submissionId) {
  // Two submissions arriving together would otherwise race for the same row.
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var cache = CacheService.getScriptCache();
    var key = submissionId ? 'sub:' + submissionId : null;

    if (key && cache.get(key)) {
      return false;
    }

    var sheet = getSheet();
    var row = [new Date()];
    for (var i = 0; i < FIELDS.length; i++) {
      row.push(values[FIELDS[i].key]);
    }
    sheet.appendRow(row);

    // Only after the row is safely down. Marking it earlier would let a failed
    // write silently swallow the retry that would have rescued it.
    if (key) {
      cache.put(key, '1', DEDUPE_TTL_SECONDS);
    }

    return true;
  } finally {
    lock.releaseLock();
  }
}

function getSheet() {
  var id = PropertiesService.getScriptProperties().getProperty(
    SPREADSHEET_ID_PROPERTY
  );

  var ss = id
    ? SpreadsheetApp.openById(id)
    : SpreadsheetApp.getActiveSpreadsheet();

  if (!ss) {
    // Standalone script with no script property set. Worth naming precisely:
    // otherwise this surfaces as a generic "Server error" and looks like a
    // problem with the site rather than a one-line setup miss.
    throw configError(
      'No spreadsheet found. This script is not bound to a sheet, so set the ' +
        SPREADSHEET_ID_PROPERTY +
        ' script property (Project Settings > Script Properties).'
    );
  }

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
