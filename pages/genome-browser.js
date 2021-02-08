import { Fragment } from "react";
import {jbrowse} from '../styles/utils.module.css'
import manifest from '../manifest.json'


export async function getStaticProps() {
  return {
    props: {
      localIP: process.env.DOMAIN,
    }
  }
}


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


// import 'fontsource-roboto'
// import {
//   createViewState,
//   createJBrowseTheme,
//   JBrowseLinearGenomeView,
//   ThemeProvider,
// } from '@jbrowse/react-linear-genome-view'
// import jbrowseConfig  from '../jbrowse/config.json'


// export default function GenomeBrowser() {
//   const theme = createJBrowseTheme()
//   const state = createViewState(jbrowseConfig)
//   return <ThemeProvider theme={theme}>
//     <JBrowseLinearGenomeView viewState={state} />
//   </ThemeProvider>
// }