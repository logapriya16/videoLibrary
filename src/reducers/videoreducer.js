export const videoreducer = (state, action) => {
  switch (action.type) {
    case "set_videos":
      return { ...state, videos: action.payload };
    case "set_loading":
      return { ...state, loading: action.payload };
    case "set_categories":
      return { ...state, categories: action.payload };
    case "set_watch_later":
      return { ...state,WatchLater: action.payload };
      case "set_playlist":
      return { ...state,playlist: action.payload };
    default:
      return { ...state };
  }
};
