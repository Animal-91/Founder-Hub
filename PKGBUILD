# Maintainer: AlphaLynx <alphalynx at alphalynx dot dev>
# Maintainer: HurricanePootis <hurricanepootis@protonmail.com>

pkgname=antigravity
pkgver=1.15.6
_x86minor=1769062947
_arm64minor=1769062965
_x86check=b833027f41b5be32e185fc99f013e972
_arm64check=774aef8f6baa03ac117434eb02556dc1
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
source_aarch64=("Antigravity-$pkgver-aarch64.deb::https://us-central1-apt.pkg.dev/projects/$pkgname-auto-updater-dev/pool/$pkgname-debian/${pkgname}_$pkgver-${_arm64minor}_arm64_${_arm64check}.deb")
source_x86_64=("Antigravity-$pkgver-x86_64.deb::https://us-central1-apt.pkg.dev/projects/$pkgname-auto-updater-dev/pool/$pkgname-debian/${pkgname}_$pkgver-${_x86minor}_amd64_${_x86check}.deb")
sha256sums=('e4929190060cb15943f2197bdbd39b84de0b72c6066fac6eccb2db540dccc49e')
sha256sums_aarch64=('d0ed138911be4de7d4b70b24d99f4715556b487309c5afc36343f74b2cd3777f')
sha256sums_x86_64=('66ebe19546458e462d2c607222b16316f268dbaf47e64800433940c33e55e0ec')
b2sums=('282a8029e345245cafb06a2859188edaa3e2b11ac1f2b7472e36dbb2fa9b9393faf008b290a715ec59754ecf3bc4ce7cb8bf252c7bdc0f1e02cd3ab25b90a073')
b2sums_aarch64=('3714a0d3bfc2e69abce61f7e384fee1b450ea1b5339845c6371d5c37fdc05b3fc53dabcefb86908dd46e60c4ef674bdab3b995e803f59f744f859ee36d8050fb')
b2sums_x86_64=('43fce6cf23d6df4fbc799bf1f34472d41b2857a257beaa2aaf27d5d6840252ca4778a15a048212f849acc55591348f91843bd30932a67231b9465755ccb45205')

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
