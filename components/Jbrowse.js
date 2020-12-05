import { Fragment } from "react";
import {jbrowse} from '../styles/utils.module.css'


export default function Jbrowse() {
  return (
    <Fragment>
      <iframe 
        className={jbrowse}
        id="jbrowse" 
        width="100%"
        src="http://localhost:8080"
      ></iframe>
    </Fragment>
  )
}