import React, {useState, useEffect} from 'react'

export default function MainInfoProfil() {
    const axios = require('axios')
    const [user, setUser] = useState([])
    const token =  localStorage.token
    const urlimg = process.env.REACT_APP_DYNAMIC_IMG_PATH;

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

    useEffect(()=>{
        fetchAccount()
     },[])

    return (
        <div className="userInfo">
            <img src={user && user[0] && user[0].avatar_id ?`${urlimg}/Avatar0${user[0].avatar_id}.jpg`: ""} alt=""/>
            <div>
            <p>{user && user[0] && user[0].first_name? user[0].first_name + " " + user[0].last_name: ""}</p>
            <p>{user && user[0] && user[0].username? user[0].username:""}</p>
            <p>{user && user[0] && user[0].email? user[0].email: ""}</p>
            </div>
            
        </div>
    )
}
