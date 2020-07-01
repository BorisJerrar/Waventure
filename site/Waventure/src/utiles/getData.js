import axios from 'axios';
/**
 * setState with data from db 
 * @param {string} method 
 * @param {string} path 
 * @param {function} setState 
 * @returns {array} 
 */
    const getData = ( path, setState, params) => {
        const serverPath = process.env.REACT_APP_SERVER_PATH;
        axios(`${serverPath}/${path}${params}`,{
            method: 'get',
        }).then((res)=>{
            setState(res.data)
        }).catch((error)=>{
            console.log(error);
            
        })
      };

      export default getData