# Prompt — Initialisation de `my-workspace`

## Contexte

Tu travailles sur le repo privé `RominM/my-workspace` de Romin, développeur web freelance basé à **Puisserguier (Hérault, 34)**, studio **MGL Studio** (`mgl-studio.fr`).

Romin crée des **sites vitrines sur-mesure** pour artisans, commerçants et indépendants du **Biterrois** (Béziers, Narbonne, Pézenas, Agde, Saint-Chinian & alentours). Stack : **Astro v6 + SCSS + Netlify + Resend**.

Ce repo est son **espace de travail privé** : conventions, documentation de stack, skills Claude réutilisables, templates clients. Il sert de base pour industrialiser son workflow de développement client.

---

## Objectif de cette session

Créer la structure complète du workspace avec tout son contenu. Voici ce qu'il faut produire :

```
my-workspace/
├── CLAUDE.md
├── docs/
│   ├── stack.md
│   ├── monitoring.md
│   └── workflow-client.md
├── skills/
│   └── new-client.md
└── templates/
    └── client-brief.md
```

---

## Stack technique (décisions arrêtées)

| Outil | Usage | Pourquoi |
|---|---|---|
| **Astro v6** | Framework SSG | Zéro JS par défaut, performance maximale, idéal sites vitrines |
| **SCSS** | Styles | Variables, mixins responsive, BEM |
| **Netlify** | Hébergement + fonctions serverless | Déploiement auto via GitHub, formulaires via Edge Functions |
| **Resend** | Emails transactionnels | API simple, domaine custom, fiable |
| **OVH** | Registrar + hébergement mail | Priorité `.fr`, Zimbra Starter inclus |
| **GitHub** | Versioning | Connexion directe Netlify → deploy automatique sur push main |
| **TypeScript** | Config `astro/tsconfigs/strict` | Sécurité typage, paths `@/*` → `./src/*` |

---

## Stack monitoring (décisions arrêtées après recherche)

Pour chaque site client, Romin déploie cette stack **privacy-first, majoritairement gratuite** :

| Outil | Rôle | Plan | Notes |
|---|---|---|---|
| **Microsoft Clarity** | Heatmaps + session replay | Gratuit illimité | Alternatif à Hotjar, RGPD-friendly |
| **Umami** | Analytics vie privée (RGPD) | Gratuit (cloud ou self-hosted) | Alternatif à GA, cookie-free |
| **HetrixTools** | Uptime monitoring (1 min) | Gratuit 15 monitors | Alertes SMS/email si site tombe |
| **GlitchTip** | Error tracking (self-hosted) | Gratuit | Alternatif Sentry open-source |
| **Axiom** | Logs Netlify Functions | Gratuit 500k events/mois | Centralise les logs serverless |

**Argument commercial différenciateur** : surveillance 24h/24, alerte en moins d'1 minute si le site tombe, avant même que le client le sache. C'est mis en avant sur le site de Romin dans la section "Pourquoi moi" (card "Disponible 24h/24") et dans les Services ("Maintenance & surveillance 24/7").

---

## Structure d'un site client type

Basée sur le portfolio actuel (`mgl-studio.fr`), voici la structure à dupliquer pour chaque client :

```
client-nom/
├── src/
│   ├── config/
│   │   └── site.ts           ← TOUTES les infos SEO/business du client (source unique)
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── Hero.astro
│   │   ├── Services.astro
│   │   ├── Stack.astro       ← section "Pourquoi nous"
│   │   ├── Projects.astro
│   │   ├── Contact.astro
│   │   └── Footer.astro
│   ├── layouts/
│   │   └── Layout.astro      ← meta SEO, Schema JSON-LD, OG tags, canonical
│   ├── pages/
│   │   ├── index.astro
│   │   └── merci.astro       ← redirect après formulaire
│   └── styles/
│       ├── global.scss
│       └── foundations/
│           ├── _variables.scss   ← couleurs, typo, spacing du client
│           ├── _typography.scss
│           └── _mixins.scss
├── netlify/
│   └── functions/
│       └── contact.mjs       ← fonction serverless Resend
├── astro.config.mjs          ← site: 'https://domaine-client.fr', sitemap()
├── tsconfig.json             ← extends astro/tsconfigs/strict + paths @/*
└── package.json
```

### `src/config/site.ts` — structure clé

C'est **le seul fichier à modifier** pour adapter le site à un nouveau client. Il centralise tout :

```ts
export const site = {
  name: 'Prénom',
  fullName: 'Prénom Nom — Activité',
  url: 'https://domaine-client.fr',
  title: 'Titre SEO | Nom — Activité locale',
  description: 'Description 160 caractères avec mots-clés locaux.',
  address: {
    locality: 'Ville',
    region: 'Département',
    postalCode: '00000',
    country: 'FR'
  },
  areaServed: [
    { type: 'City', name: 'Ville principale' },
    { type: 'AdministrativeArea', name: 'Département' },
  ],
  priceRange: '€€',
  openingHours: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '18:00'
  }
}
```

