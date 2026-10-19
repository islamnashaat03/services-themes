# Adding the first theme batch to the services website

The implementation is ready locally. No live services page, DNS record, hosting
directory or Mawqi code has been changed by this preparation.

Use the generated services-work.json records as authored showcase projects.
Preserve the `showcase` classification and visible Arabic/English disclosure.
They can appear alongside delivered work with a clear label such as
«مشروع استعراضي» / «Showcase project», without inventing a client relationship.

For each record, deploy only its dist/<id>/ content to an independent web root.
Point the card to the actual live origin after deployment and use the matching
preview thumbnail. The «تخصيص هذا التصميم» action already targets the real
services quote form with service=business-website, approach=template and the
localized theme name. That action navigates; it does not submit a request.

Suggested custom hostnames, pending the user's destination choice:
law.islamnashaat.com, clinic.islamnashaat.com, folio.islamnashaat.com.
Check for existing DNS/hosting content before provisioning. Alternatively use
three independent temporary demo hostnames and update theme-origins.json.

When publishing to the existing services site, first read its actual live
source and guard against concurrent changes. Add the three new project cards
without replacing the existing delivered-work catalogue or publishing older
local copies over recent live edits. All original media and font licenses stay
with the packages. Add a Mawqi adapter later; raw HTML import is not implied.
