import React, {useState, useEffect} from 'react'
import Categorie from './Categorie'

export default function Catalog() {
const [categories, setCategories] = useState([])

const fetchCategories = async() =>{
    const response = await fetch (`http://localhost:4000/category`)
    const data = await response.json()
    
    setCategories(data)
}
useEffect(() => {
 fetchCategories()
}, [])
    

console.log(categories);

   
    return (
        categories.map((item, index)=>{
            return(
             <Categorie
             key = {index}
             category = {item.name}
             /> 
            )
        
        })
    )
}
