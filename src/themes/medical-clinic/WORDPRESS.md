# Clearwell Clinic integration notes

This is a React homepage demonstration, not a WordPress theme. No appointment service, patient system, analytics, or email delivery is connected.

## Content and presentation

- `content.ts` owns the complete English and Arabic copy, navigation, service catalogue, appointment formats, illustrative team, visit sequence, hours and questions.
- `Page.tsx` owns composition and temporary interaction state; `styles.css` scopes the design beneath `.clinic-page` and uses logical spacing for RTL.
- Images live in `public/media/medical-clinic`. `assets.json` records their origins. Replace all fictional identities, example address, opening hours and illustrative photography before client publication.
- Font families use shared CSS variables: DM Sans and IBM Plex Sans Arabic. Copy the relevant font files, licenses and shared font declarations when extracting the page.

## Suggested future WordPress mapping

Map the page to a dedicated front-page template or an Elementor page composed of eight section templates. Store hero, opening hours and location in page fields; services, appointment formats, team and FAQ can be repeaters. Keep locale copy in the translation system rather than placing Arabic conditionals in the markup. Preserve the scoped stylesheet and the independent service IDs when mapping content.

Replace the `media()` helper with WordPress attachment URLs and responsive image functions. Map the header to a registered menu. Keep the illustrative area diagram until a client-approved real location and map integration exist. Render the FAQ using semantic `details`/`summary` or an equally accessible disclosure component.

## Appointment behavior

Service and appointment-format selections currently prefill a local request. Browser validation checks required fields, email shape, nonblank name and a preferred day from today onwards. The result explicitly says that nothing was sent and no appointment was booked. There is no persistence and no network submission.

A future integration must independently define scheduling, availability, consent, retention, cancellation and delivery. Replace the local handler only after those requirements are confirmed. Keep health history and other sensitive clinical data out of this enquiry form. Do not change the demonstration message to a booking confirmation without a verified booking response.

## Extraction and acceptance

Copy this directory, its media directory, shared base styles and the used helpers (`Accordion`, `Icon`, `media`, `DemoFooter`, and `PageProps`), or replace the helpers with equivalents. `DemoFooter` is removable showcase navigation; it is the only commercial-library-specific region.

Verify 375, 768, 1440 and 1920px in both directions, keyboard navigation, required-field/date/email validation, service and format preselection, form confirmation, FAQ disclosures, image loading and local navigation before release. Do not present the fictional profiles as real practitioners or the sample information as medical advice.
