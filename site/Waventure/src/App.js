import React ,{useState} from "react";
import './App.css';
import Categorie from './components/Categorie.jsx'
import  Header from './components/Header'
import Banner from './components/Banner'


function App() {
  const [trigger, setTrigger] = useState(false)
  const triggering = () => {
    if(trigger){
    setTrigger(!trigger)
    }
  }
  return (
    <div className='App' onClick={triggering}>
<>
    <Header
    trigger={trigger}
    setTrigger={setTrigger}
    />
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
    
</>
    </div>
  );
}

export default App;
