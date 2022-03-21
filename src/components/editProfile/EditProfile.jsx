import "./editProfile.css";

import React, { useContext, useEffect, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { CancelOutlined } from "@mui/icons-material";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const EditProfile = ({ setEditProfileModal }) => {
  const { user: currUser, dispatch } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [file, setFile] = useState(null);

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const newProfile = {
        desc: document.getElementsByClassName("edit-profile-modal-bio-input")[0]
          .value,
        profilePicture:
          currUser?.profilePicture ||
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      };

      if (file) {
        const data = new FormData();
        const fileName = Date.now() + file.name;
        data.append("name", fileName);
        data.append("file", file);
        newProfile.profilePicture = fileName;

        try {
          await axios.post("/upload", data);
        } catch (err) {
          console.log(err);
        }
      }

      await axios.put("/users/" + currUser?._id, {
        desc: newProfile?.desc,
        profilePicture: newProfile?.profilePicture,
        userId: currUser?._id,
      });
      dispatch({ type: "UPDATEPROFILE", payload: newProfile });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="edit-profile-modal-container">
      <form>
        <div className="edit-profile-modal-header">
          <div className="edit-profile-modal-close-container">
            <CloseIcon
              className="edit-profile-modal-close"
              onClick={() => setEditProfileModal(false)}
            />
            <text className="edit-profile-modal-text">Edit profile</text>
          </div>

          <span className="edit-profile-modal-save" onClick={handleSave}>
            Save
          </span>
        </div>
        <div className="edit-profile-modal-avatar-container">
          <div className="edit-profile-modal-avatar-wrapper">
            <img
              className="edit-profile-modal-avatar"
              src={
                file
                  ? URL.createObjectURL(file)
                  : PF + currUser?.profilePicture ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
              alt=""
            ></img>
            <label htmlFor="file" className="edit-profile-modal-avatar-label">
              <AddAPhotoIcon className="edit-profile-modal-avatar-add" />
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".peg,.jpeg,.jpg,.png"
                onChange={(e) => setFile(e.target.files[0])}
              ></input>
            </label>
          </div>
        </div>

        <div className="edit-profile-modal-bio-container">
          Edit bio
          <textarea className="edit-profile-modal-bio-input">
            {currUser?.desc}
          </textarea>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
