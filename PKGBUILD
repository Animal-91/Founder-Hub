pkgname=antigravity
pkgver=1.11.2
pkgrel=1
pkgdesc="Antigravity"
arch=('x86_64')
url="https://antigravity.google/"
license=('custom')

depends=('gtk3' 'nss' 'alsa-lib' 'libxss' 'libxtst' 'xdg-utils' 'libdrm' 'mesa')

provides=('antigravity')
conflicts=('antigravity')

source=(
  "Antigravity.tar.gz::https://edgedl.me.gvt1.com/edgedl/release2/j0qc3/antigravity/stable/${pkgver}-6251250307170304/linux-x64/Antigravity.tar.gz"
  "antigravity.png"
)
sha256sums=('SKIP' 'SKIP')

package() {
  cd "$srcdir/Antigravity"

  # Install the application into /opt
  install -d "$pkgdir/opt/antigravity"
  cp -r ./* "$pkgdir/opt/antigravity"

  # Chromium sandbox needs correct permissions
  chmod 4755 "$pkgdir/opt/antigravity/chrome-sandbox"

  # Symlink launcher
  install -d "$pkgdir/usr/bin"
  ln -s /opt/antigravity/bin/antigravity "$pkgdir/usr/bin/antigravity"

  # Install custom icon
  install -Dm644 "$srcdir/antigravity.png" "$pkgdir/usr/share/pixmaps/antigravity.png"

  # Desktop entry
  install -d "$pkgdir/usr/share/applications"
  cat > "$pkgdir/usr/share/applications/antigravity.desktop" << 'EOF'
[Desktop Entry]
Type=Application
Name=Antigravity
Exec=antigravity
Icon=antigravity
Categories=Network;WebBrowser;
EOF
}
