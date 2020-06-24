# ChatApp_multi-docker

This project is a continuation of the previous ChatApp website. It consists of the construction of a continuous integration/continuous deployment pipeline using GitHub, Docker, Travis CI and finally AWS Elastic Beanstalk.

The flow is the following:
- Code gets uploaded to GitHub;
- Travis CI detects new code has been uploaded, fetches it, runs tests and, if they are successful, builds multiple docker container images of the programs making up the website (Nginx, Angular front end and Spring Boot backend) and deploys them to Docker Hub (my personal Docker hub page);
- Once Travis uploads the built Docker images, it tells AWS to fetch the new containers to update the currently running instance of a Multi-Docker environment. After a brief wait, the website becomes available with the new changes.
