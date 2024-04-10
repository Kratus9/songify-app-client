import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import NewPlaylistButton from "./NewPlaylistButton";
import Playlist from "./Playlist";
import AddPlaylistModal from "./AddPlaylistModal";

function NavbarComp() {
  return (
    <Navbar className="navbar">
      <section className="navbar-section">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/explore">Explore</NavLink>
        <NavLink to="/liked">Liked</NavLink>
      </section>
      <section className="navbar-section">
        <NavLink to="/playlists">Playlists</NavLink>
        <NewPlaylistButton />
        {/* <AddPlaylistModal /> */}
        {/* <Playlist /> */}
      </section>
    </Navbar>
  );
}

export default NavbarComp;
