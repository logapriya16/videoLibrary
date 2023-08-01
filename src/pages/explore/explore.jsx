import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../components/sidebar";
import { MainContext } from "../../context/MainContext";
import "./explore.css";
export default function Explore() {
  const { videoState } = useContext(MainContext);
  const [filterItems, setFilterItems] = useState(videoState.videos);
  const [searchText, setSearchText] = useState("");
  const HandleSearch = () => {
    const temp =
      searchText.length > 0
        ? filterItems.filter((item) =>
            item.title.toLowerCase().includes(searchText.toLowerCase())
          )
        : videoState.videos;
    setFilterItems(temp);
  };
  useEffect(()=>{HandleSearch()},[searchText])
  return (
    <div className="container">
      <div>
        <Sidebar />
      </div>
      <div className="explore-body">
        <h1>Explore</h1>
        <input
          type="search"
          placeholder="Search video by title"
          className="search"
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <ul type="none" className="video-elements">
          {filterItems.map((item) => (
            <li className="each-video">
              <img src={item.thumbnail} alt="" className="video-thumnail" />
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
