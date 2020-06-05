import React ,{useState} from "react";
import './App.css';
import  Header from './components/Header'
<<<<<<< HEAD
import  Player from './components/Player'
=======
import Banner from './components/Banner'
>>>>>>> charlesTest


function App() {
  const [categoriesTrigger, setCategoriesTrigger] = useState(false)
  const [accountTrigger, setAccountTriggerTrigger] = useState(false)
  const triggeringCategory = () => {
    if(categoriesTrigger){
      setCategoriesTrigger(!categoriesTrigger)
    } else if(accountTrigger){
      setAccountTriggerTrigger(!accountTrigger)
    }
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
<<<<<<< HEAD
=======
    <Banner/>
    <Categorie
    title={"Les classiques"}
    />
    <Categorie
    title={"Aventure Médiéval"}
    />
    <Categorie
    title={"Aventure Spatiale"}
    />
    
>>>>>>> charlesTest
</>
<Player />
    </div>
  );
}

export default App;