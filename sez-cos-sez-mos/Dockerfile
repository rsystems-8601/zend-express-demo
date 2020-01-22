FROM nginx:1.16.0-alpine
MAINTAINER "harshanand@rsystems.com"
COPY dist /usr/share/nginx/html
COPY devops_ui/default.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
