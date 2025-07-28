FROM nginx:alpine

# Copier la configuration nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copier les fichiers du site
COPY . /usr/share/nginx/html

# Exposer le port 81
EXPOSE 81

# Définir les permissions
RUN chmod -R 755 /usr/share/nginx/html

# Démarrer nginx
CMD ["nginx", "-g", "daemon off;"]
