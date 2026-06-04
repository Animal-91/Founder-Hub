# Maintainer: AlphaLynx <alphalynx at alphalynx dot dev>

pkgname=antigravity
pkgver=2.0.11
pkgrel=2
pkgdesc='Google Antigravity 2.0 multi-agent orchestration platform'
arch=(aarch64 x86_64)
url='https://antigravity.google/product/antigravity-2'
license=(LicenseRef-Google-Antigravity)
depends=(alsa-lib
         at-spi2-core
         cairo
         dbus
         expat
         glib2
         glibc
         gtk3
         libcups
         libgcc
         libx11
         libxcb
         libxcomposite
         libxdamage
         libxext
         libxfixes
         libxkbcommon
         libxrandr
         mesa
         nspr
         nss
         pango
         systemd-libs)
options=(!strip !debug)
source=(antigravity.desktop
        antigravity.png)
_build=6560309696135168
source_x86_64=(Antigravity-$pkgver-x86_64.tar.gz::https://storage.googleapis.com/antigravity-public/antigravity-hub/$pkgver-$_build/linux-x64/Antigravity.tar.gz)
source_aarch64=(Antigravity-$pkgver-aarch64.tar.gz::https://storage.googleapis.com/antigravity-public/antigravity-hub/$pkgver-$_build/linux-arm/Antigravity.tar.gz)
b2sums=('ec2c74f0e6f2458f2ef1c67b1321c058a3f7c422e364d8871a0a933220ec52ee5736e449cb797b6f135cff1f4adfe6f81e0fdbc76d3ec67c245aea002b8577d8'
        '772849ebf4574dccc7d2fc30751baed10b4a5d4091c524f3d69938192387693501c0c54ea5b43fa2ed382f70ecdff369a4c65ce3d0f778c68712fa0c2b5e84b8')
b2sums_aarch64=('3c3e1c83d8d55927ffb50dec9be120f86ac2a06e0252ffd6173a7fc395b7dec8750c8200aa404709ec581a5ae56fc13559bc7cb4f42a7222eb3726e0d2b8e254')
b2sums_x86_64=('fb2b4a9f7960e2b7215994e92d3a2631aae3f408f578e987bb474d286974cf86c0e6706254d966b783ff80c2bf864dcdb6da70342b2fbca84cd49b0620cdfe5d')

package() {
    install -d "$pkgdir/opt"
    cp -a Antigravity-*/ "$pkgdir/opt/Antigravity"

    install -d "$pkgdir/usr/bin"
    ln -s /opt/Antigravity/antigravity "$pkgdir/usr/bin/$pkgname"

    install -d "$pkgdir/usr/share/licenses/$pkgname"
    ln -s /opt/Antigravity/LICENSE.electron.txt -t "$pkgdir/usr/share/licenses/$pkgname"
    ln -s /opt/Antigravity/LICENSES.chromium.html -t "$pkgdir/usr/share/licenses/$pkgname"

    install -Dm644 $pkgname.desktop -t "$pkgdir/usr/share/applications"
    install -Dm644 $pkgname.png -t "$pkgdir/usr/share/pixmaps"
}
