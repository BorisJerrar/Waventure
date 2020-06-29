import React, { useState, useEffect, useContext } from "react";
import "../style/Header.css";
import {Redirect} from 'react-router-dom'
import { useRef } from "react";
import Context from '../context/context'
import fetchUserAvatar from "../utiles/fetchUserAvatar";
import HeaderContent from "./HeaderContent";

export default function Header({handleSearchApp}) {

  const { 
    validate, 
    categoriesTrigger, 
    accountTrigger, 
    titleArray, 
    toggle, 
    setCategoriesTrigger, 
    setAccountTriggerTrigger, 
    setTitleArray, 
    setToggle 
  } = useContext(Context)

  const [search, setSearch] = useState('')
  const [resultSearch, setResultSearch] = useState([])
  const [userAvatar, setUserAvatar] = useState("");

  const refSearch = useRef(null)
  
  const serveurPath = process.env.REACT_APP_SERVER_PATH;

  const token = localStorage.getItem('token');

  const categories = () => {
    setCategoriesTrigger(!categoriesTrigger);
  };

  useEffect(() => {
    const fetching = async () => {
      const data = await fetch(`${serveurPath}/category`);
      const json = await data.json();
      setTitleArray(json);
    }
    if (categoriesTrigger) {
      fetching()
    }
  }, [categoriesTrigger, serveurPath, setTitleArray])

  const avatar = async () => {
    setAccountTriggerTrigger(!accountTrigger);
  };

  const fetchSearchSeries = async (e) => {
    let userSearch = refSearch.current.value
    const response = await fetch(`${serveurPath}/serie?search=%${userSearch}%`)
    const data = await response.json()
    setResultSearch(data)
  }

  /**
   * Fetch user avatar
   * @param token 
   */
  useEffect(() => {

    fetchUserAvatar(setUserAvatar);
  }, [serveurPath, token, validate])


  const getInput = (e) => {
    if (e.target.value !== "") {
      setToggle(true)
    } else {
      setToggle(false)
    }
    setSearch(e.target.value)
    fetchSearchSeries(e)
  }

  const showSearch = (e) => {
    if (e.target.value !== "") {
      setToggle(true)
    }

  }

  const logout = () => {
    localStorage.clear('token');
    if (!localStorage.getItem('token')) {
      return <Redirect to="/home" />
    }
  }

  const handleSearch = (result) => {
    handleSearchApp(result)
  }

  return (

<HeaderContent 
refSearch={refSearch}
showSearch={showSearch}
getInput={getInput}
search={search}
handleSearch={handleSearch}
toggle={toggle}
resultSearch={resultSearch}
categories={categories}
categoriesTrigger={categoriesTrigger}
titleArray={titleArray}
avatar={avatar}
userAvatar={userAvatar}
accountTrigger={accountTrigger}
logout={logout}
/>
  );
}
