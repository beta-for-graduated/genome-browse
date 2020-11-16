import { Menu } from 'antd'
import Blast from '../components/Blast'
import Jbrowse from '../components/Jbrowse'
import Home from '../components/Home'
import Download from '../components/Download'
import Manual from '../components/Manual'
import { Fragment,createElement,useState } from 'react'
import utilStyles from '../styles/utils.module.css'


const contents = {Home, Blast, Jbrowse, Download, Manual}

export default function App() {
  const [currentItem, changeItem] = useState('Home')
  const menuItems = Object.keys(contents)
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
  return createElement(contents[title])
}