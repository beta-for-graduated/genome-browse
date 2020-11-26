# Genome-Browse

To simplyify the development, we divide this project into four parts: main page, genome visualization, gene sequence search and data service, deploying them at different ports. In the main page, the entry points for the other three services are given, which is bootstrapped with Next.js. The data service and genome visualization are deployed on static file servers simply by Express.js, solving cross-site problems by CORS. Here genome visualization is powered by JBrowse2.

## Available Scripts

### Start data and jbrowse service
```sh 
npm run serve
```

### Start main page service
```sh
npm run dev
# or do following script
npm run build & npm run start
```

### Deploy data on genome visualization
```sh
node scripts/deploy_jbrowse.js
```

