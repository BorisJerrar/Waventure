import axios from 'axios'
const fetchinEpisodePlayer = async (index, serieId, setSagaInfo, setEpisodeInfos, callback) => {
  const serverPath = process.env.REACT_APP_SERVER_PATH;
      var playingConfig = {
        method: "get",
        url: `${serverPath}/sagaInfo/${serieId}`,
      };

      axios(playingConfig)
        .then(function (response) {
          setSagaInfo(response.data);
          setEpisodeInfos(response.data[index]);
          if (
            serverPath &&
            response &&
            response.data &&
            response.data[index] &&
            response.data[index].title &&
            response.data[index].mp3_file
          ) {
            callback(
              `${response.data[index].title.split(" ").join("")}&sound=${
                response.data[index].mp3_file
              }`
            );
          }
        })
        .catch(function (error) {
          Promise.reject(error);
        });
    };
    export default fetchinEpisodePlayer