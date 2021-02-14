import { Fragment } from 'react'
import { Menu } from 'antd'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'

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
  const router = useRouter();
  function findNavigationName(path) {
    path = path.slice(1);
    return Object.keys(navigators).filter(
      navName=>navigators[navName]===path
    )[0] || '';
  }
  const currentNavigator = findNavigationName(router.pathname)

  return <Fragment>
    <Head>
      <title>{currentNavigator ? currentNavigator+' | ' : ''}Mangrove Genome Browser</title>
      <link rel="icon" type="image/png" sizes="128x128" href="/mangrove-icon.png"></link>
    </Head>
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