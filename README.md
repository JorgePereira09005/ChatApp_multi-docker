# ChatApp_multi-docker

This project is a continuation of the previous ChatApp website. It consists of the construction of a continuous integration/continuous deployment pipeline using GitHub, Docker, Travis CI and finally AWS Elastic Beanstalk. The MySQL database is provided by Amazon RDS, and is connected to the other parts of the program by placing it in the same Virtual Private Network as the other components.

The flow is the following:
- Code gets uploaded to GitHub;
- Travis CI detects new code has been uploaded, fetches it, runs tests and, if they are successful, builds multiple docker container images of the programs making up the website (Nginx, Angular front end and Spring Boot backend) and deploys them to Docker Hub (my personal Docker hub page);
- Once Travis uploads the built Docker images, it tells AWS to fetch the new images to update the currently running instance of a Multi-Docker environment. After a brief wait, the website becomes available with the new changes.

Please note that the some variables are hardcoded:
- In the frontend, the URLs used to make POST requests to the backend are fixed and reflect the URL that AWS attributed to the Multi-Docker instance that was generated at the time this project was conceived;
- In the backend, the datasource URL reflects the endpoint name created by RDS at the time the MySQL database was created. The script used to initialize the database schema is provided with the project files and was ran but using MySQL Workbench to remotely connect to the RDS MySQL instance. 
The database password and username (shown in the Spring Boot properties file) were also unique to this project and are hardcoded. Any future use of these files will require manually changing these hardcoded values or assigning environment variables. These values must match the ones supplied when creating a new instance of MySQL using RDS.


#Home page

![aws_home_page](https://user-images.githubusercontent.com/61985975/85608773-4e436c80-b64d-11ea-942c-00ccd83631eb.jpg)

#User Dashboard

![aws_user_dashboard](https://user-images.githubusercontent.com/61985975/85608849-63b89680-b64d-11ea-9504-ca34f7aa7ef4.jpg)

