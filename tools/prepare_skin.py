"""Prepare editable FNAF 1 PNGs without changing the original game archives."""
import argparse
import io
import json
from pathlib import Path
import re
import struct
import zipfile


ROOT = Path(__file__).resolve().parents[1]


def prepare(name):
    if not re.fullmatch(r"[a-zA-Z0-9_-]+", name) or name == "original":
        raise ValueError("Use letras, numeros, _ ou -; 'original' e reservado.")
    source = ROOT / "1" / "src"
    data = b"".join((source / f"resources.zip.part{i}").read_bytes() for i in range(1, 21))
    target = ROOT / "1" / "skins" / name
    images = target / "images"
    images.mkdir(parents=True, exist_ok=True)
    created = 0
    with zipfile.ZipFile(io.BytesIO(data)) as archive:
        for entry in archive.infolist():
            if not re.fullmatch(r"[a-zA-Z0-9_-]+\.png", entry.filename):
                continue
            path = images / entry.filename
            # Re-running this command preserves every edited image.
            if not path.exists():
                path.write_bytes(archive.read(entry))
                created += 1
    manifest = []
    for path in sorted(images.glob("*.png")):
        if not re.fullmatch(r"[a-zA-Z0-9_-]+\.png", path.name):
            continue
        with path.open("rb") as image:
            header = image.read(24)
        if len(header) < 24 or header[:8] != b"\x89PNG\r\n\x1a\n":
            raise ValueError(f"PNG invalido: {path}")
        width, height = struct.unpack(">II", header[16:24])
        manifest.append({"name": path.name, "width": width, "height": height})
    (target / "manifest.json").write_text(
        json.dumps({"images": manifest}, indent=2) + "\n", encoding="utf-8"
    )
    print(f"Skin: {name}; imagens: {len(manifest)}; novos arquivos: {created}")
    print(f"Edite os PNGs em: {images}")
    print(f"Galeria: http://localhost:8000/1/skins/?skin={name}")
    print(f"Jogar: http://localhost:8000/1/?skin={name}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--name", default="default", help="Nome da skin (padrao: default)")
    args = parser.parse_args()
    prepare(args.name)
