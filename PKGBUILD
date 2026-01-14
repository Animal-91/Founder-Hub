# Maintainer: AlphaLynx <alphalynx at alphalynx dot dev>

pkgname=antigravity
pkgver=1.13.3
pkgrel=1
pkgdesc='An agentic development platform from Google, evolving the IDE into the agent-first era.'
arch=(aarch64 x86_64)
url='https://antigravity.google/'
license=(LicenseRef-Google-Antigravity)
_electron=electron37
depends=(bash $_electron libx11 libxkbfile)
makedepends=(jq)
options=(!strip !debug)
source=($pkgname.sh)
source_aarch64=("Antigravity-$pkgver-aarch64.deb::https://us-central1-apt.pkg.dev/projects/$pkgname-auto-updater-dev/pool/$pkgname-debian/${pkgname}_$pkgver-1766182168_arm64_940bc88042cadeaee51d9b1eedf6a506.deb")
source_x86_64=("Antigravity-$pkgver-x86_64.deb::https://us-central1-apt.pkg.dev/projects/$pkgname-auto-updater-dev/pool/$pkgname-debian/${pkgname}_$pkgver-1766182170_amd64_365061c50063f9bd47a9ff88432261b8.deb")
sha256sums=('560fe34192560e90e1d9706d2e6610ccddc686c2ad14e3dce48af810ff1efa7c')
sha256sums_aarch64=('9d4d5a0f4dc39514a8841e726bf032e19f8baf42310ed11531cd95d43922c14e')
sha256sums_x86_64=('d9920f9e0788245b1dab0f73a607b4eea00605bfb70e16795da1c1ac89eabd4b')
b2sums=('b58d39bb6c653bce108e3b0c0ebef594449debb7193f2a7a9fae5bdb89f94951481d37b4e0978a1012309e972352ca1e7de37ed72d92bdc58be00c17be5fc205')
b2sums_aarch64=('b77141c125a785d937e1ea74aad9baa842008e849330130335592ff47c4f701bd6faa20a7bce5611882cc4d6578bcae16d0122ab86403153272f84fa21bb8e30')
b2sums_x86_64=('ac9a11ee619b795d854383351401265fd1b8e08e74f0487c5b55985974cef90773c6c94c4968eb7ea10b2710e8579af0a8288ef448050d10878da4b08f786734')

prepare() {
    tar -xpf data.tar.xz

    # Find out which major release of electron this version of proton-mail requires
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
