import "./editProfile.css";

import React, { useContext } from "react";

import CloseIcon from "@mui/icons-material/Close";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { AuthContext } from "../../context/AuthContext";

const EditProfile = ({ setEditProfileModal }) => {
  const { user: currUser } = useContext(AuthContext);

  return (
    <div className="edit-profile-modal-container">
      <form>
        <div className="edit-profile-modal-header">
          <CloseIcon
            className="edit-profile-modal-close"
            onClick={() => setEditProfileModal(false)}
          />
          <text className="edit-profile-modal-text">Edit profile</text>
          <span className="edit-profile-modal-save">Save</span>
        </div>
        <div className="edit-profile-modal-avatar-container">
          <div className="edit-profile-modal-avatar-wrapper">
            <img
              className="edit-profile-modal-avatar"
              src={
                currUser?.profilePicture ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
              alt=""
            ></img>
            <AddAPhotoIcon className="edit-profile-modal-avatar-add" />
          </div>
        </div>

        <div className="edit-profile-modal-bio-container">
            Edit bio
            <textarea className="edit-profile-modal-bio-input"></textarea>
            </div>
      </form>
    </div>
  );
};

export default EditProfile;
