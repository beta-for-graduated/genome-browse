# kill old servers
ps -ef | grep node | awk '{print $2}' | xargs -n 1 kill
npm i --unsafe-perm
# update config.json
npm run update_jbrowse
# launch main server
npm run main_build
nohup npx next start -p $(node server/main.js) >> logs/mainServe.log &
# launch data server
nohup npm run data_serve >> logs/dataServe.log &
# launch jbrowse2 server
nohup npm run jbrowse_serve >> logs/jbrowseServe.log &
