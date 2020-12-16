import { Tree } from 'antd'
import manifest from '../manifest.json'  
import {download} from '../styles/utils.module.css'

const { DirectoryTree } = Tree;
const publicAssetsList = manifest.data.public;
const treeData = publicAssetsList.map(folder => ({
  title: folder.folderName,
  key: folder.folderName,
  children: folder.files.map(fileName => ({
    title:fileName, 
    key:fileName,
    isLeaf: true,
    url: `http://localhost:8081/${folder.folderName}/${fileName}`
  }))
}))



export default function Download () {
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

