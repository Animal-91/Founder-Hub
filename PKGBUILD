# Maintainer: AlphaLynx <alphalynx at alphalynx dot dev>
# Maintainer: HurricanePootis <hurricanepootis@protonmail.com>

pkgname=antigravity
pkgver=1.19.6
pkgrel=1
pkgdesc='An agentic development platform from Google, evolving the IDE into the agent-first era.'
arch=(aarch64 x86_64)
url='https://antigravity.google/'
license=(LicenseRef-Google-Antigravity)
_electron=electron39
depends=(bash $_electron libx11 libxkbfile)
makedepends=(jq)
options=(!strip !debug)
_x86_64_timestamp=1772152296
_aarch64_timestamp=1772152278
_x86_64_md5sum=4adf927f23143e77a9a759c97e46fe6f
_aarch64_md5sum=f3cf3811643cf91127edc038a2b4257d
source=($pkgname.sh)
source_aarch64=("Antigravity-$pkgver-aarch64.deb::https://us-central1-apt.pkg.dev/projects/$pkgname-auto-updater-dev/pool/$pkgname-debian/${pkgname}_$pkgver-${_aarch64_timestamp}_arm64_${_aarch64_md5sum}.deb")
source_x86_64=("Antigravity-$pkgver-x86_64.deb::https://us-central1-apt.pkg.dev/projects/$pkgname-auto-updater-dev/pool/$pkgname-debian/${pkgname}_$pkgver-${_x86_64_timestamp}_amd64_${_x86_64_md5sum}.deb")
sha256sums=('e87279c0e90c05ea12df6a5a58f0a6a51b76e3e2f3b0d6411085a1cd981fe5b2')
sha256sums_aarch64=('26c096eef1bd18799665fa1784b5b564214059e6a6a227cf5263c2ab9f4301b4')
sha256sums_x86_64=('04da15e1db2b7bd9c39708d62a2a42fc4e42ceafd977aac9a638c771117a3d7b')

prepare() {
    tar -xpf data.tar.xz

    # Find out which major release of electron this version of antigravity requires
    local _electron_major=$(jq --raw-output '.devDependencies.electron' < "usr/share/antigravity/resources/app/package.json" | sed 's/^[~^]\?\([0-9]\+\)\(\.[0-9]\+\)*$/\1/')

    # Check if we depend on the correct electron version
    if [ "$_electron" != "electron$_electron_major" ] ; then
        echo "Error: Incorrect electron version detected. Please change the value of \"_electron\" from \"$_electron\" to \"electron$_electron_major\"."
        return 1
    fi

    # Specify electron version in launcher
    sed -i "s|@ELECTRON@|$_electron|" "$srcdir/antigravity.sh"

    sed -i 's|/usr/share/antigravity/antigravity|/usr/bin/antigravity|g' usr/share/applications/*.desktop
}

package() {
    install -Dm755 $pkgname.sh "$pkgdir/usr/bin/$pkgname"

    cd usr/share/

    install -d "$pkgdir/usr/lib/$pkgname"
    cp -a antigravity/resources/app/* "$pkgdir/usr/lib/$pkgname/"

    install -d "$pkgdir/usr/share/licenses/$pkgname"
    ln -s /usr/lib/$pkgname/LICENSE.txt "$pkgdir/usr/share/licenses/$pkgname/LICENSE.txt"

    install -Dm644 appdata/$pkgname.appdata.xml -t "$pkgdir/usr/share/metainfo"

    install -Dm644 applications/$pkgname.desktop -t "$pkgdir/usr/share/applications"
    install -Dm644 applications/$pkgname-url-handler.desktop -t "$pkgdir/usr/share/applications"

    install -Dm644 bash-completion/completions/$pkgname -t "$pkgdir/usr/share/bash-completion/completions"
    install -Dm644 zsh/vendor-completions/_$pkgname -t "$pkgdir/usr/share/zsh/site-functions"

    install -Dm644 mime/packages/$pkgname-workspace.xml -t "$pkgdir/usr/share/mime/packages"
    install -Dm644 pixmaps/$pkgname.png -t "$pkgdir/usr/share/pixmaps"
    rm -rf "$pkgdir/usr/lib/resources/"
}
