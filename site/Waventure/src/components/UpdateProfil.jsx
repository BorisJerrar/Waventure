import React from "react";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Context from "../context/context";
import getData from "../utiles/getData"
import getDataToken from "../utiles/getDataWithToken"

export default function UpdateProfil() {
  const { serverPath, setUser, user } = useContext(Context);
  const [avatar, setAvatar] = useState([]);
  const url = process.env.REACT_APP_DYNAMIC_IMG_PATH;

  useEffect(() => {
    getData("avatar", setAvatar, "")
    if(user.length){
      setUser(user[0])
    }
  }, [setUser, user]);

  
  const updateAvatar = (key) => {
    setUser({
      ...user,
      avatar_id: key + 1,
    });
  };

  const fetchuser = async () => {
    
    fetch(`${serverPath}/account/${user.account_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((res) => {
      getDataToken('account', setUser, '')
    });
  };
  return (
    <div className="containerUpdate">
      <div className="containerAvatar">
        {avatar.map((each, key) => {
          return (
            <img
              onClick={() => updateAvatar(key)}
              key={key}
              className="avatar"
              src={`${url}/${each.avatar_path}`}
              alt={`avatar`}
            />
          );
        })}
      </div>
      <div className="containerForm">
        <form className="formUpdate">
          <label>Nom</label>
          <input
            type="text"
            value={ user.last_name || ""}
            onChange={(e) => {
              setUser({ ...user, last_name: e.target.value });
            }}
          />
          <label>Prénom</label>
          <input
            type="text"
            value={user.first_name || ""}
            onChange={(e) => {
              setUser({ ...user, first_name: e.target.value });
            }}
          />
          <label>Pseudo</label>
          <input
            type="text"
            value={user.username || ""}
            onChange={(e) => {
              setUser({ ...user, username: e.target.value });
            }}
          />
          <label>Email</label>
          <input
            type="text"
            value={user.email || ""}
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
          />
          <Link to="/profil" style={{ textDecoration: "none" }}>
            <input
              type="button"
              value="Valider"
              className="btnProfil"
              onClick={fetchuser}
            />
          </Link>
        </form>
      </div>
    </div>
  );
}
