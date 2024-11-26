#!/bin/bash

# Attendre que MariaDB soit prêt
while ! mysqladmin ping -h"$DATABASE_HOST" --silent; do
  echo "MariaDB n'est pas encore prêt, on attend..."
  sleep 2
done

# Lancer l'application NestJS
exec "$@"
