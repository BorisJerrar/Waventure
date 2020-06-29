const playerRefChecker = (playerRef, reducer) => {
  if (
    playerRef &&
    playerRef.current &&
    playerRef.current.container &&
    reducer
  ) {
    playerRef.current.container.current.childNodes[2].childNodes[1].childNodes[2].childNodes[0].childNodes[0].style =
      "display: none";
    for (
      let i = 1;
      i <
      playerRef.current.container.current.childNodes[2].childNodes[1]
        .childNodes[2].childNodes[0].childNodes.length;
      i++
    ) {
      playerRef.current.container.current.childNodes[2].childNodes[1].childNodes[2].childNodes[0].childNodes[
        i
      ].style = "height: 10px";
    }

    playerRef.current.container.current.childNodes[2].childNodes[1].childNodes[2].childNodes[0].style =
      "position: absolute; right: 15vw; bottom: 5px";
    playerRef.current.container.current.childNodes[2].childNodes[1].style =
      "position: absolute; right: 10px; bottom: -55px; width: 50%";
    for (
      let i = 0;
      i <
      playerRef.current.container.current.childNodes[2].childNodes[1]
        .childNodes[1].childNodes.length;
      i++
    ) {
      playerRef.current.container.current.childNodes[2].childNodes[1].childNodes[1].childNodes[
        i
      ].childNodes[0].style = "width: 12px; height: 12px";
    }
  } else if (
    playerRef &&
    playerRef.current &&
    playerRef.current.progressBar &&
    !reducer
  ) {
    playerRef.current.container.current.childNodes[2].childNodes[1].childNodes[2].childNodes[0].childNodes[0].style =
      "";
    for (
      let i = 1;
      i <
      playerRef.current.container.current.childNodes[2].childNodes[1]
        .childNodes[2].childNodes[0].childNodes.length;
      i++
    ) {
      playerRef.current.container.current.childNodes[2].childNodes[1].childNodes[2].childNodes[0].childNodes[
        i
      ].style = "";
    }

    playerRef.current.container.current.childNodes[2].childNodes[1].childNodes[2].childNodes[0].style =
      "";
    playerRef.current.container.current.childNodes[2].childNodes[1].style = "";
    for (
      let i = 0;
      i <
      playerRef.current.container.current.childNodes[2].childNodes[1]
        .childNodes[1].childNodes.length;
      i++
    ) {
      playerRef.current.container.current.childNodes[2].childNodes[1].childNodes[1].childNodes[
        i
      ].childNodes[0].style = "";
    }
  }
};

export default playerRefChecker