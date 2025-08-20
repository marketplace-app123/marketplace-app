# Marketplace Hybrid v2.2 — Ogni scheda apre la pagina del sito

Schede: Home, Compra (/shop), Vendi (/seller-dashboard), Wishlist (/wishlist), Eventi (link esterno), Chat (/messages), FAQ (/faq), Contatti (/contatti).

## Avvio (se vuoi testare in locale con un PC recente)
```bash
npm install
npx expo start
```

## Build con EAS (per APK) — consigliato da Codespaces (cloud)
```bash
npm i -g eas-cli
eas login
eas build:configure
eas build -p android --profile production
```
