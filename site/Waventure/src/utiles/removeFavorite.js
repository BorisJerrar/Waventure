import axios from 'axios'
const removeFavorite =  async (serverPath, item, token, callback) => {
    var removeConfig = {
        method: 'DELETE',
        url: `${serverPath}/favorite/${item}`,
        headers: {
          'x-access-token': token
        }
      };
    axios(removeConfig)
      .then(function (response) {
        return callback()
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  export default removeFavorite