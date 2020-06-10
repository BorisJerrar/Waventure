import React ,{useState} from "react";
import './App.css';
import  Header from './components/Header'
import  Player from './components/Player'
import Categorie from './components/Categorie'
import Banner from './components/Banner'


function App() {
  const [categoriesTrigger, setCategoriesTrigger] = useState(false)
  const [accountTrigger, setAccountTriggerTrigger] = useState(false)
  const [serieId, setSerieId] = useState(8)
  const triggeringCategory = () => {
    if(categoriesTrigger){
      setCategoriesTrigger(!categoriesTrigger)
    } else if(accountTrigger){
      setAccountTriggerTrigger(!accountTrigger)
    }
  }
  const lunchingEpisode = (serie_id) => {
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
    <Player 
    serieId={serieId}
    />
    <Banner
    lunchingEpisode={(serie_id)=>lunchingEpisode(serie_id)}
    />
    <Categorie
    title={"Les classiques"}
    />
    <Categorie
    title={"Aventure Médiéval"}
    />
    <Categorie
    title={"Aventure Spatiale"}
    />
    
</>
    </div>
  );
}

export default App;