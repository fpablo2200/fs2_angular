# Etapa 1: compilar Angular
FROM node:20-alpine AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npx ng build frontend --configuration production

# Etapa 2: usar Nginx para servir la app
FROM nginx:alpine

# Copiar configuración personalizada de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos compilados de Angular
COPY --from=build /app/dist/frontend /usr/share/nginx/html

# Exponer el puerto
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
