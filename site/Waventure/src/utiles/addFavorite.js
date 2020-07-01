import axios from 'axios'
const addFavorite = async (serverPath, item, token, callback) => {
    var addConfig = {
        method: 'POST',
        url: `${serverPath}/favorite/${item}`,
        headers: {
          'x-access-token': token
        }
      };
    axios(addConfig)
      .then(function (response) {
       return callback()
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  export default addFavorite