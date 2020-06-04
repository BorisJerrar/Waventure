import React ,{useState} from "react";
import "../style/Header.css";

export default function Header() {
    const [titleArray, setTitleArray] = useState([])
    const [trigger, setTrigger] = useState(false)
    const pathImg = process.env.REACT_APP_STATIC_IMG_PATH;
    const categories = async () => {
        setTrigger(!trigger)
        const data = await fetch('http://localhost:4000/categories')
        const json = await data.json()
        setTitleArray(json)
    }
    
  return (
    <header>
      <div className="leftHeaderSide">
        <div className="waventureLogo">
          <img src={`${pathImg}/waventureLogo.svg`} alt="Waventure Logo"/>
          <h1>WAVENTURE</h1>
        </div>
        <div className="searchingBar">
          <input placeholder="Action" />
          <button>
            <img src={`${pathImg}/loupe.svg`} alt="Searching Logo" />
          </button>
        </div>
        <nav>
          <ul>
            <li className='category' onClick={categories}>
              Categories
              <i>
                <img src={`${pathImg}/arrow.svg`} alt="Arrow Icon" className='arrowCategories'/>
              </i>
              <div className='categoriesFetch'>
              {trigger?titleArray.map((each, key) => {return (<p key={key} className='categoriesParagraph' style=
              {trigger?{'padding': '8px', 'display' : 'block'}:{'display':'none'}}>{each.name}</p>) }):''}
              </div>
            </li>
            <li>Nouveautés</li>
            <li>Coup de coeur</li>
          </ul>
        </nav>
      </div>
      <div className="profilIcon">
        <img src={`${pathImg}/arrow.svg`} alt="Arrow Icon" />
        <img src={`${pathImg}/profilPic1.jpg`} alt="Profil Icon" />
      </div>
    </header>
  );
}
