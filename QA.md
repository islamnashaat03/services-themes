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
