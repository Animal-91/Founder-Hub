# Maintainer: AlphaLynx <alphalynx at alphalynx dot dev>
# Maintainer: HurricanePootis <hurricanepootis@protonmail.com>

pkgname=antigravity
pkgver=1.15.8
_x86minor=1769233008
_arm64minor=1769232817
_x86check=7d1cef02620eccedced833093ea2a457
_arm64check=fbf15ca5a8ac03ab24a27c5d7a9fe562
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
sha256sums_aarch64=('2867139138d348383dc30ac9f4b08d3aec020e80a3c630ec484528eac6daf65b')
sha256sums_x86_64=('ed945d62dffe5a1a58fcf03a3f9f6967e20970c1ee431bba5ac617fa5f5cf6ed')
b2sums=('282a8029e345245cafb06a2859188edaa3e2b11ac1f2b7472e36dbb2fa9b9393faf008b290a715ec59754ecf3bc4ce7cb8bf252c7bdc0f1e02cd3ab25b90a073')
b2sums_aarch64=('7bdb62338892811b53b1d7d49ff78d8ba00dabaab7017681ccdacb33d8f42d22b25b4739743a579a111c30e7a6ff9ecce19013c99a1559bd579220813bfbc878')
b2sums_x86_64=('cdc4db08e1e9fbadeade97169236a9d1d2911b567c7d535f4de4d5bc0efcde3f1d10ab89ca141a1d96b28c2452cb35ce2a648491232aabd1d75fbdc1facf7c77')

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
