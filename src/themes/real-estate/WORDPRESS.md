# Fieldstone WordPress handoff

The current deliverable is a React homepage demo, with complete English and Arabic content in `content.ts`. It is not a WordPress theme or a live property service.

Preserve the editorial hero, the search strip below it, the large/small listing composition, neighborhood tiles, buyer/seller split, advisor feature and separate shortlist/viewing journey.

For a custom theme, render page sections as PHP template parts with ACF scalar fields and grouped/repeated content. Reusable properties can become a `property` content type with price, area, bedrooms, bathrooms and media fields; buying/renting, property type and neighborhood map cleanly to taxonomies. Store site identity and contact details once. Import local media to the Media Library and retain useful alt text and focal positions.

An Elementor implementation can use Containers and listing loops with simple ACF fields. Do not assume ACF repeater arrays are native Elementor dynamic sources. Native taxonomy filters can cover categorical choices; combined property search or numeric ranges need a deliberately implemented query. The current demo filters a small local dataset and does not promise an archive or search backend.

The shortlist needs a small browser storage module. The detail drawer and request form need accessible behavior and scoped CSS, or equivalent builder controls. A production request form must connect to the chosen form handler separately. It must not claim an appointment has been confirmed.

Keep the `.fieldstone` design tokens and logical direction rules. Recreate the layout using builder classes rather than depending on private widget markup. Do not migrate the showcase's global reset. Test the actual WordPress rendering at 375, 768, 1440 and 1920 pixels in both languages after conversion.
