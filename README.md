# La Fabrik Numérique — Site vitrine

Site vitrine de l'atelier **La Fabrik Numérique** (création web & logiciel sur mesure).

## Stack

- [Next.js 16](https://nextjs.org/) (App Router) + TypeScript
- Tailwind CSS v4
- Bilingue FR/EN (détection auto de la langue du navigateur + persistance `localStorage`)
- Direction artistique « Circuit Topographie » (bleus profonds, lignes cyan/ambre)

## Développement

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build de production

```bash
npm run build
npm start
```

## Structure

- `app/` — layout, page, métadonnées (OpenGraph/Twitter), favicon, polices locales
- `components/` — sections (Hero, Services, Skills, Portfolio, Pricing, About, Contact) + Header, Footer, LangToggle, Reveal
- `lib/i18n.tsx` — contexte de langue et tous les textes FR/EN

## À personnaliser avant production

- Email & téléphone de contact (`components/Contact.tsx`)
- Grille tarifaire (`lib/i18n.tsx` → `pricing`)
- `SITE_URL` (`app/layout.tsx`) une fois le domaine connu
- Branchement du formulaire de contact (envoi d'email)
