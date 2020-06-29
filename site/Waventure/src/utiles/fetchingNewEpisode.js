const fetchingNewEpisode = async (item, callback) => {
  const token = localStorage.getItem("token");
  const server = process.env.REACT_APP_SERVER_PATH;
  const fetching = await fetch(`${server}/sagaInfo/${item.serie_id}`);
  const response = await fetching.json();
  const dataInfo = await response;
  var creatingNew = {
    method: "post",
    url: `http://localhost:4000/listen?serie_id=${dataInfo[0].serie_id}&episode_id=${dataInfo[0].episode_id}`,
    headers: {
      "x-access-token": token,
    },
  };
return callback(creatingNew);
};
export default fetchingNewEpisode;
