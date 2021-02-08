#TODO stop original server
npm i
rm -rf logs
npm run update_jbrowse
npm run main_build
mkdir logs
nohup npx next start -p `node server/main.js` > logs/mainServe.log &
nohup npm run data_serve > logs/dataServe.log &
nohup npm run jbrowse_serve > logs/jbrowseServe.log &