import React, { useState, useEffect } from 'react'

export default function Categorie() {
    const [image, setImage] = useState([])
    const [imageUrlSeries, setImageUrlSeries]= useState([])

    const fetchSeries = async() =>{
        const reponse = await fetch(`http://localhost:4000/series`)
        const data = await reponse.json()     
        setImageUrlSeries([...imageUrlSeries, data.map((each)=>{return(each.image)})])
        console.log(data); 
    }
    console.log(imageUrlSeries);


     const fetchImages = async() =>{
         for(let i = 0; i < imageUrlSeries.length; i++){
             setImage(...image, 'http://localhost:4000/test?url=')
         }
            try{
                const reponse = Promise.all(image.map((item, index)=>{
                    fetch(item + imageUrlSeries[index]).then(resp => resp.json())
                
                })).then(json=>{
                    console.log(json);
                })
            } catch (e){
                console.log(e);
                
            }
      /*         console.log(imageUrlSeries[i]);
        const reponse = await fetch(`http://localhost:4000/test?url=${imageUrlSeries[i]}`)
        const data = await reponse.blob()
        setImage([...image, URL.createObjectURL(data)])
        console.log(data); */
         
       


} 


/* videoUrls= async () => {
    let i=0;
    let urllist=[]
    for(i;i< this.state.data.length;i++){
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${this.state.data[i].name}&key=xxxxxxxxxxx0`)
        const json = await response.json()
        urllist.push(json.items[0])
        console.log({urllist})
      }
   } */

useEffect(()=>{
    fetchSeries()
   
}, [])

useEffect(()=>{
    fetchImages()
}, [imageUrlSeries])

 
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
