import React, {useEffect} from 'react'
import "../style/mainInfoProfil.css";
import axios from 'axios'

export default function MainInfoProfil({justify, user, setUser}) {
    const token =  localStorage.token
    const urlimg = process.env.REACT_APP_DYNAMIC_IMG_PATH;

    const config = {
        method: 'get',
        url: 'http://localhost:4000/account',
        headers: {
            'x-access-token': token
        }
    }
    useEffect(()=>{
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
        fetchAccount()
     },[ token, config, setUser])

    return (
        <div className="userInfo" style={{display: "flex", justifyContent: justify}}>
            <img src={user && user[0] && user[0].avatar_id ?`${urlimg}/Avatar0${user[0].avatar_id}.jpg`: ""} alt=""/>
            <div>
            <p>{user && user[0] && user[0].first_name? user[0].first_name + " " + user[0].last_name: ""}</p>
            <p>{user && user[0] && user[0].username? user[0].username:""}</p>
            <p>{user && user[0] && user[0].email? user[0].email: ""}</p>
            </div>
            
        </div>
    )
}
