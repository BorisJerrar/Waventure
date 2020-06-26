import React from 'react'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

export default function UpdateProfil({ user, setValidate, validate}) {

    const [avatar, setAvatar] = useState([])
    const [account, setAccount] = useState(user[0])
    const server = process.env.REACT_APP_SERVER_PATH;
    const url = process.env.REACT_APP_DYNAMIC_IMG_PATH;


    
    useEffect(() => {
        const fetchAvatar = async () => {
            const response = await fetch(`${server}/avatar`)
            const data = await response.json()
            setAvatar(data)
        }
        fetchAvatar()
    }, [])

    const updateLastName = (e) => {
        setAccount({
            ...account,
            last_name: e.target.value
        })
    }

    const updateFirstName = (e) => {
        setAccount({
            ...account,
            first_name: e.target.value
        })
    }

    const updateUsername = (e) => {
        setAccount({
            ...account,
            username: e.target.value
        })
    }

    const updateEmail = (e) => {
        setAccount({
            ...account,
            email: e.target.value
        })
    }
    const updateAvatar = (key) => {
        setAccount({
            ...account,
            avatar_id: key + 1
        })
    }

    const fetchAccount = async()=>{
        fetch(`${server}/account/${account.account_id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(account)
        }).then((res)=>{
            if(res.status === 200){
                setValidate(!validate) 
            }
        })
           
    }
    
    return (
        <div className="containerUpdate">
            <div className="containerAvatar">
                {avatar.map((each, key) => {
                    return (
                        <img
                            onClick={()=>updateAvatar(key)}
                            key={key}
                            className="avatar"
                            src={`${url}/${each.avatar_path}`}
                            alt={`image avatar`}
                        />
                    )
                })}
            </div>
            <div className='containerForm'>
                <form className="formUpdate">
                    <label>Nom</label>
                    <input type="text" value={account.last_name} onChange={updateLastName} />
                    <label>Prénom</label>
                    <input type="text" value={account.first_name} onChange={updateFirstName} />
                    <label>Pseudo</label>
                    <input type="text" value={account.username} onChange={updateUsername} />
                    <label>Email</label>
                    <input type="text" value={account.email} onChange={updateEmail} />
                    <Link to="/profil" style={{textDecoration: "none"}}>
                    <input type="button" value="Valider" className="btnProfil" onClick={fetchAccount}/>
                    </Link>
                    
                </form>
            </div>

        </div>
    )
}
