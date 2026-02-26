#!/usr/bin/env bash
# Query version information and update PKGBUILD
set -euo pipefail

parse_latest() {
    local newest_ver='' newest_ts='' newest_md5='' ver ts md5
    while read -r ver ts md5; do
        if [[ -z $newest_ver ]] || (( $(vercmp "$ver" "$newest_ver") > 0 )); then
            newest_ver=$ver newest_ts=$ts newest_md5=$md5
        fi
    done < <(awk '
        /^Version:/ { split($2, parts, "-"); ver=parts[1]; ts=parts[2] }
        /^MD5sum:/  { print ver, ts, $2 }
    ')
    printf '%s %s %s\n' "$newest_ver" "$newest_ts" "$newest_md5"
}

pkgbuild_var() {
    grep "^$1=" PKGBUILD | cut -d= -f2 || { echo "error: $1 not found in PKGBUILD" >&2; exit 1; }
}

show_change() {
    local label=$1 old=$2 new=$3
    if [[ $old != "$new" ]]; then
        printf '  %-24s %s -> %s\n' "$label" "$old" "$new"
    fi
}

# Read current PKGBUILD values
current_pkgver=$(pkgbuild_var pkgver)
current_x86_64_ts=$(pkgbuild_var _x86_64_timestamp)
current_x86_64_md5=$(pkgbuild_var _x86_64_md5sum)
current_aarch64_ts=$(pkgbuild_var _aarch64_timestamp)
current_aarch64_md5=$(pkgbuild_var _aarch64_md5sum)

# Fetch new values
base_url='https://us-central1-apt.pkg.dev/projects/antigravity-auto-updater-dev/dists/antigravity-debian/main'

x86_64_data=$(
    curl -fsSL "$base_url/binary-amd64/Packages" | parse_latest
) || { echo "error: failed to fetch x86_64 versions" >&2; exit 1; }
read -r x86_64_pkgver x86_64_ts x86_64_md5 <<< "$x86_64_data"

aarch64_data=$(
    curl -fsSL "$base_url/binary-arm64/Packages" | parse_latest
) || { echo "error: failed to fetch aarch64 versions" >&2; exit 1; }
read -r aarch64_pkgver aarch64_ts aarch64_md5 <<< "$aarch64_data"

if [[ $x86_64_pkgver != "$aarch64_pkgver" ]]; then
    echo "error: x86_64 version $x86_64_pkgver differs from aarch64 version $aarch64_pkgver" >&2
    exit 1
fi
pkgver=$x86_64_pkgver

# Compare versions
vcmp=$(vercmp "$pkgver" "$current_pkgver")

if (( vcmp < 0 )); then
    echo "error: fetched version $pkgver is older than current $current_pkgver" >&2
    exit 1
fi

if (( vcmp == 0 )) && [[ $current_x86_64_ts == "$x86_64_ts" && $current_x86_64_md5 == "$x86_64_md5" \
   && $current_aarch64_ts == "$aarch64_ts" && $current_aarch64_md5 == "$aarch64_md5" ]]; then
    echo "already up to date ($pkgver)"
    exit 0
fi

# Show what changed
if (( vcmp > 0 )); then
    printf '  %-24s %s -> %s\n' pkgver "$current_pkgver" "$pkgver"
fi
show_change _x86_64_timestamp  "$current_x86_64_ts"  "$x86_64_ts"
show_change _x86_64_md5sum     "$current_x86_64_md5" "$x86_64_md5"
show_change _aarch64_timestamp "$current_aarch64_ts"  "$aarch64_ts"
show_change _aarch64_md5sum    "$current_aarch64_md5" "$aarch64_md5"

# Update PKGBUILD
sed -i \
    -e "s/^pkgver=.*/pkgver=$pkgver/" \
    -e "s/^pkgrel=.*/pkgrel=1/" \
    -e "s/^_x86_64_timestamp=.*/_x86_64_timestamp=$x86_64_ts/" \
    -e "s/^_x86_64_md5sum=.*/_x86_64_md5sum=$x86_64_md5/" \
    -e "s/^_aarch64_timestamp=.*/_aarch64_timestamp=$aarch64_ts/" \
    -e "s/^_aarch64_md5sum=.*/_aarch64_md5sum=$aarch64_md5/" \
    -e "s/^sha256sums_x86_64=.*/sha256sums_x86_64=('SKIP')/" \
    -e "s/^sha256sums_aarch64=.*/sha256sums_aarch64=('SKIP')/" \
    PKGBUILD

echo "PKGBUILD updated. Now run updpkgsums and pkgctl build"
