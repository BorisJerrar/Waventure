const prevSaga = (index, setIndex) => {
    if (index > 0) {
      return setIndex(index - 1);
    } else {
      return index;
    }
  };
  export default prevSaga