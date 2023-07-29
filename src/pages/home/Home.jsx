import React, { useContext } from "react";
import { MainContext } from "../../context/MainContext";
import { useNavigate } from "react-router-dom";
import "./home.css"
import Sidebar from "../../components/sidebar";
export default function Home() {
  const { videoState } = useContext(MainContext);
  const navigate = useNavigate()
  return (
    <div className="container">
      <div>
        <Sidebar/>
      </div>
      <div>
        <h2>Categories</h2>
        <ul type="none" className="home-categories">
          {videoState.categories.map((item) => (
            <li className="home-elements">
              <img src={item.thumbnail} alt="" 
              onClick={()=>navigate(`/category/${item.category}`)}
              />
              <p>{item.category}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
