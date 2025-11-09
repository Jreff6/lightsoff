# Lightsoff - Fashion Archive MVP

Plateforme d'archivage de marques de mode indépendantes.

## Stack technique

- Next.js 14+ (App Router)
- TypeScript
- Prisma + PostgreSQL
- Clerk (authentification)
- Meilisearch (recherche)
- Cloudflare Images + R2 (stockage images)
- SCSS + Tailwind CSS

## Prérequis

- Node.js 18+
- Docker Desktop
- Git

## Installation

1. Installer les dépendances :
```bash
npm install
```

2. Démarrer les services Docker :
```bash
docker-compose up -d
```

3. Configurer les variables d'environnement (voir `.env.local.example`)

4. Initialiser la base de données :
```bash
npx prisma migrate dev
npx prisma db seed
```

5. Démarrer le serveur de développement :
```bash
npm run dev
```

## Documentation

- Voir `lightsoff-progress.md` pour le suivi d'implémentation
- Voir `DOCKER-SETUP.md` pour les instructions Docker

