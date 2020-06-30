const fetchSeries = async (category, matches, callback) => {
    const server = process.env.REACT_APP_SERVER_PATH;

    const response = await fetch(`${server}/serieCategory/${category}`);
    const data = await response.json();
    let temp = [];
    if (matches > 762 && matches < 990) {
      for (let i = 0; i < Math.ceil(data.length / 4); i++) {
        temp.push(data.slice(i * 4, i * 4 + 4));
      }
    } else if (matches < 762) {
      for (let i = 0; i < Math.ceil(data.length / 2); i++) {
        temp.push(data.slice(i * 2, i * 2 + 2));
      }
    } else {
      for (let i = 0; i < Math.ceil(data.length / 5); i++) {
        temp.push(data.slice(i * 5, i * 5 + 5));
      }
    }
    callback(temp)
  }
  export default fetchSeries