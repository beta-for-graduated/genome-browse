import fs from 'fs'
import process from 'process'
import path from 'path'
import { Menu } from 'antd'
import { Fragment,createElement,useState } from 'react'
import Jbrowse from '../components/Jbrowse'
import Home from '../components/Home'
import Download from '../components/Download'
import Manual from '../components/Manual'
import {menu, content} from '../styles/utils.module.css'

const contents = {
  names: ["Introduction", "Genome browser", "Data download", "Manual"],
  components: [Home, Jbrowse, Download, Manual]
}

export default function App({ localIP, userGuide }) {
  const [currentItem, changeItem] = useState("Introduction")
  const menuItems = contents.names;
  const handleClick = e => {changeItem(e.key)}
  return (
    <Fragment>
      <Menu
      className={menu} 
      mode="horizontal" 
      onClick={handleClick}>
        {menuItems.map(itemName => 
          <Menu.Item key={itemName}>
            { itemName }
          </Menu.Item>
        )}
      </Menu>
      <Content
      localIP={localIP}
      userGuide={userGuide} 
      className={content} 
      title={currentItem}>
      </Content>
    </Fragment>
  ) 
}

export async function getStaticProps() {
  const markdownFile = path.join(process.cwd(),'lib/user_guide.md')
  return {
    props: {
      localIP: process.env.DOMAIN,
      userGuide: fs.readFileSync(markdownFile,'utf8')
    }
  }
}

function Content ( {title, localIP, userGuide} ) {
  let index = contents.names.indexOf(title);
  return createElement(
    contents.components[index],
    {localIP, userGuide}
  )
}