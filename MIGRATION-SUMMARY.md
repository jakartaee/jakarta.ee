# Jakarta EE — Netlify Migration Summary

jakarta.ee is currently hosted on Netlify. We are migrating to Eclipse Foundation
infrastructure to reduce hosting costs and align with the model used by other EF working
group websites.

---

## What needs to happen

### 1. Dev team (jakarta.ee repo)

Add the files needed for the Jenkins pipeline:

- `Jenkinsfile` — wires jakarta.ee into the releng-pipeline, same pattern as dpp.eclipse.org
- `build.sh` — CI entry point (installs deps, compiles assets, clones the specifications repo from GitHub)
- `config/nginx/default.conf` — redirect rules and proxy rules currently handled by Netlify

### 2. Infra / Releng team

- **Jenkins** — register `jakarta.ee` and connect the GitHub repo via webhook
- **Puppet nginx config** — create a config for `jakarta.ee` in `projects-it` with security
  headers, CORS, and canonical Link headers (same pattern as other EF sites)
- **Outbound network access** — the build container needs access to `github.com` (to clone
  the specifications repo at build time), and the nginx container needs outbound HTTPS to
  `jakartaee.github.io` and `jakartablogs.ee` (proxy rules)
- **Subdomain routing** — `start.jakarta.ee` and `mail.jakarta.ee` are currently proxied by
  Netlify; need a decision on how to handle these on EF infra

---

## DNS cutover (two steps, no downtime)

DNS is currently managed inside Netlify. The target is Cloudflare.

**Step 1 — Shift traffic (update DNS at Netlify)**
Reduce TTL to 300s, then update the DNS records at Netlify to point at the Eclipse nginx
gateway. The domain stays at Netlify for now. No downtime — both old and new records point
to the same place (Eclipse infra) during propagation.

**Step 2 — Transfer domain to Cloudflare**
Once traffic has been stable on Eclipse infra for 1–2 weeks:
pre-create all DNS records in Cloudflare first, then switch nameservers from Netlify to
Cloudflare. No downtime — both sets of nameservers return the same answer throughout.

---

## What is not changing

- The site build itself (Hugo, Node, webpack) — same versions, same process
- The specifications documentation — already baked into the jakarta.ee build at deploy time,
  no separate hosting to migrate
- PR previews — still generated per pull request, just from Eclipse infra instead of Netlify

---

## Out of scope (separate effort)

The `jakartaee/specifications` repository has its own Netlify deployment used for spec PR
previews. That is a separate migration and can be handled after jakarta.ee is stable.

---

See `MIGRATION.md` for the full detailed plan with checklists and risk register.
