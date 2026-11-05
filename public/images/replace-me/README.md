# Replace-me image kit

These files are **numbered placeholders**. Replace any file with the real image,
keeping the same filename and `.jpg` extension. Then run:

```powershell
python scripts/prepare-images.py
```

The script regenerates the responsive WebP/JPEG variants used by the website.

| # | Replace this file | What it is | Recommended shape | Feeds |
|---|---|---|---|---|
| 1 | `1-hero-portrait.jpg` | Professional portrait in black clerical suit / Roman collar | Portrait, 2:3 or taller | Homepage hero + About portrait |
| 2 | `2-father-kaz-vestments.jpg` | Father Kaz in white liturgical vestments | Portrait, 2:3 | About / priesthood |
| 3 | `3-liturgical-prostration.jpg` | Clergy lying prostrate during a liturgical rite | Landscape, 3:2 | Ministry & Service |
| 4 | `4-two-priests-red-vestments.jpg` | Two priests in red vestments before a religious image | Landscape, 4:3 | About / ministry |
| 5 | `5-archangels-near-us-front-cover.jpg` | *Archangels Near Us* — front cover | Book cover, 2:3 | Publications |
| 6 | `6-archangels-near-us-back-cover.jpg` | *Archangels Near Us* — back cover | Book cover, 2:3 | **Placeholder only; not wired yet** |
| 7 | `7-saint-rita-front-cover.jpg` | *Saint Rita in Moments of Helplessness* — front cover | Book cover, 2:3 | Publications |
| 8 | `8-saint-rita-back-cover.jpg` | *Saint Rita in Moments of Helplessness* — back cover | Book cover, 2:3 | **Placeholder only; not wired yet** |
| 9 | `9-homepage-layout-sketch.jpg` | Handwritten homepage layout reference | Any | **Design reference only — never published** |

## Important

- **6 and 8 currently contain copies of the front covers.** They are not displayed
  anywhere. When you replace them with the real back covers, tell me and I will
  wire them into the publication detail view (`backImage` in `src/data/books.js`).
- **9 is never published.** It is only a design reference.
- Files 5 and 7 are copied over the existing book-cover paths by the script.
- The script does not crop faces. It preserves the source aspect ratio and lets
  the site's CSS crop safely.
- Keep Polish diacritics in filenames only where already present; these numbered
  filenames are intentionally ASCII for easy replacement.
