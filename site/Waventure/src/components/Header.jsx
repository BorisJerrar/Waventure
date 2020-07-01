import React from "react";
import "../style/Header.css";
import HeaderContent from "./HeaderContent";

export default function Header({handleSearchApp}) {

  const handleSearch = (result) => {
    handleSearchApp(result)
  }

  return (

<HeaderContent 
handleSearch={handleSearch}
/>
  );
}
