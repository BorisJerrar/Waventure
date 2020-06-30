import axios from "axios";
const fetchFavorite = async (serverPath, item, token, setFavorite) => {
  var config = {
    method: "get",
    url: `${serverPath}/favorite/${item}`,
    headers: {
      "x-access-token": token,
    },
  };
  axios(config)
    .then(function (response) {
      setFavorite(response.data[0].exists)
    })
    .catch(function (error) {
      console.log(error);
    });
};
export default fetchFavorite;
