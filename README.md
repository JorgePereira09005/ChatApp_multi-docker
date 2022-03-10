# ChatApp_multi-docker

  This project is a continuation of the previous ChatApp work. It consists of the construction of a continuous integration/continuous deployment pipeline using GitHub, Docker, Travis CI and finally AWS Elastic Beanstalk. The MySQL database is provided by Amazon RDS, and is connected to the other parts of the program by placing it in the same Virtual Private Network as the other components.
  
  Contained in the files is a .travis.yml that defines the Travis CI workflow, as well as a Dockerrun.aws.json which will define the deployment of built Docker images to AWS.


The flow is the following:
- Code gets uploaded to GitHub;
- Travis CI detects new code has been uploaded, fetches it, runs tests and, if they are successful, builds multiple docker container images of the programs making up the website (Nginx, Angular front end and Spring Boot backend) and deploys them to Docker Hub (to my personal Docker hub page);
- Once Travis uploads the built Docker images, it tells AWS to fetch the new images to update the currently running instance of a Multi-Docker environment. After a brief wait, the website becomes available with the new changes.

Please note that the some variables are hardcoded:
- In the frontend, the URLs used to make HTTP requests to the backend are fixed and reflect the URL that AWS attributed to the Multi-Docker instance that was generated at the time this project was conceived;
- In the backend, the datasource URL reflects the endpoint name created by RDS at the time the MySQL database was created. The script used to initialize the database schema is provided with the project files and was ran by using MySQL Workbench to remotely connect to the RDS MySQL instance. 
The database password and username (shown in the Spring Boot properties file) were also unique to this project and are hardcoded. Any future use of these files will require manually changing these hardcoded values or assigning environment variables. These values must match the ones supplied when creating a new instance of MySQL using RDS.

In addition, please note that the Spring Boot project must be built before it can be copied into a Docker container. This work used Maven embedded in Eclipse.


## Travis CI

![travis_ci](https://user-images.githubusercontent.com/61985975/85609763-4df7a100-b64e-11ea-8e63-d3c5fa7ecf57.jpg)


## Home page

![aws_home_page](https://user-images.githubusercontent.com/61985975/85608773-4e436c80-b64d-11ea-942c-00ccd83631eb.jpg)


## Creating new user

![new_user_creation](https://user-images.githubusercontent.com/61985975/85610770-366ce800-b64f-11ea-9742-f32eb8266a26.jpg)


## User Dashboard (different users)


![Login_new_user](https://user-images.githubusercontent.com/61985975/85610862-4d133f00-b64f-11ea-933b-51c6f854b9d9.jpg)

![aws_user_dashboard](https://user-images.githubusercontent.com/61985975/85608849-63b89680-b64d-11ea-9504-ca34f7aa7ef4.jpg)

## Elastic Beanstalk console

![aws_ebs_console](https://user-images.githubusercontent.com/61985975/157689696-0746cfd0-bdc0-4b32-8b96-992b579eb418.png)


## RDS console

![aws_rds](https://user-images.githubusercontent.com/61985975/157690309-130c036d-1fe8-445f-977c-eff2770c4dce.png)


