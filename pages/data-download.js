import { Tree } from 'antd'


import manifest from '../manifest.json'  
import {download} from '../styles/utils.module.css'


export async function getStaticProps() {
  return {
    props: {
      baseURL: `http://${process.env.DOMAIN}:${process.env.DATA_PORT}`,
    }
  }
}


export default function Download ({ baseURL }) {
  const { DirectoryTree } = Tree;

  const treeData = manifest.map(folder => ({
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

  return (
    <div
    className={download}>
      <DirectoryTree
      onSelect={onSelect}
      treeData={treeData}
      />
    </div>
    
  );
}

