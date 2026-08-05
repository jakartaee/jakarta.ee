# Jakarta EE — Netlify to Eclipse Foundation Infrastructure Migration Plan

## 1. Current Hosting Setup

### Website

jakarta.ee is a Hugo static site hosted on Netlify (site name: `jakartaee`). All CI/CD,
hosting, SSL, DNS routing, and HTTP-level features (redirects, headers, PR previews) are
currently managed entirely by Netlify via `netlify.toml`.

- **Build command:** `npm run build_netlify && hugo`
  - `npm run build_netlify` runs webpack (compiles Less and JS assets) then clones the
    specifications repository via `build.sh`
  - Hugo generates the final static site into `public/`
- **Runtime:** Node 22.14.0, Hugo 0.144.2
- **Languages:** English (default), Japanese, Chinese Simplified

### Specifications Documentation

The Jakarta EE specifications are **not a separately hosted site**. They are fetched at build
time by `build.sh`, which:

1. Clones `https://github.com/jakartaee/specifications.git` into `content/specifications`
2. Moves HTML files (API documentation) into `static/specifications` so Hugo serves them as
   static assets
3. Creates language copies (`.ja.md`, `.zh.md`) for every spec page

This means every build of jakarta.ee pulls a fresh snapshot of the specifications repository.
There is no separate hosting to migrate for the specifications — they are rebuilt as part of
the main site on every deployment.

### PR Preview Integration

Netlify automatically generates a unique preview URL for every pull request using the
`$DEPLOY_PRIME_URL` environment variable, which is injected as Hugo's `baseURL` at build time:

```
command = "npm run build_netlify && hugo -b $DEPLOY_PRIME_URL"
```

This is the primary integration used by the development team to review changes before merging.
Because the specifications are cloned fresh on every build, PR previews include the current
state of the specs repository.

---

## 2. Build, Redirect, DNS, and Deployment Requirements

### Build Requirements

| Requirement | Current (Netlify) | Target (Eclipse Infra) |
|---|---|---|
| Hugo version | 0.144.2 | 0.144.2 (unchanged) |
| Node version | 22.14.0 | 22.14.0 (unchanged) |
| Build container | Netlify-managed | `eclipsefdn/hugo-node:h0.144.2-n22.14.0` |
| Asset compilation | `npm run production` (webpack/Laravel Mix) | Same |
| Specifications clone | `bash build.sh` (GitHub, public repo) | Same — build container needs outbound access to `github.com` |
| PR preview baseURL | `hugo -b $DEPLOY_PRIME_URL` (Netlify injects) | releng-pipeline injects via `branchDomain` parameter |

### Redirect Requirements

All redirect rules currently live in `static/_redirects` (Netlify format). These must be
ported to `config/nginx/default.conf` (nginx format) in the repository, which the
releng-pipeline deploys into the nginx container.

**301 redirects** (straightforward path rewrites):

| From | To |
|---|---|
| `/meeting_minutes` | `/about/meeting_minutes` |
| `/meeting_minutes/marketing_committee/*` | `/about/meeting_minutes/marketing_committee/*` |
| `/meeting_minutes/steering_committee/*` | `/about/meeting_minutes/steering_committee/*` |
| `/meeting_minutes/specification_committee/*` | `/about/meeting_minutes/specification_committee/*` |
| `/newsletter` | `/community/newsletter` |
| `/about` | `/about/working-group` |
| `/compatibility/get_listed/` | `/compatibility/get-listed/` |
| `/events` | `/community/events` |
| `/getinvolved` | `/community/get-involved` |

**Proxy rules** (Netlify 200-masking, must become nginx `proxy_pass`):

| Path | Upstream | Notes |
|---|---|---|
| `/learn/docs/*` | `https://jakartaee.github.io/jakartaee-documentation/` | nginx container needs outbound HTTPS to `jakartaee.github.io` |
| `/learn/jakartaee-tutorial/*` | `https://jakartaee.github.io/jakartaee-documentation/jakartaee-tutorial/` | Same upstream |
| `/blogs/jakartablogs.xml` | `https://jakartablogs.ee/rss20.xml` | nginx container needs outbound HTTPS to `jakartablogs.ee` |

**Subdomain proxies** (require infra team decision — cannot be handled in-repo alone):

| Subdomain | Upstream |
|---|---|
| `start.jakarta.ee` | `https://jakarta-ee-starter.azurewebsites.net/` |
| `mail.jakarta.ee` | `https://eclipse-ee4j.github.io/mail/` |

