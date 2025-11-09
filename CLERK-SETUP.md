# Instructions pour configurer Clerk

## Étape 1 : Créer un compte Clerk

1. Aller sur https://clerk.com/
2. Créer un compte gratuit
3. Créer une nouvelle application : **"Lightsoff"** ou **"Fashion Archive"**

## Étape 2 : Configurer les providers d'authentification

1. Dans le dashboard Clerk, aller dans **User & Authentication** > **Email, Phone, Username**
2. Activer :
   - ✅ Email + Password
   - ✅ Google (optionnel mais recommandé)
   - (optionnel) Instagram

## Étape 3 : Récupérer les clés API

Dans le dashboard Clerk :
1. Aller dans **API Keys**
2. Copier :
   - **Publishable Key** (commence par `pk_test_...`)
   - **Secret Key** (commence par `sk_test_...`)

## Étape 4 : Configurer les URLs de redirection

Dans Clerk dashboard > **Paths** :
- Sign-in URL : `/sign-in`
- Sign-up URL : `/sign-up`
- After sign-in URL : `/dashboard`
- After sign-up URL : `/onboarding`

## Étape 5 : Configurer le Webhook (pour plus tard)

1. Dans Clerk dashboard > **Webhooks**
2. Cliquer sur **"Add Endpoint"**
3. URL : `https://ton-domaine.com/api/webhooks/clerk` (à configurer plus tard avec Vercel)
4. Pour le développement local, utiliser **ngrok** (voir section plus bas)
5. Events à écouter :
   - `user.created` ✅
   - `user.updated` ✅
   - `user.deleted` ✅
6. Copier le **Signing Secret** (commence par `whsec_...`)

## Étape 6 : Utiliser ngrok pour le développement local

1. Installer ngrok : https://ngrok.com/download
2. Démarrer le serveur Next.js : `npm run dev`
3. Dans un autre terminal, exécuter :
   ```bash
   ngrok http 3000
   ```
4. Copier l'URL HTTPS fournie (ex: `https://abc123.ngrok.io`)
5. Dans Clerk, configurer le webhook avec cette URL : `https://abc123.ngrok.io/api/webhooks/clerk`

## Une fois toutes les clés récupérées

Ajouter les valeurs dans le fichier `.env.local` :

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_VOTRE_CLE_ICI
CLERK_SECRET_KEY=sk_test_VOTRE_CLE_ICI
CLERK_WEBHOOK_SECRET=whsec_VOTRE_SECRET_ICI

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
```

