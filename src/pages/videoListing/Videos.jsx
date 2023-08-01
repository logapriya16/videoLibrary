import React, { useContext } from "react";
import { MainContext } from "../../context/MainContext";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import { BsStopwatch } from "react-icons/bs";

export default function Videos() {
          
            const { videoState, HandleWatchLater , all_videos } = useContext(MainContext);
  const { category } = useParams();
  const navigate = useNavigate();
  return (
    <div className="container">
      <div>
        <Sidebar />
      </div>
      <div>
        <h2>{category}</h2>
        <ul type="none" className="video-elements">
          {all_videos
            .filter((video) => video.category === category)
            .map((item) => (
              <li className="each-video">
                <div className="watch-later">
                  <BsStopwatch
                    className="watch-later-btn"
                    onClick={() => {
                      HandleWatchLater(item);
                      console.log(item);
                    }}
                  />
                  <img
                    src={item.thumbnail}
                    alt=""
                    onClick={() => navigate(`/video/${item._id}`)}
                  />
                </div>
                <div className="video-bottom">
                  <div>
                    <img
                      src="https://picsum.photos/40/40"
                      alt=""
                      className="video-profile"
                    />
                  </div>
                  <div className="video-details">
                    <p>
                      {item.title}
                      <br />
                      {category}
                      <br />
                      {item.views}|{item.creator}
                    </p>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
