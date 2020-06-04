import React, { useState, useEffect } from 'react'

export default function Categorie() {
    const [series, setSeries] = useState([])
    const fetchSeries = async() =>{
        const reponse = await fetch(`http://localhost:4000/series`)
        const data = await reponse.json()
        setSeries(data)
    }
    useEffect(()=>{
        fetchSeries()
    }, [])
    
console.log(series[0] && series[0].image);

 
     return(
    <div className="container">
        {series.map((item, index)=>{
            return(
            <div key={index}>
                <img src={item.image} alt=""/>
                <p>{item.title}</p>
            </div>
            )
        })}
    </div>
)    

 }   

