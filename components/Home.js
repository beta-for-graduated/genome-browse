import {container, topImage, title, intro, websiteFunc, copyright} from '../styles/home.module.css'

export default function Home () {
  return (
    <div className={container}>
      <img className={topImage} src="/mangrove.jpg"></img>
      <div className={title}>
        Mangrove Genome Browser
      </div>
      <br></br>
      <div className={intro}>
        <p>
          Welcome!
          <br></br>
          Mangroves are salt-tolerant trees, also called halophytes, and are adapted to life in harsh coastal 
          conditions. They contain a complex salt filtration system and complex root system to cope with salt 
          water immersion and wave action. They are adapted to the low oxygen conditions of waterlogged mud.
          Mangrove swamps protect coastal areas from erosion, storm surge (especially during hurricanes), 
          providing measurable economic protections to coastal communities to tropical storm impacted 
          communities globally, and tsunamis. Besides, mangroves are an important source of blue carbon.So,
          we build this website to help research and analysis for mangrove genome.
        </p>
        <br></br>
        <p>
          This website provides service as following:
          <br></br>
          <p className={websiteFunc}>
          1. Visualization for sequences and gene annotations.
          <br></br>
          2. Download service.
          <br></br>
          3. Search relational genome sequences.
          </p> 
        </p>
        <br></br>
        <p>
          If you don’t know how to use genome browser, switch to the ‘Manual’ channal where examples are 
          provided, or you can see <a href="https://jbrowse.org/jb2/">https://jbrowse.org/jb2/</a> for help.
        </p>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className={copyright}>
        Copyright © 2009 Key Laboratory of the Ministry of Education for Coastal and Wetland Ecosystems
      </div>
    </div>
  )
}