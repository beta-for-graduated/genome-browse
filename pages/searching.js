import {blast} from '../styles/utils.module.css'


const blastUrl = "http://120.25.215.94/"


export default function Searching() {
	return <iframe
		width="100%"
		className={blast}
		src={blastUrl} />
}