These are currently handled by Netlify at the edge. On Eclipse infra they need either
separate Kubernetes services or additional `server {}` blocks in the nginx config, with DNS
records updated accordingly.

### HTTP Header Requirements

The following headers are currently set by Netlify and must be reproduced on Eclipse infra.
They belong in the **Puppet nginx config** (`projects-it`) managed by the infra team — not in
the in-repo `config/nginx/default.conf` — consistent with how all other EF Hugo sites handle
server-level headers.

| Header | Value |
|---|---|
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains; preload` |
| `Content-Security-Policy` | `default-src https: 'unsafe-eval' 'unsafe-inline'; object-src 'none'; frame-ancestors 'self'; img-src https: data:` |
| `X-Frame-Options` | `SAMEORIGIN` |
| `X-XSS-Protection` | `1; mode=block` |
| `X-Content-Type-Options` | `nosniff` |
| `Access-Control-Allow-Origin` | `*` (fonts only) |
| `Link` (canonical) | Per-path canonical headers for specification HTML pages (currently in `static/_headers`) |

### DNS Requirements

Jakarta.ee's DNS is currently managed **inside Netlify** (not via an external registrar).
The Eclipse Foundation uses **Cloudflare** for DNS management. The cutover therefore has two
distinct parts: shifting traffic (update DNS at Netlify) and transferring ownership of the
domain (move from Netlify to Cloudflare). These are done as separate steps to reduce risk —
see Phase 4 for the full sequence.

- Confirm the Eclipse nginx gateway IP/hostname with the infra team before cutover
- Reduce TTL for `jakarta.ee` to 300 seconds at Netlify, at least 24 hours before cutover
- Update DNS records at Netlify to point to Eclipse nginx (traffic cutover — domain stays at Netlify temporarily)
- Transfer domain from Netlify to Cloudflare and re-create DNS records there
- Confirm handling of `start.jakarta.ee` and `mail.jakarta.ee` subdomains before cutover
- SSL certificate provisioning for `jakarta.ee` (and subdomains) on EF infra

### Deployment Requirements

The Eclipse Foundation uses the `releng-pipeline` Jenkins shared library for all Hugo sites.
The deployment model is: Jenkins builds a Docker image containing the Hugo-generated static
site, pushed to a container registry, and served via nginx on Kubernetes.

**New files required in the repository:**

- `Jenkinsfile` — calls the releng-pipeline `hugo()` function with site-specific parameters
- `build.sh` — CI entry point: installs dependencies, compiles assets, clones specs
- `build-specs.sh` — renamed from the current `build.sh` (specs clone logic only)
- `config/nginx/default.conf` — application-level nginx config (redirects, proxies, error pages)

---

## 3. Migration Plan

### Phase 1 — Source changes (dev team, this repo)

Add all files needed for the Jenkins pipeline to build and deploy the site. Netlify remains
active throughout this phase.

- [ ] Add `Jenkinsfile` using the `releng-pipeline` shared library
- [ ] Rename `build.sh` → `build-specs.sh` (specs clone logic, no other changes)
- [ ] Add new `build.sh` as the CI entry point (`yarn install` → `yarn build` → Hugo handled by pipeline)
- [ ] Add `build` script to `package.json` (`npm run production && npm run specifications`)
- [ ] Update `specifications` script in `package.json` to reference `build-specs.sh`
- [ ] Create `config/nginx/default.conf` with:
  - 301 redirects ported from `static/_redirects`
  - `proxy_pass` rules for `/learn/docs/`, `/learn/jakartaee-tutorial/`, `/blogs/jakartablogs.xml`
  - Error page configuration (403, 404, 50x)
- [ ] Keep `netlify.toml`, `static/_redirects`, and `static/_headers` in place (Netlify stays live)

### Phase 2 — Infra team: provisioning

- [ ] Create Puppet nginx config for `jakarta.ee` in `projects-it` with:
  - Virtual host and SSL termination
  - Security headers (HSTS, CSP, X-Frame-Options, X-XSS-Protection, X-Content-Type-Options)
  - CORS header for font files
  - Canonical `Link` headers for specification pages (ported from `static/_headers`)
- [ ] Confirm subdomain proxy approach for `start.jakarta.ee` and `mail.jakarta.ee`
- [ ] Register `jakarta.ee` in the Eclipse Foundation Jenkins instance
- [ ] Connect the GitHub repository to Jenkins (Ask Releng to create webhook)
- [ ] Confirm the Eclipse nginx gateway IP/hostname — needed for the DNS update at Netlify in Phase 4a
- [ ] Confirm outbound network access from the build container to `github.com`
- [ ] Confirm outbound HTTPS from the nginx container to `jakartaee.github.io` and `jakartablogs.ee`

### Phase 3 — Validation on Eclipse infra

Run both Netlify (production) and Eclipse infra (staging) in parallel.

- [ ] Trigger a test build on the Jenkins pipeline — confirm clean build and specs clone
- [ ] Confirm PR preview URLs are generated with the correct baseURL
- [ ] Validate all 301 redirects (status and destination)
- [ ] Validate all proxy rules (`/learn/docs/`, `/learn/jakartaee-tutorial/`, `/blogs/jakartablogs.xml`)
- [ ] Validate security headers (via Puppet config)
- [ ] Validate canonical `Link` headers on specification HTML pages
- [ ] Validate font CORS header
- [ ] Validate multi-language pages (ja, zh) render correctly
- [ ] Run a full broken-link check against the staging URL
- [ ] Validate Google Analytics tag is firing (UA-910670-30)

### Phase 4 — DNS cutover

DNS is currently managed inside Netlify. The Eclipse Foundation uses Cloudflare. Cutting over
requires two separate steps: first shift traffic by updating DNS at Netlify (low risk, easy to
revert), then transfer the domain to Cloudflare once traffic is confirmed stable.

#### Phase 4a — Update DNS at Netlify to point to Eclipse infra

- [ ] Confirm Phase 3 validation is complete and all items pass
- [ ] Notify Jakarta EE Working Group that PR preview URLs will change after cutover (new previews
  will come from Eclipse infra with a different URL format; existing Netlify preview links remain
  accessible but no new ones will be generated there)
- [ ] Confirm infra and dev teams are available to monitor during the DNS record update
- [ ] Reduce DNS TTL for `jakarta.ee` to 300 seconds at Netlify — at least 24 hours before cutover
  (TTL controls how long DNS resolvers cache the record; a lower value means that when the record
  is updated to point to Eclipse infra, the change propagates to users faster — 5 minutes instead
  of potentially hours with a default TTL)
- [ ] Update the `jakarta.ee` DNS records at Netlify to point to the Eclipse nginx gateway
  (domain remains registered at Netlify; only traffic destination changes)
- [ ] Monitor nginx logs and site behaviour immediately after the record update
- [ ] Confirm Google Search Console shows no crawl errors
- [ ] Confirm `robots.txt` is being served correctly
- [ ] Leave in this state for a minimum of 1–2 days before proceeding to 4b

#### Phase 4b — Transfer domain from Netlify to Cloudflare

This step is zero-downtime. The domain transfer changes who manages the domain registration
(the registrar) and nameservers, moving from Netlify to Cloudflare. Because the DNS records in
Cloudflare are created before the nameserver switch happens, both old (Netlify) and new
(Cloudflare) nameservers return the same answer — Eclipse nginx — throughout the transition.
Different DNS resolvers around the world shift to Cloudflare gradually as propagation completes.

The steps must be done in this order:

- [ ] Confirm Phase 4a has been stable for a minimum of 1–2 days
- [ ] **First — set up Cloudflare before touching Netlify:**
  - Add `jakarta.ee` to the Eclipse Foundation Cloudflare account
  - Re-create all DNS records in Cloudflare (pointing to the Eclipse nginx gateway, same as
    Phase 4a) — including subdomains (`start.jakarta.ee`, `mail.jakarta.ee`)
  - Confirm Cloudflare SSL certificate is provisioned and active for `jakarta.ee`
- [ ] **Then — switch nameservers:**
  - Unlock the domain at Netlify and update the nameservers to Cloudflare's
    (or initiate a full registrar transfer if the infra team prefers)
- [ ] Monitor DNS propagation — during this period both Netlify and Cloudflare nameservers
  return the same records, so users see no change
- [ ] Validate the site is fully functional once Cloudflare is authoritative

### Phase 5 — Decommission Netlify

Once Phase 4 is stable (recommend a minimum of 1–2 weeks of monitoring):

- [ ] Remove `netlify.toml`
- [ ] Remove `static/_redirects` (all rules now live in `config/nginx/default.conf`)
- [ ] Remove `static/_headers` (canonical Link headers now in Puppet config)
- [ ] Remove the `build_netlify` npm script from `package.json`
- [ ] Remove the `build-specs.sh` reference from `specifications` npm script if no longer needed
- [ ] Remove the Netlify status badge from `README.md`
- [ ] Remove "This site is powered by Netlify" from `README.md`
- [ ] Archive or close the site in the Netlify dashboard
- [ ] Notify Jakarta EE Working Group that migration is complete

---

## 4. Stakeholders and Scheduling

### Stakeholders to inform

| Stakeholder | Why |
|---|---|
| Jakarta EE Working Group (Steering, Specification, Marketing committees) | PR preview URLs will change after cutover; awareness of infrastructure change |
| Eclipse Foundation Software Engineering team | Owns the Jenkins/Kubernetes infrastructure |
| Eclipse Foundation IT / Infra team | Puppet config, DNS changes, SSL certificates |
| Jakarta EE specification project leads | Build process changes affecting specification pages |

### Recommended schedule

1. **Phase 1** can begin immediately (dev team only, no coordination needed)
2. **Phase 2** requires a ticket to the Eclipse Foundation infra team — open it as soon as
   Phase 1 is merged
3. **Phase 3** begins once infra provisioning is complete — target a few days of parallel
   validation before scheduling cutover (maybe not neeed - to confirm with Matt)
4. **DNS cutover (Phase 4)** should be scheduled during a low-traffic window (weekday morning,
   North American time) and announced to working group stakeholders at least one week in advance
5. **Phase 5** should not begin until the site has been stable on Eclipse infra for at least
   1–2 weeks post-cutover

---

## 5. Validation Checklist (post-migration)

### Redirects

```
/meeting_minutes                           → 301 /about/meeting_minutes
/meeting_minutes/steering_committee/foo   → 301 /about/meeting_minutes/steering_committee/foo
/newsletter                                → 301 /community/newsletter
/about                                     → 301 /about/working-group
/compatibility/get_listed/                 → 301 /compatibility/get-listed/
/events                                    → 301 /community/events
/getinvolved                               → 301 /community/get-involved
```

### Proxies

```
/learn/docs/                               → 200, content from jakartaee.github.io
/learn/jakartaee-tutorial/                 → 200, content from jakartaee.github.io
/blogs/jakartablogs.xml                    → 200, RSS feed from jakartablogs.ee
```

### Headers (every page)

```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
Content-Security-Policy: default-src https: 'unsafe-eval' 'unsafe-inline'; ...
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
```

### Specification pages

- HTML spec pages resolve correctly (e.g. `/specifications/faces/3.0/jakarta-faces-3.0.html`)
- Canonical `Link` headers present on spec HTML pages
- Multi-language spec pages load correctly in Japanese and Chinese

### Assets and search

- All images, CSS, JS, and font files load (no 404s in browser console)
- `robots.txt` allows crawling
- Google Search Console shows no new crawl errors within 48 hours of cutover
- Sitemap (`/sitemap.xml`) is accessible and submitted to Google Search Console

---

## 6. Decommission Checklist

Items to clean up from the repository and external services once the migration is complete:

**Repository (`jakarta.ee`):**
- [ ] `netlify.toml` — delete
- [ ] `static/_redirects` — delete
- [ ] `static/_headers` — delete
- [ ] `package.json` — remove `build_netlify` script
- [ ] `README.md` — remove Netlify badge and "powered by Netlify" text

**External services:**
- [ ] Netlify dashboard — archive or delete the `jakartaee` site
- [ ] Confirm Netlify billing stops

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Subdomain proxies (`start.jakarta.ee`, `mail.jakarta.ee`) not resolved before cutover | Medium | High | Confirm infra approach in Phase 2 before scheduling DNS cutover |
| `/learn/docs/` proxy — `jakartaee.github.io` rejects `Host` header | Low | High | Test in staging during Phase 3 |
| Specifications clone fails in Jenkins build container (no outbound GitHub access) | Low | High | Confirm network access in Phase 2 |
| PR preview baseURL injection differs from Netlify behaviour | Low | Medium | Test with a real PR in Phase 3 before cutover |
| DNS propagation delay causes mixed traffic during cutover | Low | Medium | Reduce TTL to 300s 24h before cutover |
| Domain transfer (Netlify → Cloudflare) exposes unknown Netlify edge behaviour (SSL, CDN processing) | Low | High | Validate fully at Phase 4a before initiating the transfer in Phase 4b |
| Split-test context (`split1` in `netlify.toml`) is still active | Low | Low | Confirm with team before removing |

---

## Appendix: Specifications Repository Netlify Migration

> **Scope:** This section covers the separate Netlify deployment for the
> `jakartaee/specifications` GitHub repository. It is a distinct migration effort from the
> main jakarta.ee migration above, involves a different repository and team, and can be
> scheduled independently. It should be completed **after** the jakarta.ee migration is stable,
> since the specifications build depends on the jakarta.ee source code.

### Current Setup

The `jakartaee/specifications` repository has its own Netlify deployment used exclusively for
**PR previews**. When a specification author opens a pull request, Netlify builds a full copy
of the jakarta.ee website with the PR's spec content injected, so reviewers can see exactly
how the new or updated spec will appear on the live site.

The `build.sh` in the specifications repo works as follows:

1. Clones `https://github.com/jakartaee/jakarta.ee.git` into a `website/` subdirectory
2. Runs `yarn install && yarn run production` inside `website/` to compile assets
3. Copies spec content from the PR into `website/content/specifications/`
4. Moves HTML files and static asset folders to `website/static/specifications/`
5. Creates Chinese language copies of all spec pages
6. Removes `website/static/_redirects` (needed on Netlify to prevent the jakarta.ee redirect
   rules from applying to the preview site; unnecessary on nginx)

