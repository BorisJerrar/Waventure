const fetchSeries = async (category, matches, callback) => {
    const server = process.env.REACT_APP_SERVER_PATH;

    const response = await fetch(`${server}/serieCategory/${category}`);
    const data = await response.json();
    let dataPatron = [...data]; 
    let transformer = []; 
    let temporary = []; 
    while (transformer.length < dataPatron.length) {
      temporary.push(data.splice(Math.floor(Math.random() * data.length -1), 1)[0]);
      transformer.push(temporary.pop());
    }
    let temp = []; 
    if (matches > 762 && matches < 990) {
      for (let i = 0; i < Math.ceil(dataPatron.length / 4); i++) {
        temp.push(transformer.slice(i * 4, i * 4 + 4));
      }
    } else if (matches < 762) {
      for (let i = 0; i < Math.ceil(dataPatron.length / 2); i++) {
        temp.push(transformer.slice(i * 2, i * 2 + 2));
      }
    } else {
      for (let i = 0; i < Math.ceil(dataPatron.length / 5); i++) {
        temp.push(transformer.slice(i * 5, i * 5 + 5));
      }
    }
    return callback(temp)
  }
  export default fetchSeries