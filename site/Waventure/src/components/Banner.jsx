import React, { useState, useEffect } from 'react'
import "../style/Banner.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'


export default function Banner({ lunchingEpisode }) {
    const token = localStorage.getItem("token");
    const [wedette, setWedette] = useState([]);
    const [synopsis, setSynopsis] = useState([]);

    const server = process.env.REACT_APP_SERVER_PATH
    const url = process.env.REACT_APP_DYNAMIC_IMG_PATH
    const fetchWedette = async () => {
        const response = await fetch(`http://localhost:4000/serie/1`)
        const data = await response.json()
        setWedette(data[0])
    }
    const fetchSynopsis = async () => {
        const response = await fetch(`http://localhost:4000/synopsis?serie_id=1`)
        const data = await response.json()
        setSynopsis(data[0])
    }

    useEffect(() => {
        fetchWedette()
        fetchSynopsis()
    }, [])
    const lunchingEpisodeCategorie = (item) => {
        const didHeAlreadyBegin = () => {
          var config = {
            method: "get",
            url: `${server}/listenVerificator?serie_id=${item.serie_id}`,
            headers: {
              "x-access-token": token,
            },
          };
          axios(config)
            .then(function (response) {
              if (response.data.length === 0) {
                fetchingEpisode();
              } else {
                fetchingExsistingEpisode(...response.data);
                
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        };
        const fetchingEpisode = async () => {
          const fetching = await fetch(`${server}/sagaInfo/${item.serie_id}`);
          const response = await fetching.json();
          const dataInfo = await response;
          AddingNew(dataInfo);
        };
        const fetchingExsistingEpisode = async (info) => {
          const fetching = await fetch(`${server}/sagaInfo/${item.serie_id}`);
          const response = await fetching.json();
    
          resume(info, response);
        };
        const AddingNew = (sagas) => {
          var creatingNew = {
            method: "post",
            url: `http://localhost:4000/listen?serie_id=${sagas[0].serie_id}&episode_id=${sagas[0].episode_id}`,
            headers: {
              "x-access-token": token,
            },
          };
          axios(creatingNew)
            .then(function (response) {
              lunchingEpisode(item.serie_id, 0);
            })
            .catch(function (error) {
              console.log(error);
            });
        };
        const resume = (userInfo, dataInfo) => {
          lunchingEpisode(
            item.serie_id,
            dataInfo.findIndex((item) => item.episode_id === userInfo.episode_id)
          );
        };
    
        didHeAlreadyBegin();
      };
    

    return (
        <div className={"wedetteContainer"}>
            <div className="wedetteCover" onClick={() => lunchingEpisodeCategorie(wedette)}>
                <img className="wedetteCoverImage" src={`${url}/${wedette && wedette.image_lg ? wedette.image_lg : ''}`} alt="" />
                <FontAwesomeIcon
                    className="btnPlay"
                    icon={['fa', 'play-circle']}
                    size="4x"
                />
            </div>
            <div className="wedetteLogoContainer">
                <span><img src="./img/logoWedette.svg" alt="W" /></span>
                <h2 className="wedetteIndicator">edette</h2>
            </div>

            <div className="wedetteDescription">

                <h3 className="wedetteTitle">{wedette.title}</h3>
                <p className="wedetteSynopsis">
                    {synopsis.body}
                </p>
            </div>
            <img className="backgroundImg" src={`${url}/${wedette && wedette.image_bg ? wedette.image_bg : ''}`} alt={`Bg_image ${wedette && wedette.title ? wedette.title : ''}`} />
        </div>
    )
}

