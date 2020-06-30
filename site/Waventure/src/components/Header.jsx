import React, { useState, useContext } from "react";
import "../style/Header.css";
import {Redirect} from 'react-router-dom'
import { useRef } from "react";
import Context from '../context/context'

import HeaderContent from "./HeaderContent";

export default function Header({handleSearchApp}) {

  const { 
    categoriesTrigger, 
    accountTrigger, 
    categories,
    toggle, 
    serverPath,
    setCategoriesTrigger, 
    setAccountTriggerTrigger, 
    setToggle 
  } = useContext(Context)

  
  const [search, setSearch] = useState('')
  const [resultSearch, setResultSearch] = useState([])
  const refSearch = useRef(null)

  const showCategories = () => {
    setCategoriesTrigger(!categoriesTrigger);
  };



  const avatar = async () => {
    setAccountTriggerTrigger(!accountTrigger);
  };

  const fetchSearchSeries = async (e) => {
    let userSearch = refSearch.current.value
    const response = await fetch(`${serverPath}/serie?search=%${userSearch}%`)
    const data = await response.json()
    setResultSearch(data)
  }

 


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
showCategories={showCategories}
categoriesTrigger={categoriesTrigger}
avatar={avatar}
accountTrigger={accountTrigger}
logout={logout}
/>
  );
}
