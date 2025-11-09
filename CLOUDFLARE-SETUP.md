# Instructions pour configurer Cloudflare

## Étape 1 : Créer un compte Cloudflare

1. Aller sur https://dash.cloudflare.com/sign-up
2. Créer un compte gratuit
3. Vérifier l'email

## Étape 2 : Configurer Cloudflare Images

1. Dans le dashboard Cloudflare, aller dans **Images**
2. Cliquer sur **"Get Started"**
3. Activer Cloudflare Images (5$/mois pour 100 000 images stockées)
4. Noter l'**Account Hash** (dans l'URL : `https://dash.cloudflare.com/<ACCOUNT_ID>/images`)

## Étape 3 : Créer un API Token pour Images

1. Aller dans **Mon Profil** > **API Tokens**
2. Cliquer sur **"Create Token"**
3. Template : **"Edit Cloudflare Images"**
4. Permissions :
   - Account > Cloudflare Images > Edit
5. Créer et copier le token (tu ne le reverras plus)

## Étape 4 : Configurer Cloudflare R2 (Stockage)

1. Dans le dashboard, aller dans **R2**
2. Cliquer sur **"Create bucket"**
3. Nom du bucket : `fashion-archive-images`
4. Région : Automatic
5. Créer

## Étape 5 : Créer des clés d'accès R2

1. Dans R2, aller dans **Manage R2 API Tokens**
2. Cliquer sur **"Create API token"**
3. Nom : `fashion-archive-r2-access`
4. Permissions : **Object Read & Write**
5. Bucket : `fashion-archive-images`
6. Créer et copier :
   - Access Key ID
   - Secret Access Key

## Étape 6 : Récupérer l'Account ID

1. Dans le dashboard Cloudflare (page d'accueil)
2. Scroller vers le bas
3. Copier l'**Account ID** (dans la sidebar droite)

## Étape 7 : Configurer le Public URL R2

1. Dans R2, aller dans **Settings** > **Public Access**
2. Activer le public access pour le bucket
3. Noter l'URL publique (format : `https://pub-XXXXX.r2.dev`)

## Une fois toutes les clés récupérées

Ajouter les valeurs dans le fichier `.env.local` :

```env
CLOUDFLARE_ACCOUNT_ID=votre_account_id
CLOUDFLARE_API_TOKEN=votre_api_token
NEXT_PUBLIC_CLOUDFLARE_IMAGES_HASH=votre_account_hash

R2_ACCOUNT_ID=votre_account_id
R2_ACCESS_KEY_ID=votre_access_key_id
R2_SECRET_ACCESS_KEY=votre_secret_access_key
R2_BUCKET_NAME=fashion-archive-images
R2_PUBLIC_URL=https://pub-XXXXX.r2.dev
```

