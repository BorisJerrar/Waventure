import React, {useState, useEffect} from 'react'
import "../style/Contact.css";
import axios from 'axios'

export default function Contact() {
    const axios = require('axios')
    const [user, setUser] = useState([])
    const [fileAudio, setFileAudio] = useState(null)
    const token =  localStorage.token
    const urlimg = process.env.REACT_APP_DYNAMIC_IMG_PATH;
    const server = process.env.REACT_APP_SERVER_PATH;

    const config = {
        method: 'get',
        url: 'http://localhost:4000/account',
        headers: {
            'x-access-token': token
        }
    }

    const fetchAccount = () => {
       axios(config)
    .then((response)=>{
        console.log(response.data);
        setUser(response.data)
    })
    .catch((error)=>{
        console.log(error);
        
    }) 
    }

   
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


    useEffect(()=>{
       fetchAccount()
    },[])

    return (
        <div className="contact">
        <div className="userInfo">
            <img src={user && user[0] && user[0].avatar_id ?`${urlimg}/Avatar0${user[0].avatar_id}.jpg`: ""} alt=""/>
            <div>
            <p>{user && user[0] && user[0].first_name? user[0].first_name + " " + user[0].last_name: ""}</p>
            <p>{user && user[0] && user[0].username? user[0].username:""}</p>
            <p>{user && user[0] && user[0].email? user[0].email: ""}</p>
            </div>
            
        </div>
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
