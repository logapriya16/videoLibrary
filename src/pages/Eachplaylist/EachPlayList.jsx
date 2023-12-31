import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import { MainContext } from "../../context/MainContext";
import { CiCircleRemove } from "react-icons/ci";
export default function EachPlayList() {
  const { name } = useParams();
  const { videoState, removeVideoFormPlaylist ,all_playlist} = useContext(MainContext);
  return (
    <div className="container">
      <div>
        <Sidebar />
      </div>
      <div>
        <ul type="none">
          {all_playlist
            ?.filter((video) => video.name === name)
            .map((item) => (
              <li >
                <h3>{item.name}</h3>
                <ul type="none" className="video-elements">
                  {item.videos?.map((items) => (
                    <li className="each-video">
                      <CiCircleRemove
                        onClick={() =>
                          removeVideoFormPlaylist(items.title, item)
                        }
                      />
                      <img src={items?.thumbnail} alt="" />
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
                            {items?.title}
                            <br />
                            {items?.category}
                            <br />
                            {items?.views}|{items?.creator}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
