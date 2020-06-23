import React, {useEffect, useState} from 'react'

export default function Search({uniqueSearch}) {
const serverPath = process.env.REACT_APP_SERVER_PATH;
const urlimg = process.env.REACT_APP_DYNAMIC_IMG_PATH;
const [uniqueSerie, setUniqueSerie] = useState([])

console.log(uniqueSearch);



useEffect(() => {
    const fetchUniqueSerie = async() =>{
        const response = await fetch (`${serverPath}/serieSynopsis/${uniqueSearch.serie_id}`)
        const data = await response.json()
        console.log(...data)
        setUniqueSerie(data)
    }

    fetchUniqueSerie()
}, [uniqueSearch, serverPath])



    return (
        <div>
            <h3>{uniqueSerie && uniqueSerie[0] && uniqueSerie[0].title? uniqueSerie[0].title:""}</h3>
            <img src={uniqueSerie && uniqueSerie[0] && uniqueSerie[0].image?`${urlimg}/${uniqueSerie[0].image}`: ""} alt=""/>
        </div>
    )
}
