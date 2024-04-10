import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ErrorPage from "./pages/ErrorPage";
import NotFoundPage from "./pages/NotFoundPage";
import PlaylistsPage from "./pages/PlaylistsPage";
import ProfilePage from "./pages/ProfilePage";
import ExplorePage from "./pages/ExplorePage";
import LikedPage from "./pages/LikedPage";
// import SearchBar from "./components/SearchBar";
import IsPrivate from "./components/isPrivate";
import Navbar from "./components/Navbar";
import "../src/Styles/index.css";

function App() {
  return (
    <>
      {/* <SearchBar /> */}
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/profile"
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
          }
        />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/liked" element={<LikedPage />} />
        <Route
          path="/playlists"
          element={
            <IsPrivate>
              <PlaylistsPage />
            </IsPrivate>
          }
        />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
