"""Regenerate the website's responsive photo variants from the replace-me kit.

Usage:
    python scripts/prepare-images.py

Replace the numbered files in public/images/replace-me first. The script keeps
the source aspect ratio and never crops faces; CSS handles art direction.
"""

from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "public" / "images" / "replace-me"
FR = ROOT / "public" / "images" / "fr-ligeza"
BOOKS = ROOT / "public" / "images" / "books"

WIDTHS = (640, 960, 1440)

JOBS = {
    "1-hero-portrait.jpg": ("father-kaz-portrait", True),
    "2-father-kaz-vestments.jpg": ("father-kaz-vestments", False),
    "3-liturgical-prostration.jpg": ("liturgical-prostration", False),
    "4-two-priests-red-vestments.jpg": ("priests-red-vestments", False),
}


def load(path: Path) -> Image.Image:
    return ImageOps.exif_transpose(Image.open(path)).convert("RGB")


def variants(source: Path, base: str, square: bool = False) -> None:
    im = load(source)
    for width in WIDTHS:
        height = round(im.height * width / im.width)
        resized = im.resize((width, height), Image.LANCZOS)
        resized.save(FR / f"{base}-{width}.jpg", "JPEG", quality=82, optimize=True, progressive=True)
        resized.save(FR / f"{base}-{width}.webp", "WEBP", quality=80, method=6)
    if square:
        crop = ImageOps.fit(im, (900, 900), method=Image.LANCZOS, centering=(0.5, 0.2))
        crop.save(FR / f"{base}-square.jpg", "JPEG", quality=84, optimize=True, progressive=True)
        crop.save(FR / f"{base}-square.webp", "WEBP", quality=82, method=6)
    print(f"  {source.name} -> {base} ({im.width}x{im.height})")


def main() -> None:
    if not SRC.exists():
        raise SystemExit(f"Missing folder: {SRC}")
    print("Regenerating responsive variants...")
    for filename, (base, square) in JOBS.items():
        path = SRC / filename
        if not path.exists():
            print(f"  SKIP {filename} (missing)")
            continue
        variants(path, base, square=square)

    front_archangels = SRC / "5-archangels-near-us-front-cover.jpg"
    if front_archangels.exists():
        BOOKS.mkdir(parents=True, exist_ok=True)
        (BOOKS / "archangels-near-us-1364.jpg").write_bytes(front_archangels.read_bytes())
        print("  5-archangels-near-us-front-cover.jpg -> books/archangels-near-us-1364.jpg")

    front_rita = SRC / "7-saint-rita-front-cover.jpg"
    if front_rita.exists():
        (BOOKS / "saint-rita-in-moments-of-helplessness-1353.jpg").write_bytes(front_rita.read_bytes())
        print("  7-saint-rita-front-cover.jpg -> books/saint-rita-in-moments-of-helplessness-1353.jpg")

    print("Done. 6, 8, and 9 are intentionally not published.")


if __name__ == "__main__":
    main()
