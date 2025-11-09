# Instructions d'Installation Docker

## Installation Docker Desktop pour Windows

### Étape 1 : Télécharger Docker Desktop

1. Aller sur : https://www.docker.com/products/docker-desktop/
2. Cliquer sur "Download for Windows"
3. Télécharger le fichier d'installation

### Étape 2 : Installer Docker Desktop

1. Exécuter le fichier d'installation téléchargé
2. Suivre les instructions de l'installateur
3. **Important** : Redémarrer Windows si demandé
4. Après le redémarrage, ouvrir Docker Desktop depuis le menu Démarrer

### Étape 3 : Vérifier l'installation

Ouvrir un terminal (Git Bash ou PowerShell) et exécuter :

```bash
docker --version
docker-compose --version
```

Vous devriez voir les versions de Docker et Docker Compose.

### Étape 4 : Démarrer Docker Desktop

1. Ouvrir Docker Desktop
2. Attendre que le statut indique "Docker Desktop is running"
3. Une icône de baleine devrait apparaître dans la barre des tâches

### Étape 5 : Démarrer les services du projet

Une fois Docker Desktop en cours d'exécution, dans le dossier du projet :

```bash
# Démarrer PostgreSQL et Meilisearch
docker-compose up -d

# Vérifier que les conteneurs tournent
docker-compose ps

# Voir les logs si besoin
docker-compose logs -f postgres
docker-compose logs -f meilisearch
```

### Commandes utiles

```bash
# Arrêter les services
docker-compose down

# Redémarrer les services
docker-compose restart

# Supprimer tout (y compris les données)
docker-compose down -v

# Voir les logs en temps réel
docker-compose logs -f
```

## Dépannage

### Docker n'est pas reconnu dans le terminal

- Vérifier que Docker Desktop est bien en cours d'exécution
- Redémarrer le terminal après l'installation
- Vérifier que Docker Desktop est dans le PATH système

### Erreur de port déjà utilisé

Si le port 5432 (PostgreSQL) ou 7700 (Meilisearch) est déjà utilisé :

1. Vérifier quels processus utilisent ces ports
2. Arrêter les processus ou modifier les ports dans `docker-compose.yml`


