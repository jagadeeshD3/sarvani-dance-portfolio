# Asset checklist

Put every photo in `assets/images/` using **exactly** these file names. Use JPG and keep each file under about 400 KB; https://squoosh.app compresses photos for free. The file names are also set in `js/config.js`, so you can rename them there instead.

| File | Shape | Size | What to shoot or choose |
|---|---|---|---|
| `about-portrait.jpg` | Portrait 4:5 | 1200×1500 | Her best portrait in costume, face clearly visible. The top of the frame is arched, so leave space above her head. |
| `form-bharatanatyam.jpg` | Portrait 3:4 | 900×1200 | A Bharatanatyam pose, such as araimandi or a full-body stance. |
| `form-kuchipudi.jpg` | Portrait 3:4 | 900×1200 | Kuchipudi. A tarangam moment on the brass plate is ideal. |
| `form-mohiniyattam.jpg` | Portrait 3:4 | 900×1200 | Mohiniyattam in the white-and-gold Kerala costume. If she doesn't perform it, change or remove this entry in config.js. |
| `form-fusion.jpg` | Portrait 3:4 | 900×1200 | Semi-classical, fusion or an event performance. |
| `rasa-shringara.jpg` … `rasa-shanta.jpg` (9 files) | Portrait 4:5 | 1000×1250 | **Close-ups of her face**, one for each rasa, all against the same background and with the same framing. The full list is below. |
| `gallery-01.jpg` … `gallery-12.jpg` | Portrait 3:4 is best | 1200×1600 | Her best stage and studio photos. Anything from 6 to 16 photos works; change `length: 12` in config.js to match. |
| `share.jpg` | Landscape | 1200×630 | The preview image shown when the link is shared on WhatsApp, LinkedIn or Instagram. |

The nine rasa files are: `rasa-shringara.jpg`, `rasa-hasya.jpg`, `rasa-karuna.jpg`, `rasa-raudra.jpg`, `rasa-veera.jpg`, `rasa-bhayanaka.jpg`, `rasa-bibhatsa.jpg`, `rasa-adbhuta.jpg`, `rasa-shanta.jpg`.

## Videos (in `js/config.js` → `videos`)
- Up to 4 YouTube videos. The first one is shown large, so use her strongest full performance (for example a varnam).
- For each, add the title and the venue, city and year.

## Text (in `js/config.js`)
- Her full name, and optionally her name in Devanagari, Tamil or Telugu script.
- A bio of 2 short paragraphs in English. Dutch is optional; I've included a draft.
- Her guru's name and institution or tradition.
- 3 facts with real numbers: years of training, number of performances, countries performed in.
- Her journey: year and milestone (arangetram, diplomas, moving to the Netherlands, notable shows).
- Her classes: days, city or venue, and age groups.
- Email, Instagram, YouTube and any other social links.
- Quotes from teachers, organisers or students: real ones only, with their permission. Leave this empty to hide the section.

## Optional
- A domain name, such as `herName.nl`.
- A Formspree form URL so the contact form sends email.
