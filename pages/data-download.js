import { Tree } from 'antd'
import { readdirSync } from 'fs'


import {download, directoryTree} from '../styles/utils.module.css'


export async function getStaticProps() {
  const manifest = readdirSync('data').map(folderName=>({
    folderName, 
    files: readdirSync(`data/${folderName}`)
  }))
  return {
    props: {
      baseURL: `http://${process.env.DOMAIN}:${process.env.DATA_PORT}`,
      manifest
    }
  }
}


export default function Download ({ baseURL, manifest }) {
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
    <div className={download}>
      {/* TODO add copyright */}
      {/* TODO larger font */}
      <DirectoryTree
      className={directoryTree}
      onSelect={onSelect}
      treeData={treeData}
      />
    </div>
    
  );
}

