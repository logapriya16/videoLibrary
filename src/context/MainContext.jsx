import React, { createContext, useEffect, useReducer } from "react";
import { videoreducer } from "../reducers/videoreducer";
import { categories, videos } from "../data";

export const MainContext = createContext();
export default function MainContextProvider({ children }) {
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

  localStorage.setItem("playlist", JSON.stringify(videoState.playlist));
  localStorage.setItem("videos", JSON.stringify(videoState.videos));
  const all_playlist = JSON.parse(localStorage.getItem("playlist"));
  const watchlist = JSON.parse(localStorage.getItem("watch_later"));
  const all_videos = JSON.parse(localStorage.getItem("videos"));
  console.log(all_playlist);
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
      console.log(temp);
      localStorage.setItem("watch_later", JSON.stringify(temp));
    }
    if (!videoState.WatchLater.includes(video)) {
      const temp = [...videoState.WatchLater, video];
      videoDispatch({ type: "set_watch_later", payload: temp });
      console.log(temp);
      localStorage.setItem("watch_later", JSON.stringify(temp));
    }
  };
  const AddnewPlaylist = (PlayList, video) => {
    PlayList.preventDefault();
    let newPL = [];
    video === undefined
      ? (newPL = {
          name: PlayList.target.elements.name.value,
          description: PlayList.target.des.value,
          thumbnail: "https://picsum.photos/300/174",
          videos: [],
        })
      : (newPL = {
          name: PlayList.target.elements.name.value,
          description: PlayList.target.des.value,
          thumbnail: "https://picsum.photos/300/174",
          videos: [video],
        });

    const temp = [...videoState.playlist, newPL];
    console.log(temp);
    videoDispatch({ type: "set_playlist", payload: temp });
    localStorage.setItem("playlist", JSON.stringify(temp));
  };
  const DeletePlaylist = (name) => {
    const temp = videoState.playlist.filter((item) => item.name !== name);
    videoDispatch({ type: "set_playlist", payload: temp });

    localStorage.setItem("playlist", JSON.stringify(temp));
  };
  const removeVideoFormPlaylist = (title, pl) => {
    //console.log(pl, title);
    let temp = videoState.playlist;
    const newvideos = pl.videos.filter((video) => video.title !== title);
    const newPlaylist = { ...pl, videos: newvideos };
    temp = temp.map((list) => {
      if (list.name === pl.name) {
        return { ...newPlaylist };
      } else {
        return list;
      }
    });
    console.log(temp);
    videoDispatch({ type: "set_playlist", payload: temp });

    localStorage.setItem("playlist", JSON.stringify(temp));
  };
  const addNewVideo = (playlist, newvideo) => {
    console.log(playlist, newvideo);
    const UpdatedPlaylist = playlist.videos.push(newvideo);
    const temp = videoState.playlist.map((pl) => {
      if (pl.name === playlist.name) {
        return { ...playlist };
      } else {
        return pl;
      }
    });
    //console.log(temp)
    videoDispatch({ type: "set_playlist", payload: temp });

    localStorage.setItem("playlist", JSON.stringify(temp));
  };
  const AddnewNotes = (e, curr_video) => {
    e.preventDefault();
    //console.log(curr_video);
    let updatedVideo = {};
    curr_video.notes?.length > 0
      ? (updatedVideo = {
          ...curr_video,
          notes: curr_video.notes.concat(e.target.elements.notes.value),
        })
      : (updatedVideo = {
          ...curr_video,
          notes: [e.target.elements.notes.value],
        });
    console.log(updatedVideo);
    const temp = videoState.videos.map((video) => {
      if (video._id === curr_video._id) {
        return updatedVideo;
      } else {
        return video;
      }
    });
    videoDispatch({ type: "set_videos", payload: temp });
    e.target.elements.reset.click();
    localStorage.setItem("videos", temp);
  };
  return (
    <MainContext.Provider
      value={{
        videoState,
        HandleWatchLater,
        AddnewPlaylist,
        DeletePlaylist,
        removeVideoFormPlaylist,
        AddnewNotes,
        addNewVideo,
        watchlist,
        all_playlist,
        all_videos
      }}
    >
      {children}
    </MainContext.Provider>
  );
}
