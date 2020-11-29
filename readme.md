# Genome-Browse

To simplyify the development, we divide this project into four parts: main page, genome visualization and download service, deployed at different ports. The main page provides entry points for the other three services, bootstrapped with Next.js. The download service and genome visualization are deployed simply on static servers by Express.js, solving cross-site problems by CORS. And genome visualization is powered by JBrowse2.

## Available Scripts

### Start data and jbrowse service
```sh 
npm run serve
```

### Start main page service
```sh
npm run dev
# production mode
npm run build & npm run start
```

### Preprocess genome data
```sh
cd data/assemblyName
node ../../scripts/preprocess_data.js [fileName]
```

### Deploy data on genome visualization
```sh
node scripts/deploy_jbrowse.js [baseURL] [localPath]
```

## Data dir
For different orignism, you should put genome data into different folders whose name must be the name of main assembly.