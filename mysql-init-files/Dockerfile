FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=chat-app
ENV MYSQL_USER=hbstudent
ENV MYSQL_PASSWORD=hbstudent

VOLUME /var/lib/mysql

COPY chat-app-schema.sql /docker-entrypoint-initdb.d/

EXPOSE 3306 

CMD ["mysqld"]