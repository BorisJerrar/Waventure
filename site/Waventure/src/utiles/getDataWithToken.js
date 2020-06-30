import axios from 'axios';
/**
 * setState with data from db 
 * @param {string} method 
 * @param {string} path 
 * @param {function} setState 
 * @returns {array} 
 */
    const getDataToken = ( path, setState, params) => {
        const serverPath = process.env.REACT_APP_SERVER_PATH;
        const token = localStorage.getItem("token");
        axios(`${serverPath}/${path}/${params}`,{
            method: 'get',
            headers: {
                'x-access-token': token
            }
        }).then((res)=>{
            setState(res.data)
        }).catch((error)=>{
            console.log(error);
            
        })
      };

      export default getDataToken