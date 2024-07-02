import { updateAvatar } from "./api";
import { closeModal, openModal } from "./modal";

// VAR modalEdit.js
const modalAvatar = document.querySelector(".popup_type_edit_avatar");
const inputAvatar = modalAvatar.querySelector(".popup__input_type_avatar");
const profileImage = document.querySelector(".profile__image");
const formElementAvatar = document.querySelector(
  '.popup__form[name="avatar-profile"]'
);

function openModalAvatar(event) {
  openModal(modalAvatar);
}

// Закрытия модального окна аватара
function closeModalAvatar() {
  closeModal(modalAvatar);
}
function saveFormAvatar(evt) {
  const newProfileImage = inputAvatar.value;
  const avatarButton = formElementAvatar.querySelector("button");
  avatarButton.textContent = "Сохранение...";
  updateAvatar(newProfileImage).then((profileAvatar) => {
    profileImage.src = profileAvatar.avatar;
    avatarButton.textContent = "Сохранить";
  });
  closeModalAvatar();
}

export {
  modalAvatar,
  closeModalAvatar,
  openModalAvatar,
  saveFormAvatar,
  formElementAvatar,
};
