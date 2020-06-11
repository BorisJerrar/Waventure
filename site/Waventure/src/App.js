import React ,{useState} from "react";
import './App.css';
import  Header from './components/Header'
import  Player from './components/Player'
import Catalog from './components/Catalog'
import Banner from './components/Banner'


function App() {
  const [categoriesTrigger, setCategoriesTrigger] = useState(false)
  const [accountTrigger, setAccountTriggerTrigger] = useState(false)
  const [serieId, setSerieId] = useState(5)
  const [index, setIndex] = useState(0);
  const triggeringCategory = () => {
    if(categoriesTrigger){
      setCategoriesTrigger(!categoriesTrigger)
    } else if(accountTrigger){
      setAccountTriggerTrigger(!accountTrigger)
    }
  }
  const lunchingEpisode = (serie_id) => {
    setIndex(0)
setSerieId(serie_id)
    
  }
  return (
    <div className='App' onClick={triggeringCategory}>
<>
    <Header
    categoriesTrigger={categoriesTrigger}
    setCategoriesTrigger={setCategoriesTrigger}
    accountTrigger={accountTrigger}
    setAccountTriggerTrigger={setAccountTriggerTrigger}
    />
<Player serieId={serieId}
index={index}
setIndex={setIndex}
/>
    <Banner
    lunchingEpisode={(serie_id)=>lunchingEpisode(serie_id)}
    />
    <Catalog
        lunchingEpisode={(serie_id)=>lunchingEpisode(serie_id)}
    />
    
    
</>
    </div>
  );
}

export default App;