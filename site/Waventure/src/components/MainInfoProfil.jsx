import React, { useContext } from 'react'
import "../style/mainInfoProfil.css";
import Context from '../context/context'


export default function MainInfoProfil({justify}) {
    const urlimg = process.env.REACT_APP_DYNAMIC_IMG_PATH;
    const { user } = useContext(Context);
    console.log(user);
    
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
