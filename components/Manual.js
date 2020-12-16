import Markdown from 'markdown-to-jsx'
import { Fragment } from 'react'
import {container, image} from '../styles/manual.module.css'

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