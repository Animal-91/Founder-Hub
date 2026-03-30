# Maintainer: AlphaLynx <alphalynx at alphalynx dot dev>
# Maintainer: HurricanePootis <hurricanepootis@protonmail.com>

pkgname=antigravity
pkgver=1.21.9
pkgrel=1
pkgdesc='An agentic development platform from Google, evolving the IDE into the agent-first era.'
arch=(aarch64 x86_64)
url='https://antigravity.google/'
license=(LicenseRef-Google-Antigravity)
depends=(alsa-lib
         at-spi2-core
         bash
         cairo
         curl
         dbus
         expat
         glib2
         glibc
         gtk3
         libcups
         libgcc
         libsecret
         libsoup3
         libstdc++
         libx11
         libxcb
         libxcomposite
         libxdamage
         libxext
         libxfixes
         libxkbcommon
         libxkbfile
         libxrandr
         mesa
         nspr
         nss
         openssl
         pango
         systemd-libs
         util-linux-libs
         webkit2gtk-4.1)
options=(!strip !debug)
install=$pkgname.install
source=(antigravity.sh)
_x86_64_timestamp=1774760656
_aarch64_timestamp=1774760701
_x86_64_md5sum=dbc843db4882139d3e68619b52d9df7d
_aarch64_md5sum=621675ab678730e2afb13f21f6af3473
source_aarch64=("Antigravity-$pkgver-aarch64.deb::https://us-central1-apt.pkg.dev/projects/$pkgname-auto-updater-dev/pool/$pkgname-debian/${pkgname}_$pkgver-${_aarch64_timestamp}_arm64_${_aarch64_md5sum}.deb")
source_x86_64=("Antigravity-$pkgver-x86_64.deb::https://us-central1-apt.pkg.dev/projects/$pkgname-auto-updater-dev/pool/$pkgname-debian/${pkgname}_$pkgver-${_x86_64_timestamp}_amd64_${_x86_64_md5sum}.deb")
sha256sums=('b72c9a80312f5a6d39604cba69efa76a3e817cfcf4ee8b5bb62cad76054dc84a')
sha256sums_aarch64=('c12107a1f2bd3373aff60e1cf7ac4bbece01f83126772baa91dfabb874108204')
sha256sums_x86_64=('1fb0af48de776cae4b99ed2541a6a0df667c2eb535f8fc53ddd226ce5e4cf469')

prepare() {
    tar -xpf data.tar.xz
    sed -i 's|Exec=/usr/share/antigravity/antigravity|Exec=/usr/bin/antigravity|g' \
        usr/share/applications/*.desktop
}

package() {
    install -d "$pkgdir/opt"
    cp -a usr/share/antigravity "$pkgdir/opt/Antigravity"

    install -Dm755 $pkgname.sh "$pkgdir/usr/bin/$pkgname"

    install -d "$pkgdir/usr/share/licenses/$pkgname"
    ln -s /opt/Antigravity/resources/app/LICENSE.txt -t "$pkgdir/usr/share/licenses/$pkgname"
    ln -s /opt/Antigravity/LICENSES.chromium.html -t "$pkgdir/usr/share/licenses/$pkgname"

    cd usr/share
    install -Dm644 applications/$pkgname.desktop -t "$pkgdir/usr/share/applications"
    install -Dm644 applications/$pkgname-url-handler.desktop -t "$pkgdir/usr/share/applications"

    install -Dm644 bash-completion/completions/$pkgname -t "$pkgdir/usr/share/bash-completion/completions"
    install -Dm644 zsh/vendor-completions/_$pkgname -t "$pkgdir/usr/share/zsh/site-functions"

    install -Dm644 appdata/$pkgname.appdata.xml -t "$pkgdir/usr/share/metainfo"
    install -Dm644 mime/packages/$pkgname-workspace.xml -t "$pkgdir/usr/share/mime/packages"
    install -Dm644 pixmaps/$pkgname.png -t "$pkgdir/usr/share/pixmaps"
}
