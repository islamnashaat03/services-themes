# Validation — 19 October 2026

Build and five package tests passed. All three themes were reviewed in Chrome
in Arabic and English at 1440px and 390px (12 combinations). No horizontal
overflow, broken images or console errors were observed. Language direction
and the opposite-language link were verified.

Portfolio filtering, project details and contact flow passed. Law consultation
and clinic appointment-request flows passed. All forms explicitly confirm
that no information was sent and no appointment was booked.

The portfolio was compared with both generated references in design/. The
reference's decorative browser frame is intentionally excluded. The final
project photograph is a separately generated asset; typography, indigo palette,
white space, image-led work layout and about/services/contact structure follow
the references. Law and clinic preserve the existing library's design.

These checks cover static demo interactions. Payments, real booking, email
delivery and importing into Mawqi are future integrations.

Publication: all three Pages builds completed successfully. Public DNS points
the six bare/www showcase names to islamnashaat03.github.io. All nine HTML
routes returned HTTP 200 from GitHub.com with matching SHA-256 hashes; see
design/live-http-checks.json. Shared-host copies were moved outside web roots
to a private backup after verifying their hashes. HTTPS is not yet verified:
GitHub still reports DNS/certificate processing, and TLS requests currently
fail hostname validation. No browser certificate warning was bypassed.

## Second batch — 19 October 2026

Build and five package tests pass for all six packages. Playwright with Edge
checked the three new themes in Arabic and English at 1440×960 and 390×960
(12 combinations). IAB local navigation timed out and the Chrome connector
timed out; the bundled Playwright fallback was used. All page identities,
meaningful content, direction, images, horizontal bounds, console health and
interactions passed. Fixed the missing favicon request in the generated HTML.

Verified property search/rent results, saved properties and details; project
and program filters, dialogs and selecting the inquiry; all request forms
show a local-only success state; mobile menus open. Browser evidence was
reviewed directly with view_image against design/batch-two concepts.

Fidelity ledger: hero copy/nav/actions preserve the generated Arabic wording;
white surfaces and charcoal/lime or purple/orange palettes are retained;
large split photographic heroes and open work/program layouts are retained;
Cairo type, numbered process and contact forms follow the section references;
mobile columns collapse without overflow. The separately generated training
photograph has different participants from the concept; this is an intentional
asset variation. The decorative training hero corner shape and statement
underline are omitted. Logos use clean code-native vector geometry. The
reference and browser desktop have different native widths (1505 vs 1440);
responsive layout checked at 390. No extra eyebrow, badge or hero copy added.

Payments, real submissions, WordPress conversion, and Mawqi import remain
outside these static interactive showcases.
