# PROJET BRADERYTEST

## Instructions d'Installation

- Cloner le Dépôt :
  `git clone git@github.com:Djyxx/braderytest.git`

### Configuration de la Base de Données

`cd backend`

- Ouvrir le fichier bdd.mysql dans le dossier backend.
- Suivre les instructions pour créer la base de données du projet.

### Installation des Dépendances Backend

`cd backend`
`npm install`

### Configuration de la Connexion à la Base de Données

Modifier les informations de connexion dans app.js du dossier backend :

"const dbConfig = {
host: "votre-hôte",
user: "votre-utilisateur",
password: "votre-mot-de-passe",
database: "braderytest",
};"

### Installation des Dépendances Frontend

`cd ..`
`cd frontend`
`npm install`

### Démarrage des Serveurs

- Backend:
  `cd backend`
  `node app.js`

- Frontend:
  `cd frontend`
  `npm start`

- Ouvrir [http://localhost:3001] dans votre navigateur.

**Note importante: N'oubliez pas de consulter le fichier bdd.mysql pour les instructions de création de la base de données !!**

Profitez du projet Braderytest ! 😊
