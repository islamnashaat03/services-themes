# Calder & Rowe integration notes

This is a React homepage demonstration, not a WordPress theme or a live legal practice. Consultations, email delivery and adviser engagements are not connected.

## Content and presentation

- `content.ts` owns complete English/Arabic copy, practice areas and stable IDs, fictional profiles, process steps, illustrative articles and FAQ content.
- `Page.tsx` composes eight sections and local interaction state; `styles.css` scopes the navy, stone and muted-gold identity beneath `.law-page`.
- Images are local in `public/media/law-firm`; `assets.json` records source URLs and the stock-subject disclosure. Replace fictional biographies and example copy with client-approved material before publication.
- Typography uses the shared Libre Baskerville, Source Sans 3, Noto Naskh Arabic and Cairo font variables. Include the font assets and licenses with an extraction.

## Suggested future WordPress mapping

Use a dedicated front-page template or eight Elementor section templates. Hero, approach and contact content can be page fields; practice areas and process steps can be repeaters. People and insights may become custom post types if the eventual website includes their own pages. At this stage their detail content stays in accessible native dialogs on the homepage.

Map header/footer navigation to WordPress menus, image helper calls to attachment IDs with responsive image functions, and language content to the selected translation plugin. Preserve the independent `commercial`, `wealth`, `employment`, `disputes`, `property`, and `individual` IDs to keep practice preselection stable across languages.

## Interaction and enquiry behavior

Practice rows expand a descriptive panel. Its action opens a consultation dialog with the selected practice already shown. Profiles and articles open separate detail dialogs. The FAQ uses native disclosures. The consultation form validates name/email locally and explicitly confirms that nothing was sent. No backend, storage or external request is present.

Do not collect confidential case details in the introductory form. A future production connector must define consent, conflict checking, destination, validation, abuse protection and truthful delivery states. An enquiry must never be described as creating a professional engagement.

## Extraction and acceptance

Copy this directory, local media and the used shared helpers (`Accordion`, `DemoForm`, `Dialog`, `Icon`, `media`, `DemoFooter`, and `PageProps`), or replace them with equivalent components. Preserve focus management, Escape/backdrop closing and focus restoration when replacing dialogs. `DemoFooter` supplies removable library navigation.

Verify 375, 768, 1440 and 1920px in English/Arabic, keyboard controls, disclosure states, practice preselection, profile/article dialogs, required/email validation, local confirmation, in-page links and image loading before release. Do not publish fictional credentials, endorsements, legal claims or stock subjects as real staff.
