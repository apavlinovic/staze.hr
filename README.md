# staze.hr website project

![Staze HR](https://i.imgur.com/buqWaH0.png)

## Prerequisites

-   Install Docker Desktop for Windows or Mac (https://docs.docker.com/get-docker/). Create an account on Docker Hub if you don't already have one.
-   Install the latest version of node.js (12+)
-   Make sure Docker Desktop is running

---

## Setting up the project

### Automated setup 💨

1. Use `init.sh` from your terminal
2. Run **Initialize** to collect NPM dependencies
3. Run **Start** to get a running DB container, frontend and backend servers
4. You're done! 🎉🥳

Happy hacking!

---

### Manual setup 🔨

1. Run `npm install` in the following folders:
    - `/` (root) directory
    - `/web` directory
    - `/backend` directory
2. Navigate to `/backend` and make a copy of `.env.template` named `.env`
3. Run the following script to get a running DB container:

> docker run -dp 25432:5432 --name staze_db -t zeroghan/staze-hr-db

4. Navigate to `/` (root) and run `npm start`

---

## Database information

Run the following command to start the database container

> docker run -dp 25432:5432 --name staze_db -t zeroghan/staze-hr-db

This will download the database image and setup a postgres contianer running on localhost:25432.

The username and password for this postgres instance are "docker".

You can use pgAdmin to explore it, but you don't have to if you don't care about it. https://www.pgadmin.org/download/pgadmin-4-windows/

---

## Branch permissions and naming strategy

-   **master is protected against pushes**.
-   **Branch naming strategy**:

> staze-descriptive-branch-name

-   **Commmit messages guide** is available here https://www.conventionalcommits.org/en/v1.0.0-beta.2/
