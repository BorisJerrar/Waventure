import React, { useState, useEffect } from 'react'

export default function Categorie() {
    const [series, setSeries] = useState([])
    const fetchSeries = async() =>{
        const reponse = await fetch(`http://localhost:4000/test?url=survivaure`)
        const data = await reponse.blob()
        console.log(data);
        
        setSeries(URL.createObjectURL(data))

        
    }
    useEffect(()=>{
        fetchSeries()
    }, [])


 
     return(
    /* <div className="container">
        {series.map((item, index)=>{
            return(
            <div key={index}>
                <img src={item.image} alt=""/>
                <p>{item.title}</p>
            </div>
            )
        })}
    </div> */
<>
    <div>yoyoyoyyo</div>
    <img src={series} alt=""/>
    </>
)    

 }   

