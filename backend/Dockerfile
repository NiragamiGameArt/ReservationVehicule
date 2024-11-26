# Utilisation de l'image officielle Node.js
FROM node:20.8.1

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier package.json et package-lock.json dans le conteneur
COPY package*.json ./ 

# Installer les dépendances
RUN npm install

# Copier tout le code source dans le conteneur
COPY . .

# Copier le script Shell pour attendre que la base de données soit prête
# (si tu utilises ce script, sinon tu peux l'ignorer)
COPY wait-for-mysql.sh /wait-for-mysql.sh

# Donner les droits d'exécution au script
RUN chmod +x /wait-for-mysql.sh

# Installer mariadb-client pour utiliser la commande mysqladmin
RUN apt-get update && apt-get install -y mariadb-client


# Compiler le code TypeScript
RUN npm run build

# Exposer le port sur lequel l'application va tourner
EXPOSE 3000

# Lancer l'application en mode production
CMD ["/wait-for-mysql.sh", "npm", "run", "start:prod"]
