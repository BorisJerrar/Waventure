import React, {useState, useEffect} from 'react'
import "../style/Contact.css";
import MainProfilInfo from './MainInfoProfil'

export default function Contact() {
    const axios = require('axios')
    const [fileAudio, setFileAudio] = useState(null)
   
  
    const handleSoundUpload = e =>{
        setFileAudio(e.target.files[0])
    }

    const handleToServer = () => {    
        const data = new FormData()
        data.append('file', fileAudio)
        console.log(data);
        axios.post('http://localhost:4000/upload', data, {

        }).then(res=>{
            console.log(res.statusText);
            
        })
}




    return (
        
        <div className="contact">
            <MainProfilInfo/>
        <div className="favoriteSaga">
            <p className="favoriteSagaTitle">Pourquoi ma saga favorite n’est pas sur votre site?</p>
            <p className="favoriteSagaParagraph" >Lorem ipsum dolor sit amet consectetur adipisicing elit. In doloribus magni eius laudantium praesentium, 
                placeat alias tempore saepe adipisci suscipit, corrupti voluptatem modi accusantium labore, 
                ex nisi delectus odio numquam! Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                In doloribus magni eius laudantium praesentium, placeat alias tempore saepe adipisci suscipit, 
                corrupti voluptatem modi accusantium labore, ex nisi delectus odio numquam!</p>
            <p className="favoriteSagaParagraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. In doloribus magni eius laudantium praesentium, 
                placeat alias tempore saepe adipisci suscipit, corrupti voluptatem modi accusantium labore, 
                ex nisi delectus odio numquam! Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                In doloribus magni eius laudantium praesentium, placeat alias tempore saepe adipisci suscipit, 
                corrupti voluptatem modi accusantium labore, ex nisi delectus odio numquam!</p>
            <p className="favoriteSagaParagraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. In doloribus magni eius laudantium praesentium, 
                placeat alias tempore saepe adipisci suscipit, corrupti voluptatem modi accusantium labore, 
                ex nisi delectus odio numquam! Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                In doloribus magni eius laudantium praesentium, placeat alias tempore saepe adipisci suscipit, 
                corrupti voluptatem modi accusantium labore, ex nisi delectus odio numquam!</p>
        </div>

        <div className="formNewSaga">
            <p className="favoriteSagaTitle">Je souhaite que Waventure diffuse ma Saga</p>
            <input  type="text" placeholder="Titre de la saga"/>
            <textarea  placeholder="Résumé de la série"></textarea>
            <input type="file" onChange={handleSoundUpload}/>
            <button onClick={handleToServer}>Envoyer</button>
            <p className="favoriteSagaParagraph ">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras amet nulla leo imperdiet eu in eu hendrerit 
                duis. In iaculis integer feugiat ac metus. Dolor netus leo, sollicitudin nisi. 
                Auctor urna in est massa nunc iaculis.</p>
        </div>

        <footer>
            <p>Ma saga favorite n'est pas ici</p>
            <p>Proposer ma propre saga</p>
            <p>Contacter Waventure</p>
        </footer>
        </div>
    )
}
