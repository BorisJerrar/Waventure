import React from 'react'

export default function Newest() {
    const fetchCategories = async() =>{
        const response = await fetch (`http://localhost:4000/serieUploades`)
        const data = await response.json()
        
        setCategories(data)
    }
    return (
        <Categorie
        key = {index}
        category = {item.name}
        lunchingEpisode={(serie_id)=>lunchingEpisode(serie_id)}
        /> 
    )
}
