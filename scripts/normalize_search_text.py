#!/usr/bin/env python3
"""Make Material search excerpts inert text, without changing document targets.

Run after generating/merging search/search_index.json. Requires beautifulsoup4.
Legacy index records may contain article HTML; Material inserts their text as HTML,
so nested links otherwise become actionable inside result links.
"""
import argparse
import html
import json
from pathlib import Path
from bs4 import BeautifulSoup


def normalize_text(value):
    soup = BeautifulSoup(value, "html.parser")
    # Metadata/executable nodes are not visible historical prose.
    for node in soup.select("script, style"):
        node.decompose()
    return html.escape(soup.get_text(" ", strip=True), quote=False)


def normalize_index(index):
    changed = 0
    for doc in index["docs"]:
        text = normalize_text(doc["text"])
        changed += text != doc["text"]
        doc["text"] = text
    return changed


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("index", nargs="?", type=Path,
                        default=Path(__file__).resolve().parents[1] / "search/search_index.json")
    args = parser.parse_args()
    data = json.loads(args.index.read_text())
    changed = normalize_index(data)
    args.index.write_text(json.dumps(data, ensure_ascii=False, separators=(",", ":")) + "\n")
    print(json.dumps({"records": len(data["docs"]), "normalized": changed}))
