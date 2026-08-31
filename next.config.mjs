/**
 * The site is deployed to GitHub Pages, which is static hosting, so the whole app is
 * exported to plain files at build time. Every route is already static or SSG, so
 * nothing is lost — but note that this rules out API routes and server actions. If the
 * contact form ever needs a real server endpoint it has to be an external service, not
 * an `app/api/**` route.
 *
 * Pages serves a project repo from a subpath (olvix-ai.github.io/OlvixAI-Portfolio), so
 * basePath and assetPrefix have to match it or every asset 404s. It's read from the
 * environment rather than hardcoded so a local `npm run build` still produces a
 * root-relative site, and so moving to olvix.io later is a one-line change in
 * .github/workflows/deploy.yml (clear the value, add public/CNAME).
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  // Emit `about/index.html` rather than `about.html`, so static hosts resolve
  // extensionless URLs without per-host rewrite rules.
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
