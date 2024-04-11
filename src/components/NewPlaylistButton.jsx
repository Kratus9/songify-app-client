import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import service from "../../services/api";
import "../Styles/NewPlaylistButton.css";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

function NewPlaylistButton() {
  const { activeUserId } = useContext(AuthContext);
  const navigate = useNavigate();

  const [openPlaylistModal, setOpenPlaylistModal] = useState(false);
  const [data, setdata] = useState({
    playlistName: "",
    playlistDescription: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleOpenPlaylistModal = () => {
    setOpenPlaylistModal(!openPlaylistModal);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleAddPlaylist = async () => {
    try {
      const userId = activeUserId
      await service.post("/music/addPlaylist", data, userId);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log(error.response.data);
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  useEffect(() => {
    console.log(openPlaylistModal);
  }, [openPlaylistModal]);
  return (
    <div className="button">
      <button
        className="create-playlist-button"
        onClick={handleOpenPlaylistModal}
      >
        +
      </button>
      {openPlaylistModal && (
        <dialog open>
          <h1>Create Playlist</h1>
          <div>
            <img src="#" alt="playlist-pic" />
            <div>
              <Form>
                <label htmlFor="playlistName">Name</label>
                <Form.Control
                  type="text"
                  id="playlistName"
                  value={data.playlistName}
                  name="playlistName"
                  onChange={handleInputChange}
                />
                <label htmlFor="playlistDescription">Description</label>
                <Form.Control
                  type="text"
                  id="playlistDescription"
                  value={data.playlistDescription}
                  name="playlistDescription"
                  onChange={handleInputChange}
                />
                <Button type="button" onClick={() => handleAddPlaylist()}>
                  Create
                </Button>
              </Form>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}

export default NewPlaylistButton;
