import React from 'react'

export default function UniqueUpdateProfil({eachValue, label, setUser, user}) {

    console.log(user[0].last_name);
    console.log(eachValue);
    console.log(user && user[0] && eachValue?user[0].eachValue: "");

    
    
    
    
    const updateUser = (e) =>{
       
        
    }

    return (
        <>
            <label>{label}</label>
            <input type="text" value={user[0].eachValue} onChange={updateUser}/>
        </>
    )
}
