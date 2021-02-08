import { Menu } from 'antd'
import Link from 'next/link'
import { Fragment } from 'react'

import '../styles/index.css';
import 'antd/dist/antd.css';
import {navigation, content} from '../styles/utils.module.css'


export default function App({ Component, pageProps }) {  
  const navigators = {
    'Introduction': 'introduction',
    'Genome Browser': 'genome-browser', 
    'Data Download': 'data-download',
    'Manual': 'manual'
  };

  return <Fragment>
    <Menu
    className={navigation} 
    mode="horizontal">
      {Object.keys(navigators).map(navigatorName => 
        <Menu.Item key={navigatorName}>
          <Link href={'/'+navigators[navigatorName]}>{ navigatorName }</Link>
        </Menu.Item>
      )}
    </Menu>
    <Component 
    {...pageProps}
    className={content}> 
    </Component>
  </Fragment>
}