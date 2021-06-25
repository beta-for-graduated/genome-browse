# Genome-Browse
To simplyify the development, we divide this project into four parts: main page, genome visualization and download service, deployed at different ports. The main page provides entry points for the other three services, bootstrapped with Next.js. The download service and genome visualization are deployed simply on static servers by Express.js, solving cross-site problems by CORS. And genome visualization is powered by JBrowse2.

## Localize
Create 'jbrowse' folder, and then put @jbrowse2/web into it.
Create 'logs' folder.
Create 'data' folder and add genome data
Touch a file named .env.local, and then add contents as following.
```
DOMAIN=localhost
PORT=3000
DATA_PORT=8081
JBROWSE_PORT=8080
```

## Available Scripts
### Launch all servers
```sh
./start.sh
```

### Update config.json
```sh
npm run update_jbrowse
```

## Add genome data
In the "data" folder, each assembly and its tracks file are put in common folder whose name is the same as the assembly file. So, if you want to create a new assembly, you should create new folder under `/data`, whose name is the name of assembly, and put all track files and assembly file into it. Then, you can run preprocess and deploy scripts.