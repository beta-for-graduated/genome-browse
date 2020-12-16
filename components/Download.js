import { Tree } from 'antd'
import manifest from '../manifest.json'  
import {download} from '../styles/utils.module.css'
const { DirectoryTree } = Tree;


export default function Download ({ localIP }) {
  const publicAssetsList = manifest.data.public;
  const baseURL = `http://${localIP}:${manifest.data.port}`;
  const treeData = publicAssetsList.map(folder => ({
    title: folder.folderName,
    key: folder.folderName,
    children: folder.files.map(fileName => ({
      title:fileName, 
      key:fileName,
      isLeaf: true,
      url: `${baseURL}/${folder.folderName}/${fileName}`
    }))
  }));

  const onSelect = (keys, { node }) => {
    if(node.title.includes('.')){
      let a = document.createElement('a');
      a.href = node.url;
      a.download = node.title;
      a.click();
    }
  };

  const onExpand = () => {
    console.log('Trigger Expand');
  };

  return (
    <div
    className={download}>
      <DirectoryTree
      onSelect={onSelect}
      onExpand={onExpand}
      treeData={treeData}
      />
    </div>
    
  );
}

