import { Fragment } from "react";
import utilStyles from '../styles/utils.module.css'


export default function Jbrowse() {
  return (
    <Fragment>
      <iframe 
        className={utilStyles.jbrowse}
        id="jbrowse" 
        width="100%"
        src="http://localhost:8080"
      ></iframe>
    </Fragment>
  )
}