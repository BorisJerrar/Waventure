import React, {useState} from 'react'
import "../style/Contact.css";
import MainProfilInfo from './MainInfoProfil'

export default function Contact({user, setUser}) {
    const server = process.env.REACT_APP_SERVER_PATH;
    const [newSerie, setNewSerie] = useState({
        account: user[0].account_id,
        email: user[0].email,
        title: "",
        body:""
    })

    const updateTitle = e =>{
        setNewSerie({
            ...newSerie,
            title: e.target.value
        })
    }
    const updateBody = e =>{
        setNewSerie({
            ...newSerie,
            body: e.target.value
        })
    }

    const sendSerie = () =>{
        fetch(`${server}/sendSerie`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newSerie)
        })
    }


    

    return (
        
        <div className="contact">
            <MainProfilInfo
            justify ={"center"}
            user={user}
            setUser={setUser}
            />
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
            <input  type="text" placeholder="Titre de la saga" onChange={updateTitle}/>
            <textarea  placeholder="Résumé de la série" onChange={updateBody}></textarea>
            {/* <input type="file" onChange={handleSoundUpload}/> */}
            <button onClick={sendSerie}>Envoyer</button>
            <p className="favoriteSagaParagraph ">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras amet nulla leo imperdiet eu in eu hendrerit 
                duis. In iaculis integer feugiat ac metus. Dolor netus leo, sollicitudin nisi. 
                Auctor urna in est massa nunc iaculis.</p>
        </div>

        <footer className="footerContact">
            <p>Ma saga favorite n'est pas ici</p>
            <p>Proposer ma propre saga</p>
            <p>Contacter Waventure</p>
        </footer>
        </div>
    )
}
