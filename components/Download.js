import { Tree } from 'antd'
import manifest from '../manifest.json'  
import {download} from '../styles/utils.module.css'

const { DirectoryTree } = Tree;
const treeData = manifest.data.download;

export default function Download () {
  const onSelect = (keys, { node }) => {
    var a = document.createElement('a');
    a.href = node.url;
    a.download = node.title;
    a.click();
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

