import React from "react";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Context from "../context/context";

export default function UpdateProfil({ user, setValidate, validate }) {
  const { serverPath } = useContext(Context);
  const [avatar, setAvatar] = useState([]);
  const [account, setAccount] = useState(user[0]);
  const url = process.env.REACT_APP_DYNAMIC_IMG_PATH;

  useEffect(() => {
    const fetchAvatar = async () => {
      const response = await fetch(`${serverPath}/avatar`);
      const data = await response.json();
      setAvatar(data);
    };
    fetchAvatar();
  }, [serverPath]);

  const updateAvatar = (key) => {
    setAccount({
      ...account,
      avatar_id: key + 1,
    });
  };

  const fetchAccount = async () => {
    fetch(`${serverPath}/account/${account.account_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(account),
    }).then((res) => {
      if (res.status === 200) {
        setValidate(!validate);
      }
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
            value={account.last_name}
            onChange={(e) => {
              setAccount({ ...account, last_name: e.target.value });
            }}
          />
          <label>Prénom</label>
          <input
            type="text"
            value={account.first_name}
            onChange={(e) => {
              setAccount({ ...account, first_name: e.target.value });
            }}
          />
          <label>Pseudo</label>
          <input
            type="text"
            value={account.username}
            onChange={(e) => {
              setAccount({ ...account, username: e.target.value });
            }}
          />
          <label>Email</label>
          <input
            type="text"
            value={account.email}
            onChange={(e) => {
              setAccount({ ...account, email: e.target.value });
            }}
          />
          <Link to="/profil" style={{ textDecoration: "none" }}>
            <input
              type="button"
              value="Valider"
              className="btnProfil"
              onClick={fetchAccount}
            />
          </Link>
        </form>
      </div>
    </div>
  );
}
