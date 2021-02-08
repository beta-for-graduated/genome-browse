import Markdown from 'markdown-to-jsx'
import { Fragment } from 'react'
import {container, image} from '../styles/manual.module.css'

import path from 'path'
import fs from 'fs'

export async function getStaticProps() {
  const markdownFile = path.join(process.cwd(),'lib/user_guide.md')
  return {
    props: {
      userGuide: fs.readFileSync(markdownFile,'utf8')
    }
  }
}

export default function Manual( {userGuide} ) {
  return (
    <div className={container}>
      <Markdown options={{
        overrides:{
          img: MyImage
        }
      }}>
        {userGuide}
      </Markdown>
    </div>
  )
}

function MyImage({src}) {
  return <Fragment>
    <img src={src} className={image}></img>
    <br></br>
  </Fragment>
  }