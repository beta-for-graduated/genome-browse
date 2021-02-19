ps -ef | grep node | awk '{print $2}' | xargs -n 1 kill
npm i --unsafe-perm
npm run update_jbrowse
npm run main_build
nohup npx next start -p $(node server/main.js) >> logs/mainServe.log &
nohup npm run data_serve >> logs/dataServe.log &
nohup npm run jbrowse_serve >> logs/jbrowseServe.log &
