import axios from 'axios'
const nextSaga = (index, serieId, sagaInfo, setIndex) => {
    const token = localStorage.getItem("token");
    const server = process.env.REACT_APP_SERVER_PATH;
    if (index < sagaInfo.length - 1) {
      var config = {
        method: "put",
        url: `${server}/listen?serie_id=${serieId}&duration=00:00:00&episode_id=${sagaInfo && setIndex?sagaInfo[index+1].episode_id:sagaInfo[index]}`,
        headers: {
          "x-access-token": token,
        },
      };
      if(setIndex){
        setIndex(index+1)
      }
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