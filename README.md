# staze.hr website project

![Staze HR](https://raw.githubusercontent.com/apavlinovic/staze.hr/master/client/public/branding/1x/staze-logo.png?token=AAIWGMYNC2ET4BY6HK6CF6S6HID5Y)

## Project setup

### Prerequisites
* Install Docker Desktop for Windows or Mac (https://docs.docker.com/get-docker/). Create an account on Docker Hub if you don't already have one.
* Install the latest version of node.js

---

### Spinning up the database
Run the following command to start the database container

> docker run --name "staze-hr-db" -p 25432:5432 -d -t zeroghan/staze-hr-db

This will download the database image and setup a postgres contianer running on localhost:25432. The username and password for this postgres instance are "docker". 

You can use pgAdmin to explore it, but you don't have to if you don't care about it. https://www.pgadmin.org/download/pgadmin-4-windows/

---
### Setting up the project

Here's how to get backend and frontend up and running:

**Backend**

1. Go to **/backend**
2. Copy the **.env.template** as **.env** file
3. Run the following commands

 > npm install    
 > npm install -g nodemon

4. Run the following to start the backend server:

> npm run dev

The backend server should be running on http://localhost:4000. Navigate to http://localhost:4000/api/trails to verify it's working.

**Frontend**

1. Open a new terminal window and navigate to **/client**
2. Run the following commands

> npm install   
> npm start

3. You're done! 🎉🥳