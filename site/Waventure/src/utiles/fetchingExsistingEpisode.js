const fetchingExsistingEpisode = async (item, callback) => {
    const server = process.env.REACT_APP_SERVER_PATH;
    const fetching = await fetch(`${server}/sagaInfo/${item.serie_id}`);
    const response = await fetching.json();
  return callback(item,response);
  };
  export default fetchingExsistingEpisode;
  