Hugo is then invoked with `--buildFuture` to include draft/future-dated specs, and
`disallow_robots_txt` is run for non-production builds so preview sites are not indexed.

**Publish directory:** `website/public` (non-standard — the site is built inside `website/`)

### Requirements for Eclipse Infra

| Requirement | Current (Netlify) | Target (Eclipse Infra) |
|---|---|---|
| Build container | Netlify-managed | `eclipsefdn/hugo-node:h0.144.2-n22.14.0` |
| Clones `jakarta.ee` source | `git clone` in `build.sh` | Same — build container needs outbound access to `github.com` |
| Asset compilation | `yarn install && yarn run production` inside `build.sh` | Same |
| Hugo flag | `hugo --buildFuture` | Needs confirmation: does releng-pipeline support extra Hugo flags? |
| Publish directory | `website/public` | `destinationFolder: 'website/public'` in Jenkinsfile |
| Robots blocking on previews | `disallow_robots_txt` npm script | Confirm if releng-pipeline handles this automatically |
| PR previews | Netlify deploy-preview context | releng-pipeline `branchDomain` + `previewBranchesRegex` |

### Key Unknowns (confirm with infra team)

- **`hugo --buildFuture`** — the releng-pipeline calls Hugo directly. Confirm whether it
  supports passing additional Hugo CLI flags (e.g. via a `hugoArgs` parameter), or whether
  Hugo must be called from within `build.sh` instead.
