#!/bin/bash
# Find version information to fill in PKGBUILD
echo "x86_64 version information: " && curl -fsSL https://us-central1-apt.pkg.dev/projects/antigravity-auto-updater-dev/dists/antigravity-debian/main/binary-amd64/Packages | grep -E "^(Package|Version|MD5sum):" | tail -2
echo "aarch64 version information: " && curl -fsSL https://us-central1-apt.pkg.dev/projects/antigravity-auto-updater-dev/dists/antigravity-debian/main/binary-arm64/Packages | grep -E "^(Package|Version|MD5sum):" | tail -2
