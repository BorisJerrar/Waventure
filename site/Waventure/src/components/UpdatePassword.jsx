import React, { useState } from 'react'

export default function UpdatePassword({user}) {
    const [passwordUpdate, setPasswordUpdate] = useState({})
    const [account, setAccount] = useState(user[0])
    const server = process.env.REACT_APP_SERVER_PATH;
    


    
    const config = {
        method: 'put',
        url: `${server}/account/${account.account_id}`,
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(account)
    }
    
    const fetchPassword = async() => {
        if(passwordUpdate.new === passwordUpdate.confirm){
            fetch(config)
        } 
    }

    const verifyPassword = (e) =>{
        setPasswordUpdate({
            ...passwordUpdate,
            last : e.target.value
        })
    }
    const createNewPassword = (e) =>{
        setPasswordUpdate({
            ...passwordUpdate,
            new : e.target.value
        })
        setAccount({
            ...account, 
            password: e.target.value
        })
    }
    const confirmNewPassword = (e) =>{
        setPasswordUpdate({
            ...passwordUpdate,
            confirm : e.target.value
        })

    }
    
    return (
        <div className="containerUpdate">
            <form className="formUpdate">
            <label>Mot de passe actuel</label>
            <input type="password" onChange={verifyPassword}/>
            <label>Nouveau mot de passe</label>
            <input type="password" onChange={createNewPassword}/>
            <label>Confirmer mot de passe</label>
            <input type="password"  onChange={confirmNewPassword}/>
        </form> 
            <button onClick={fetchPassword}>Valider</button>

        </div>
       
    )
}
