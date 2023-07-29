import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MainContext } from "../../context/MainContext";
import { BsStopwatch } from "react-icons/bs";
import Sidebar from "../../components/sidebar";
export default function Video() {
  const { videoID } = useParams();
  const navigate = useNavigate()
  console.log("id", videoID);
  const { videoState,HandleWatchLater } = useContext(MainContext);
  return (
    <div className="container">
      <div>
        <Sidebar/>
      </div>
      <div>
        <ul type="none">
          {videoState.videos
            .filter((v) => v._id == videoID)
            .map((item) => {
              return (
                <li>
                  <video src={item.src} controls autoPlay width="300"></video>
                  <p>{item.title}</p>
                </li>
              );
            })}
        </ul>
      </div>
      <div>
        more videos
        <ul type="none">
          {videoState.videos
            .filter((v) => v._id != videoID)
            .map((item) => {
              return (
                <li>
                  <div className="watch-later">
                <BsStopwatch className="watch-later-btn" onClick={()=>{HandleWatchLater(item)}} />
                  {/* <img
                    src={item.thumbnail}
                    alt=""
                    onClick={() => navigate(`/video/${item._id}`)}
                  /> */}
                 <video src={item.src} controls autoPlay width="300"></video>
                 
                </div>
                  <p>{item.title}</p>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
