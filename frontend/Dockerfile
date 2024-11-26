# Utilisation de l'image officielle Node.js
FROM node:20.8.1 AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le code source
COPY . .

# Créer le build de production de l'application React
RUN npm run build

# Utilisation d'un serveur statique pour servir l'application React
FROM nginx:alpine

# Copier les fichiers build dans le répertoire où Nginx sert les fichiers
COPY --from=build /app/build /usr/share/nginx/html

# Exposer le port 80 sur lequel Nginx va servir l'application
EXPOSE 80

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]
