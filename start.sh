#TODO stop original server
rm -rf logs
npm run update_jbrowse
npm run build
mainport=$(node server/main.js)
mkdir logs
nohup npx next start -p $mainport > logs/mainServe.log &
nohup npm run data_serve > logs/dataServe.log &
nohup npm run jbrowse_serve > logs/jbrowseServe.log &
echo $mainport