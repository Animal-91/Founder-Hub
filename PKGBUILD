# Maintainer: AlphaLynx <alphalynx at alphalynx dot dev>
# Maintainer: HurricanePootis <hurricanepootis@protonmail.com>

pkgname=antigravity
pkgver=1.22.2
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
_x86_64_timestamp=1775164135
_aarch64_timestamp=1775164161
_x86_64_md5sum=725a36fefbc1adaf753dc6fafe632600
_aarch64_md5sum=ebd1956bce022f57a34163370e557235
source_aarch64=("Antigravity-$pkgver-aarch64.deb::https://us-central1-apt.pkg.dev/projects/$pkgname-auto-updater-dev/pool/$pkgname-debian/${pkgname}_$pkgver-${_aarch64_timestamp}_arm64_${_aarch64_md5sum}.deb")
source_x86_64=("Antigravity-$pkgver-x86_64.deb::https://us-central1-apt.pkg.dev/projects/$pkgname-auto-updater-dev/pool/$pkgname-debian/${pkgname}_$pkgver-${_x86_64_timestamp}_amd64_${_x86_64_md5sum}.deb")
sha256sums=('b72c9a80312f5a6d39604cba69efa76a3e817cfcf4ee8b5bb62cad76054dc84a')
sha256sums_aarch64=('168bfa600723729133076f94353bf9123cf77fa8c1d1cad9cdec733f6349a193')
sha256sums_x86_64=('4e570703d4b3766300202998a47315badab11dc11b94149996e7d4db98e1f709')

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
