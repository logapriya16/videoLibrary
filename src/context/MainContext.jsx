import React, { createContext, useEffect, useReducer } from "react";
import { videoreducer } from "../reducers/videoreducer";
import { categories, videos } from "../data";
import { useParams } from "react-router-dom";
export const MainContext = createContext();
export default function MainContextProvider({ children }) {
  const { name } = useParams();
  const videoInitial = {
    loading: false,
    videos: [],
    categories: [],
    WatchLater: [],
    playlist: [
      {
        name: "my videos",
        thumbnail: "https://picsum.photos/300/174",
        description: "My favourite videos",
        videos: [
          {
            _id: 19,
            title: "Origami Swan - Simple and Elegant",
            views: 2879,
            chips: ["origami", "swan", "paper", "elegant"],
            thumbnail: "https://picsum.photos/300/174",
            src: "https://www.youtube.com/embed/GBIIQ0kP15E",
            category: "Origami",
            creator: "PaperCraftPro",
          },
          {
            _id: 20,
            title: "Kirigami Flower Bouquet - Beautiful Handmade Gift",
            views: 1756,
            chips: ["kirigami", "flower bouquet", "paper", "gift"],
            thumbnail: "https://picsum.photos/300/175",
            src: "https://www.youtube.com/embed/GBIIQ0kP15E",
            category: "Kirigami",
            creator: "Crafty Delights",
          },
          {
            _id: 21,
            title: "Sculpting Animals from Polymer Clay - Step by Step Guide",
            views: 2251,
            chips: ["sculpture", "polymer clay", "animals", "crafts"],
            thumbnail: "https://picsum.photos/300/176",
            src: "https://www.youtube.com/embed/GBIIQ0kP15E",
            category: "Clay Modeling",
            creator: "CraftyCritters",
          },
          {
            _id: 22,
            title: "Stop Motion Short Film - Adventure in Toyland",
            views: 3172,
            chips: ["stop motion", "short film", "toyland", "adventure"],
            thumbnail: "https://picsum.photos/300/177",
            src: "https://www.youtube.com/embed/GBIIQ0kP15E",
            category: "Stop Motion",
            creator: "ToyStoryMakers",
          },
        ],
      },
    ],
  };
  const [videoState, videoDispatch] = useReducer(videoreducer, videoInitial);
  const fetchVideos = () => {
    videoDispatch({ type: "set_videos", payload: videos });
  };
  const fetchCategories = () => {
    videoDispatch({ type: "set_categories", payload: categories });
  };
  useEffect(() => {
    fetchVideos();
    fetchCategories();
  }, []);
  const HandleWatchLater = (video) => {
    if (videoState.WatchLater.includes(video)) {
      const temp = videoState.WatchLater.filter((item) => item !== video);
      videoDispatch({ type: "set_watch_later", payload: temp });
    }
    if (!videoState.WatchLater.includes(video)) {
      const temp = [...videoState.WatchLater, video];
      videoDispatch({ type: "set_watch_later", payload: temp });
    }
  };
  const AddnewPlaylist = (PlayList) => {
    PlayList.preventDefault();
    const newPL = {
      name: PlayList.target.elements.name.value,
      description: PlayList.target.des.value,
      thumbnail: "https://picsum.photos/300/174",
      videos: [],
    };
    const temp = [...videoState.playlist, newPL];
    videoDispatch({ type: "set_playlist", payload: temp });
  };
  const DeletePlaylist = (name) => {
    const temp = videoState.playlist.filter((item) => item.name !== name);
    videoDispatch({ type: "set_playlist", payload: temp });
  };
  const removeVideoFormPlaylist = (title, pl) => {
    console.log(pl);
    const tempPL = videoState.playlist
      .filter((item) => item.name == pl)
    console.log(tempPL);
    //videoDispatch({ type: "set_playlist", payload: temp });
  };

  return (
    <MainContext.Provider
      value={{
        videoState,
        HandleWatchLater,
        AddnewPlaylist,
        DeletePlaylist,
        removeVideoFormPlaylist,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}
