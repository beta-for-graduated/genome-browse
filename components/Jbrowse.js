import { Fragment } from "react";
import {jbrowse} from '../styles/utils.module.css'
import manifest from '../manifest.json'

export default function Jbrowse({ localIP }) {
  return (
    <Fragment>
      <iframe 
        className={jbrowse}
        id="jbrowse" 
        width="100%"
        src={`http://${localIP}:${manifest.jbrowse.port}`}
      ></iframe>
    </Fragment>
  )
}