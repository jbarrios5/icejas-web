
FROM nginx:stable-alpine as production-stage

COPY /dist/icejas-web /usr/share/nginx/html

# Copia tu configuración personalizada de nginx si tienes una
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]