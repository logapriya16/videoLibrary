import React, { useContext, useState } from "react";
import Sidebar from "../../components/sidebar";
import { MainContext } from "../../context/MainContext";
import { CiCircleRemove } from "react-icons/ci";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function PlayList() {
  const { videoState, AddnewPlaylist,DeletePlaylist } = useContext(MainContext);
  const [shownew, setShownew] = useState(false);
  const navigate = useNavigate()
  console.log(videoState);
  return (
    <div className="container">
      <div>
        <Sidebar />
      </div>
      <div>
        <ul type="none">
          {videoState.playlist.map((item) => (
            <li>
              <CiCircleRemove onClick={()=>DeletePlaylist(item.name)} />
              <img src={item.thumbnail} alt="" onClick={()=>navigate(`/playlist/${item.name}`)}  />
              <h4>{item.name}</h4>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
        <AiOutlinePlusCircle
          onClick={() => {
            setShownew(true);
          }}
        />
        <div style={{ display: shownew ? "block" : "none" }}>
          <form
            action=""
            onSubmit={(e) => {
              setShownew(false);
              AddnewPlaylist(e);
            }}
          >
            <label htmlFor="">
              Name :
              <input type="text" placeholder="name of play list" id="name" />
            </label>
            <br />
            <label htmlFor="">
              Description:
              <input type="text" id="des" placeholder="description" />
            </label>
            <br />
            <button type="submit">Add</button>
          </form>
        </div>
      </div>
    </div>
  );
}
