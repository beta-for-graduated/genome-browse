import { Menu } from 'antd'
import Jbrowse from '../components/Jbrowse'
import Home from '../components/Home'
import Download from '../components/Download'
import Manual from '../components/Manual'
import { Fragment,createElement,useState } from 'react'
import utilStyles from '../styles/utils.module.css'


const contents = {
  names: ["Introduction", "Genome browser", "Data download", "Manual"],
  components: [Home, Jbrowse, Download, Manual]
}

export default function App() {
  const [currentItem, changeItem] = useState("Introduction")
  const menuItems = contents.names;
  const handleClick = e => {changeItem(e.key)}
  return (
    <Fragment>
      <Menu
      className={utilStyles.menu} 
      mode="horizontal" 
      onClick={handleClick}>
        {menuItems.map(itemName => 
          <Menu.Item key={itemName}>
            { itemName }
          </Menu.Item>
        )}
      </Menu>
      <Content 
      className={utilStyles.content} 
      title={currentItem}>
      </Content>
    </Fragment>
  ) 
}

function Content ( {title} ) {
  let index = contents.names.indexOf(title);
  return createElement(contents.components[index])
}