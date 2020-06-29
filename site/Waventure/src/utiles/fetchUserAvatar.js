import axios from 'axios'
const fetchUserAvatar = async (setUserAvatar) => {
    const serveurPath = process.env.REACT_APP_SERVER_PATH;
    const token = localStorage.getItem('token');
    var config = {
      method: 'get',
      url: `${serveurPath}/avatarByUser`,
      headers: {
        'x-access-token': token
      }
    };
    axios(config)
      .then(function (response) {
        setUserAvatar(response.data[0].avatar_path)
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  export default fetchUserAvatar
