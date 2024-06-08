import {
  imageProfile,
  modalAvatar,
  nameInputAvatar,
  avatarForm,
} from "../pages/index.js";
import { editAvatarHttp } from "../components/api.js";
import { closeModal } from "../components/modal.js";

function avatarFormSubmit(evt) {
  evt.preventDefault();
  const newAvatarData = {
    avatar: nameInputAvatar.value,
  };
  editAvatarHttp(newAvatarData, avatarForm.querySelector("button")).then(
    setTimeout(() => {
      imageProfile.src = nameInputAvatar.value;
      closeModal(modalAvatar);
    }, 1000)
  );
}

export { avatarFormSubmit };
