import { Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./pages/home/Home";
import Explore from "./pages/explore/explore";
import PlayList from "./pages/playlist/PlayList";
import Video from "./pages/singleVideo/Video";
import Videos from "./pages/videoListing/Videos";
import WatchLater from "./pages/watchlater/WatchLater";
import EachPlayList from "./pages/Eachplaylist/EachPlayList";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/playlist" element={<PlayList />} />
        <Route path="/playlist/:name" element={<EachPlayList/>}/>
        <Route path="/video/:videoID" element={<Video />} />
        <Route path="/category/:category" element={<Videos />} />
        <Route path="/watchlater" element={<WatchLater />} />
      </Routes>
    </div>
  );
}

export default App;
