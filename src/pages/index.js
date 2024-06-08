import "../pages/index.css";
import "../components/modalImage.js";
import "../components/modalAdd.js";
import "../components/modalEdit.js";
import "../components/card.js";

import { addModalEventListeners } from "../components/modal.js";
import { addFormSubmit } from "../components/modalAdd.js";
import { closeModalImage, openModalImage } from "../components/modalImage.js";
import { onOpenCallback } from "../components/modalEdit.js";
import { setEventListeners } from "../components/validity.js";
import { promiseMethod } from "../components/api.js";
import { avatarFormSubmit } from "../components/modalAvatar.js";
//                                    actions
// VAR card.js
const placesList = document.querySelector(".places__list");

// VAR modalAdd.js
const modalAdd = document.querySelector(".popup_type_new-card");
const openButtonAdd = document.querySelector(".profile__add-button");
const closeButtonAdd = modalAdd.querySelector(".popup__close");
const formElementAdd = document.querySelector('.popup__form[name="new-place"]');

// VAR modalEdit.js
const modalEdit = document.querySelector(".popup_type_edit");
const openButtonEdit = document.querySelector(".profile__edit-button");
const closeButtonEdit = modalEdit.querySelector(".popup__close");
const nameInputEdit = document.querySelector(".popup__input_type_name");
const jobInputEdit = document.querySelector(".popup__input_type_description");

// VAR modalAvatar.js
const modalAvatar = document.querySelector(".popup_type_edit_avatar");
const nameInputAvatar = document.querySelector(".popup__input_type_avatar");
const avatarElement = document.querySelector(".profile__avatar-edit");
const avatarForm = document.querySelector(
  '.popup__form[name="avatar-profile"]'
);
const avatarButtonSubmit = modalAvatar.querySelector(".popup__button");
const avatarCloseButton = modalAvatar.querySelector(".popup__close");

//VAR Modalimage.js
const modalImage = document.querySelector(".popup_type_image");
const popupImage = modalImage.querySelector(".popup__image");
const popupImageName = modalImage.querySelector(".popup__caption");
const closeButtonImage = modalImage.querySelector(".popup__close");

// Элементы, куда должны быть вставлены значения полей
const imageProfile = document.querySelector(".profile__image");
const nameProfile = document.querySelector(".profile__title");
const jobProfile = document.querySelector(".profile__description");
const nameInputAdd = document.querySelector(".popup__input_type_card-name");
const jobInputAdd = document.querySelector(".popup__input_type_url");

// Элементы формы
const formElement = document.querySelector(".popup__form");
const formInput = document.querySelector(".popup__input");
const formError = document.querySelector(`.${formInput.id}-error`);

// Кнопка
// Список форм
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};
promiseMethod();
enableValidation();

// Слушатели событий
addModalEventListeners(modalAdd, openButtonAdd, closeButtonAdd);
addModalEventListeners(
  modalEdit,
  openButtonEdit,
  closeButtonEdit,
  onOpenCallback
);
addModalEventListeners(modalImage, popupImage, closeButtonImage);
addModalEventListeners(modalAvatar, avatarElement, avatarCloseButton);

// Обработчик «отправки» формы
formElementAdd.addEventListener("submit", addFormSubmit);
closeButtonImage.addEventListener("click", closeModalImage);
avatarForm.addEventListener("submit", avatarFormSubmit);

//Export
export {
  nameInputEdit,
  jobInputEdit,
  nameProfile,
  jobProfile,
  nameInputAdd,
  formElementAdd,
  jobInputAdd,
  modalAdd,
  modalEdit,
  nameInputAvatar,
  avatarElement,
  modalImage,
  popupImage,
  popupImageName,
  placesList,
  formInput,
  formError,
  formElement,
  imageProfile,
  modalAvatar,
  avatarForm,
};