### Schema JSON-LD dans `Layout.astro`

Généré automatiquement depuis `site.ts`, de type `ProfessionalService` avec `areaServed`, `openingHoursSpecification`, `priceRange`. Important pour le référencement local Google.

### `netlify/functions/contact.mjs`

- Lit `RESEND_API_KEY` et `NOTIFICATION_EMAIL` depuis les env vars Netlify
- Envoie une réponse automatique au client (from: `Prénom <hello@domaine-client.fr>`)
- Envoie une notification à Romin avec `replyTo: email` du prospect
- Redirige vers `/merci` après envoi

---

## Workflow complet pour un nouveau client

### 1. Domaine (OVH)
- Registrar préféré : OVH (`.fr` disponible, Zimbra Starter inclus)
- Cloudflare ne supporte pas les TLD `.fr` → toujours OVH pour les clients français
- Email pro : `hello@domaine-client.fr` via OVH Zimbra Starter (inclus dans l'abonnement)
- OVH ne supporte pas ALIAS/ANAME → A record apex (IP Netlify : `75.2.60.5`) + CNAME www

### 2. Hébergement (Netlify)
- Connecter repo GitHub → déploiement auto sur push `main`
- Ajouter env vars : `RESEND_API_KEY` + `NOTIFICATION_EMAIL`
- Configurer domaine custom dans Netlify → DNS Netlify ou A/CNAME dans OVH
- Sitemap auto généré par `@astrojs/sitemap` → `sitemap-index.xml`

### 3. Email transactionnel (Resend)
- Créer domaine dans Resend → ajouter 4 enregistrements DNS dans OVH :
  - TXT `resend._domainkey` → clé DKIM
  - MX `send` → feedback SES (priorité 10)
  - TXT `send` → SPF `v=spf1...`
  - TXT `_dmarc` → `v=DMARC1; p=none;`
- Mettre à jour `from` dans `contact.mjs` avec l'adresse client

### 4. SEO local post-lancement
- **Google Business Profile** : type "Prestataire de services", zone de service, description locale, lien site
- **Google Search Console** : vérification TXT OVH → soumettre `sitemap-index.xml`
- **Indexation forcée** : inspecter URL principale → "Demander l'indexation"

### 5. Monitoring
- **HetrixTools** : ajouter le domaine (monitor toutes les minutes, alerte email)
- **Microsoft Clarity** : ajouter le script de tracking dans `Layout.astro`
- **Umami** : créer le site dans le dashboard Umami, ajouter le script
- **Axiom** : connecter Netlify dans les intégrations

---

## Conventions de développement

- Pas de commentaires sauf si la raison est non-évidente (pas de "// ce composant fait X")
- Pas d'emojis dans les fichiers sauf demande explicite
- Copie UI en français
- Pas d'abstractions prématurées (3 lignes similaires > fonction générique inutile)
- Pas de gestion d'erreurs pour des cas impossibles
- Pas de feature flags ni de shims de compatibilité — changer le code directement
- Valider uniquement aux frontières système (input utilisateur, APIs externes)
- `tsconfig.json` : extends `astro/tsconfigs/strict`, paths `"@/*": ["./src/*"]` (pas de `baseUrl`)

---

## Ce que tu dois créer

Crée et commit tous les fichiers suivants dans `RominM/my-workspace` sur la branche `main` :

### `CLAUDE.md`
Instructions globales pour Claude sur tous les projets de Romin. Doit couvrir :
- Identité (Romin, MGL Studio, Puisserguier, Biterrois)
- Stack technique résumée
- Conventions de développement
- Rappel du workflow client (pointer vers `docs/`)
- Variables d'env Netlify standard

### `docs/stack.md`
Documentation technique complète de la stack avec les choix et leurs raisons. Inclure les versions, les config-clés, les pièges connus (ex: OVH pas d'ALIAS, tsconfig baseUrl deprecated).

### `docs/monitoring.md`
Guide de setup du monitoring pour un site client. Pour chaque outil (Clarity, Umami, HetrixTools, GlitchTip, Axiom) : pourquoi, comment l'installer, où ajouter le script.

### `docs/workflow-client.md`
Le workflow complet de A à Z pour livrer un site client : domaine → code → déploiement → email → SEO → monitoring. Checklist actionnable.

### `skills/new-client.md`
Un skill Claude réutilisable (format markdown avec instructions pour Claude) pour bootstrapper un nouveau projet client : questions à poser, fichiers à créer/modifier, ordre des étapes.

### `templates/client-brief.md`
Template de brief à remplir avec le client avant de commencer le projet. Sections : activité, cible, concurrents, pages souhaitées, couleurs/identité, domaine, délai, budget.

---

Commence par créer tous ces fichiers avec un contenu complet et professionnel. Commit en une fois avec le message `init: workspace structure and documentation`.
