const didHeAlreadyBegin = (item, callback) => {
    const token = localStorage.getItem("token");
    const server = process.env.REACT_APP_SERVER_PATH;
    var config = {
        method: "get",
        url: `${server}/listenVerificator?serie_id=${item.serie_id}`,
        headers: {
          "x-access-token": token,
        },
      };
      return callback(config)
}
export default didHeAlreadyBegin

