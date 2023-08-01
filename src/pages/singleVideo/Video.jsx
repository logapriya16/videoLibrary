import React, { useContext, useState } from "react";
import { useAsyncError, useNavigate, useParams } from "react-router-dom";
import { MainContext } from "../../context/MainContext";
import { BsStopwatch } from "react-icons/bs";
import { MdPlaylistAdd } from "react-icons/md";
import { MdEditNote } from "react-icons/md";
import Sidebar from "../../components/sidebar";
export default function Video() {
  const { videoID } = useParams();
  const [curr_video, setCurr_video] = useState(videoID);
  const navigate = useNavigate();
  const [shownote, setShownote] = useState(false);
  const [showplatlist, setShowPlaylist] = useState(false);
  //console.log("id", videoID);
  const {
    videoState,
    HandleWatchLater,
    AddnewNotes,
    AddnewPlaylist,
    addNewVideo,
    all_videos
  } = useContext(MainContext);
  return (
    <div className="container" style={{justifyContent:"space-between"}}>
      <div>
        <Sidebar />
      </div>
      <div>
        <ul type="none">
          {all_videos
            .filter((v) => v._id == videoID)
            .map((item) => {
              return (
                <li className="each-video" style={{width:"100%"}}>
                  <img src={item.thumbnail} alt="" />
                  {/* <video src={item.src} controls autoPlay width="300"></video> */}

                  <div className="video-bottom">
                    <div>
                      <img
                        src="https://picsum.photos/40/40"
                        alt=""
                        width="100%"
                        className="video-profile"
                      />
                    </div>
                    <div className="video-details">
                      <span>{item.title}</span>
                      <ul type="none" style={{ display: "flex" }}>
                        <li>
                          <BsStopwatch
                            style={{ color: "black" }}
                            onClick={() => {
                              HandleWatchLater(item);
                            }}
                          />
                        </li>
                        <li>
                          <MdPlaylistAdd
                            onClick={() => {
                              setShowPlaylist(true);
                            }}
                          />
                        </li>
                        <li>
                          <MdEditNote onClick={() => setShownote(true)} />
                        </li>
                      </ul>
                      <form
                        action=""
                        onSubmit={(e) => {
                          AddnewNotes(e, item);
                          setShownote(false);
                        }}
                        style={{ display: shownote ? "block" : "none" }}
                      >
                        <label htmlFor="">
                          <input
                            type="text"
                            name=""
                            id="notes"
                            placeholder="add new notes"
                          />
                        </label>
                        <button type="reset" style={{display:"none"}} id="reset"></button>
                        <button type="submit">Add</button>
                      </form>
                      <form
                        style={{ display: showplatlist ? "block" : "none" }}
                        action=""
                        onSubmit={(e) => {
                          setShowPlaylist(false);
                          AddnewPlaylist(e, item);
                        }}
                      >
                        <label htmlFor="">
                          Name :
                          <input
                            type="text"
                            placeholder="name of play list"
                            id="name"
                          />
                        </label>
                        <br />
                        <label htmlFor="">
                          Description:
                          <input
                            type="text"
                            id="des"
                            placeholder="description"
                          />
                        </label>
                        <br />
                        <button type="submit">Create New Playlist</button>
                        <hr />
                        <ul type="none">
                          {videoState.playlist.map((video) => (
                            <li onClick={() => addNewVideo(video, item)}>
                              {video.name}
                            </li>
                          ))}
                        </ul>
                      </form>
                    </div>
                  </div>
                  <div>
                    <hr />
                    <h2>My Notes</h2>
                    <ul type="none">
                    {item.notes?.map((note)=><li>{note}</li>)}
                    </ul>
                  </div>
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
