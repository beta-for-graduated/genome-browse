import {
  container, 
  topImage, 
  websiteTitle, 
  introduction, 
  gallery,
  cardInGallery,
  imageInCard,
} from '../styles/introduction.module.css'


export async function getStaticProps() {
  const cards = [
    {
      name: "Avicennia marina",
      imageSrc: "/gallery/Avicennia_marina.jpeg",
      session: "share-bdug3DSkqi&password=cVeL0"
    },
    {
      name: "Melastoma candium",
      imageSrc: "/gallery/Melastoma_candium.jpeg",
      session: "share-R-46JfPKBh&password=QGxQ4"
    },
    {
      name: "Rhizophora apiculata",
      imageSrc: "/gallery/Rhizophora_apiculata.jpeg",
      session: "share-yiH6RvMniF&password=Q3ENt"
    },
    {
      name: "Sonneratia alba",
      imageSrc: "/gallery/Sonneratia_alba.jpeg",
      session: "share-IFHc5BzOKb&password=oExWa"
    },
    {
      name: "Sonneratia caseolaris",
      imageSrc: "/gallery/Sonneratia_caseolaris.jpeg",
      session: "share-OEX5hI-WmD&password=GE1mV"
    },
    {
      name: "Kandelia obovata",
      imageSrc: "/gallery/Kandelia_obovata.jpeg",
      session: "share-w7V9jX3Um6&password=hrfNN"
    }
  ]
  cards.forEach(picture=>{
    picture.session = `http://${process.env.DOMAIN}:${process.env.JBROWSE_PORT}/?session=${picture.session}`
  })
  return {
    props: {
      cards
    }
  }
}


export default function Home ({ cards }) {
  function openVisualization(session) {
    return function(e) {
      e.preventDefault();
      window.open(session);
    }
  }
    
  return (
    <div className={container} >
      <img className={topImage} 
      src="/mangrove.jpg" 
      >
      </img>
      <h1 className={websiteTitle} >
        Mangrove Genome Browser
      </h1>
      <div className={introduction} >
          <h2>Welcome!</h2>
          <p>Mangroves are salt-tolerant trees, also called halophytes, and are adapted to life in harsh coastal 
          conditions. They contain a complex salt filtration system and complex root system to cope with salt 
          water immersion and wave action. They are adapted to the low oxygen conditions of waterlogged mud.
          Mangrove swamps protect coastal areas from erosion, storm surge (especially during hurricanes), 
          providing measurable economic protections to coastal communities to tropical storm impacted 
          communities globally, and tsunamis. Besides, mangroves are an important source of blue carbon.So,
          we build this website to help research and analysis for mangrove genome.</p>
          
          
          <h2>This website provides service as following:</h2>
          <h4>1. Visualization for sequences and gene annotations.</h4>
          <h4>2. Download service.</h4>
          <h4>3. Search relational genome sequences.</h4>
          <p></p>

          <h2>Specise collected by the website:</h2>
          <div className={gallery}>
            {cards.map(picture => 
              <div key={picture.name} className={cardInGallery}>
                <i>{picture.name}</i>
                <img className={imageInCard}
                width='200'
                height='200'
                title={picture.name} 
                alt={picture.name} 
                src={picture.imageSrc} 
                onClick={openVisualization(picture.session)} 
                >
                </img>
              </div>)}
          </div>
      </div>
    </div>
  )
}