- **Robots blocking on PR previews** — Netlify runs `disallow_robots_txt` to prevent preview
  URLs from being indexed. Confirm whether the releng-pipeline handles this automatically for
  preview builds, or whether it needs to be scripted.
- **`website/static/_redirects` removal** — Step 7 of the current `build.sh` removes the
  jakarta.ee `_redirects` file from the cloned site. On Eclipse infra, the `_redirects` file
  has no effect on nginx, so this step can be dropped once jakarta.ee has fully migrated and
  `static/_redirects` has been removed from the jakarta.ee repository.

### Migration Steps (specifications repository)

This work happens in the `jakartaee/specifications` repository, not in `jakarta.ee`.

**Phase A — Source changes (after jakarta.ee Phase 1 is merged):**

- [ ] Add `Jenkinsfile` to the specifications repository:
  ```groovy
  @Library('releng-pipeline') _

  hugo (
    appName: 'jakartaee-specifications',
    productionDomain: 'jakarta.ee',
    branchDomain: 'jakarta.ee',
    previewBranchesRegex: '.*',
    build: [
      containerImage: 'eclipsefdn/hugo-node:h0.144.2-n22.14.0',
      script: 'build.sh',
      destinationFolder: 'website/public'
    ]
  )
  ```
- [ ] Update `build.sh` to remove Step 7 (`rm ../static/_redirects`) once jakarta.ee's
  `static/_redirects` has been deleted in Phase 5 of the main migration
- [ ] Confirm with the infra team how to pass `--buildFuture` to Hugo via releng-pipeline
- [ ] Keep `netlify.toml` in place until Phase B is validated

**Phase B — Validation:**

- [ ] Trigger a test build on Jenkins and confirm the jakarta.ee clone + asset compilation succeeds
- [ ] Open a test PR and confirm a preview URL is generated with the correct baseURL
- [ ] Confirm spec content from the PR appears correctly in the preview
- [ ] Confirm future-dated specs are visible in previews (`--buildFuture`)
- [ ] Confirm preview sites are not indexed by search engines

**Phase C — Decommission:**

- [ ] Remove `netlify.toml` from the specifications repository
- [ ] Archive or close the specifications Netlify site in the Netlify dashboard
- [ ] Notify the Jakarta EE Specification Committee that PR previews now run on Eclipse infra
