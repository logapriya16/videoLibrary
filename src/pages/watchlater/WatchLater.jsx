import React, { useContext } from "react";
import Sidebar from "../../components/sidebar";
import { MainContext } from "../../context/MainContext";
import { useNavigate } from "react-router-dom";
import { BsStopwatch } from "react-icons/bs";
export default function WatchLater() {
  const { videoState,HandleWatchLater,watchlist } = useContext(MainContext);
  const navigate=useNavigate()
  return (
    <div className="container">
      <div>
        <Sidebar />
      </div>
      <div>
        <ul type='none' className="video-elements">
          {watchlist.map((item) => (
            <li className="each-video">
              <div className="watch-later">
                <BsStopwatch className="watch-later-btn" onClick={()=>{HandleWatchLater(item)}} />
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
                    {item.category}
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
