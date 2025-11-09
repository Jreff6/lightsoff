# Instructions pour créer le repository GitHub

## Étape 1 : Créer le repository sur GitHub

1. Aller sur https://github.com/new
2. Nom du repository : `lightsoff`
3. Visibilité : **Private** (recommandé) ou Public
4. **Ne pas** initialiser avec README, .gitignore ou licence (on les a déjà)
5. Cliquer sur "Create repository"

## Étape 2 : Lier le repository local au remote GitHub

Une fois le repository créé, GitHub vous donnera une URL. Utilisez-la dans les commandes suivantes :

```bash
# Ajouter le remote (remplacer YOUR_USERNAME par votre nom d'utilisateur GitHub)
git remote add origin https://github.com/YOUR_USERNAME/lightsoff.git

# Vérifier que le remote est bien configuré
git remote -v

# Faire le premier commit
git add .
git commit -m "Initial commit: Next.js project setup with Docker, Prisma, Clerk, Meilisearch"

# Pousser vers GitHub
git push -u origin main
```

## Alternative : Utiliser SSH

Si vous préférez utiliser SSH au lieu de HTTPS :

```bash
git remote add origin git@github.com:YOUR_USERNAME/lightsoff.git
```

