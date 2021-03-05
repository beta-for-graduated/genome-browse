import {jbrowse} from '../styles/utils.module.css'


export async function getStaticProps() {
  return {
    props: {
      JbrowseURL: `http://${process.env.DOMAIN}:${process.env.JBROWSE_PORT}`,
    }
  }
}


export default function Jbrowse({ JbrowseURL }) {
  return <iframe 
    className={jbrowse}
    id="jbrowse" 
    width="100%"
    src={JbrowseURL}
  ></iframe>
}