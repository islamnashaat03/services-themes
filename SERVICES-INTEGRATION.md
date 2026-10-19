# Adding the first theme batch to the services website

The source is https://github.com/islamnashaat03/services-themes. Three public
snapshot repositories (showcase-law-firm, showcase-medical-clinic and
showcase-creative-portfolio) publish the exported files with GitHub Pages.
No live services page or Mawqi code has been changed by this preparation.

Use the generated services-work.json records as authored showcase projects.
Preserve the `showcase` classification and visible Arabic/English disclosure.
They can appear alongside delivered work with a clear label such as
«مشروع استعراضي» / «Showcase project», without inventing a client relationship.

For each record, publish only its dist/<id>/ content to its Pages repository.
Point the card to the actual live origin after deployment and use the matching
preview thumbnail. The «تخصيص هذا التصميم» action already targets the real
services quote form with service=business-website, approach=template and the
localized theme name. That action navigates; it does not submit a request.

User-approved custom hostnames:
law.islamnashaat.com, clinic.islamnashaat.com, folio.islamnashaat.com.
These three names were initially provisioned on cPanel and their first static
files uploaded before the user requested external hosting. DNS is being moved
to GitHub Pages; those initial uploads are not the intended serving origin.
Verify HTTPS before using the cards on the actual services website.

DNS instructions follow GitHub's official documentation:
https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

When publishing to the existing services site, first read its actual live
source and guard against concurrent changes. Add the three new project cards
without replacing the existing delivered-work catalogue or publishing older
local copies over recent live edits. All original media and font licenses stay
with the packages. Add a Mawqi adapter later; raw HTML import is not implied.
