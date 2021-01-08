# Genome-Browse

To simplyify the development, we divide this project into four parts: main page, genome visualization and download service, deployed at different ports. The main page provides entry points for the other three services, bootstrapped with Next.js. The download service and genome visualization are deployed simply on static servers by Express.js, solving cross-site problems by CORS. And genome visualization is powered by JBrowse2.

## Available Scripts
### Launch the whole server
```sh
./start.sh [domain]
```

### Start data and jbrowse service
```sh 
npm run serve
```

### Start main page service
```sh
# development mode
npm run dev
# production mode
npm run build & npm run start
```

### Preprocess genome data
```sh
node scripts/preprocess_data.js [dataDir]
```

### Deploy data on genome visualization
```sh
node scripts/deploy_jbrowse.js [baseURL] [localPath]
```

## Add genome data
In the "data" folder, each assembly and its tracks file are put in common folder whose name is the same as the assembly file. So, if you want to create a new assembly, you should create new folder under "data", whose name is the name of assembly, and put all track files and assembly file into it. Then, you can run preprocess and deploy scripts.