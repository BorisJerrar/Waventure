import React ,{useState} from "react";
import './App.css';
import Categorie from './components/Categorie.jsx'
import  Header from './components/Header'


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
    <Categorie/>
</>
    </div>
  );
}

export default App;
