import { useEffect, useState } from "react";
import "../Styles/NewPlaylistButton.css";

function NewPlaylistButton() {
  const [openPlaylistModal, setOpenPlaylistModal] = useState(false);
  const handleOpenPlaylistModal = () => {
    setOpenPlaylistModal(!openPlaylistModal);
  };
  useEffect(() => {
    console.log(openPlaylistModal);
  }, [openPlaylistModal]);
  return (
    <div>
      <button onClick={handleOpenPlaylistModal}>+</button>
      {openPlaylistModal && (
        <dialog open>
          <p>Ventana</p>
        </dialog>
      )}
    </div>
  );
}

export default NewPlaylistButton;
