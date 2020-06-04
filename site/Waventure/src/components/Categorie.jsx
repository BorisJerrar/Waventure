import React, { useState, useEffect } from 'react'

export default function Categorie() {
    const [image, setImage] = useState([])
    const [series, setSeries]= useState([])

    const fetchSeries = async() =>{
        const reponse = await fetch(`http://localhost:4000/series`)
        const data = await reponse.json()
        console.log(data);
        
}
 /*
    const fetchImages = async() =>{
        const reponse = await fetch(`http://localhost:4000/test?url=survivaure`)
        const data = await reponse.blob()
        setImage(URL.createObjectURL(data))

        
    }*/
    
/* 
    const fetchImages = async()=>{
        fetch(`http://localhost:4000/series`)
        .then(response=> response.json())
        .then(data=>{
            console.log(data);
            const tabimages = data.map(i => `http://localhost:4000/images/${i.image}`)
            console.log(tabimages);
            
            return data;
        }) */
        /* .then(async data =>{
            await Promise.all(data.map((item)=>{
                return fetch(`http://localhost:4000/test?url=survivaure`)
                .then(response => response.blob())
                .then(data=>{
                    console.log(URL.createObjectURL(data));
                    setImage([...image, URL.createObjectURL(data)])
                    
                }) */
           /*  })) */
        /* }) */
    }

    console.log(image);
    
useEffect(()=>{
        fetchImages()
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
    <div>
    <img src={image} style={{'width': '300px'}} alt=""/>
    </div>
)    

 }   

