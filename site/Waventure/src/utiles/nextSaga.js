import axios from 'axios'
const nextSaga = async (index, setIndex, serieId, sagaInfo) => {
    const token = localStorage.getItem("token");
    const server = process.env.REACT_APP_SERVER_PATH;
    if (index < sagaInfo.length - 1) {
      setIndex(index + 1)
      var config = {
        method: "put",
        url: `${server}/listen?serie_id=${serieId}&duration=00:00:00&episode_id=${sagaInfo[index + 1].episode_id}`,
        headers: {
          "x-access-token": token,
        },
      };
      axios(config)
        .then(function (response) {})
        .catch(function (error) {
          console.log(error);
        });
    }
    else {
      return index;
    }
  };
  export default nextSaga