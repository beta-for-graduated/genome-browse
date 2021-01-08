rm -f mainServe.log supportServe.log
npm run update_jbrowse
npm run build
# stop original server first
nohup npm run start > mainServe.log
nohup npm run serve $1 > supportServe.log