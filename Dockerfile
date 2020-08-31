FROM nginx:alpine

WORKDIR /usr/share/nginx/html/

COPY ./dist/ohm-digitizer/ .

RUN chmod 777 *


COPY /nginx.conf /etc/nginx/conf.d/default.conf