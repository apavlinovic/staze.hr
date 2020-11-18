#!/bin/bash

BLACK=$(tput setaf 0)
RED=$(tput setaf 1)
GREEN=$(tput setaf 2)
YELLOW=$(tput setaf 3)
LIME_YELLOW=$(tput setaf 190)
POWDER_BLUE=$(tput setaf 153)
BLUE=$(tput setaf 4)
MAGENTA=$(tput setaf 5)
CYAN=$(tput setaf 6)
WHITE=$(tput setaf 7)
BRIGHT=$(tput bold)
NORMAL=$(tput sgr0)
BLINK=$(tput blink)
REVERSE=$(tput smso)
UNDERLINE=$(tput smul)


printHeader() {
    printf "${YELLOW}${BRIGHT}%s${NORMAL}" "[=] =========================== [=]"
    printf "\n"
    printf "${YELLOW}${BRIGHT}%s${NORMAL}" "[=] $1"
    printf "\n"
    printf "${YELLOW}${BRIGHT}%s${NORMAL}" "[=] =========================== [=]"
    printf "\n"
}

printStatus() {
    printf "${CYAN}%s${NORMAL}" "[>] $1"
    printf "\n"
}

printError() {
    printf "${RED}${BRIGHT}%s${NORMAL}" "[!] $1"
    printf "\n"
}

printSuccess() {
    printf "${GREEN}${BRIGHT}%s${NORMAL}" "[+] $1"
    printf "\n"
}

removeFolder() {
    status=$(rm -rf $1 2>&1)
    exitStatus=$?
    dir=$(pwd)

    if [ ${exitStatus} -eq 0 ];
        then
            printStatus "Deleted ${BRIGHT}${dir}/$1${NORMAL}" 
        else
            printError "${status}"
    fi
}

removeFile() {
    status=$(rm $1 2>&1)
    exitStatus=$?
    dir=$(pwd)

    if [ ${exitStatus} -eq 0 ];
        then 
            printStatus "Deleted ${BRIGHT}${dir}/$1${NORMAL}" 
        else
            printError "Failed to delete ${BRIGHT}${dir}/$1${NORMAL}"
            printError "${status}"
    fi
}

initialize() {
    clear 
    set -e

    printHeader "1/4 Setting up runtime..."
    npm i --loglevel error --no-audit --no-fund
    printStatus "npm packages installed"

    clear

    printHeader "2/4 Setting up backend..."
    cd ./backend
    cp .env.template .env
    printStatus ".env setup finished"
    npm i --loglevel error --no-audit --no-fund
    printStatus "npm packages installed"

    clear

    printHeader "3/4 Setting up frontend..."
    cd ../web
    npm i --loglevel error --no-audit --no-fund
    printStatus "npm packages installed"

    clear 

    printHeader "4/4 Fetching latest DB image"
    docker pull zeroghan/staze-hr-db
    printSuccess "Fetched the latest database image"

    clear

    printSuccess "Project initialized succesfully!"
    printSuccess "Use Run command to start the development server."
    printSuccess "Happy hacking!"
    set +e
} 

clean() {
    clear

    printHeader "Cleaning the project..."
    printStatus "Cleaning runtime..."
    removeFolder node_modules/

    cd ./backend 
    printStatus "Cleaning backend..."
    removeFolder node_modules/
    removeFile .env

    cd ../web
    printStatus "Cleaning frontend..."
    removeFolder node_modules/

    printSuccess "Project cleaned succesfully!"
}

updateNPMPackages() {
    clear

    printHeader "Updating NPM packages across the board..."
    printStatus "Updating runtime..."
    npm update

    cd ./backend 
    printStatus "Updating backend..."
    npm update

    cd ../web
    printStatus "Updating frontend..."
    npm update

    printSuccess "Packages updated succesfully, check for errors!"
}

dockerUpdateDBContainer() {
    docker pull zeroghan/staze-hr-db
}

dockerStartDBContainer() {

    name='staze_db'
    runningContainer="$(docker ps --format '{{.Names}}' -f "name=$name")"
    existingImage="$(docker images -q zeroghan/staze-hr-db)"

    if [[ $runningContainer == $name ]];
    then
        printStatus "$name container already running." 
    else
        if [[ $existingImage == "" ]];
        then
            printStatus "$name image not found, pulling it..."
            docker pull zeroghan/staze-hr-db
            printStatus "Creating and running a container named $name"
            docker run -dp 25432:5432 --name "$name" -t zeroghan/staze-hr-db
        else
            printStatus "Starting a container named $name"
            docker start $name
        fi
    fi    
}

regenerateGQLTypes() {
    cd ./web
    npm run graphql:generate
}


run() {
    clear

    printHeader "Spinning up staze.hr..."

    printStatus "Starting database container..."
    dockerStartDBContainer

    printStatus "Starting backend and frontend dev servers..."
    npm start
}

prettierFormat() {
    npm run prettier:format
}

printHeader "Staze.hr Bootstrap Manager"
printf "\n"
printStatus "Choose your action:"

PS3='Please enter your choice: '
options=("Initialize" "Start" "Prettier: Format" "NPM: Update packages" "GQL: Regenerate types" "Docker: Update DB image" "Docker: Start DB container" "Clean" "Quit")
select opt in "${options[@]}"
do
    case $opt in
        "Initialize")
            initialize
            break
            ;;
        "Start")
            run
            break
            ;;
        "Prettier: Format")            
            prettierFormat
            break
            ;;
        "Clean")
            clean
            break
            ;;
        "NPM: Update packages")
            updateNPMPackages
            break
            ;;                        
        "Docker: Update DB image")
            dockerUpdateDBContainer
            break
            ;;            
        "Docker: Start DB container")
            dockerStartDBContainer
            break
            ;;
        "GQL: Regenerate types")
            regenerateGQLTypes
            break
            ;;            
        "Quit")
            break
            ;;
        *) printError "Invalid choice $REPLY";;
    esac
done

