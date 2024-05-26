import "../pages/index.css";
import "../components/modalImage.js";
import "../components/modalAdd.js";
import "../components/modalEdit.js";
import "../components/card.js";

import { addModalEventListeners } from "../components/modal.js";
import { addFormSubmit } from "../components/modalAdd.js";
import { closeModalImage, openModalImage } from "../components/modalImage.js";

//                                    actions
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

//VAR Modalimage.js
const modalImage = document.querySelector(".popup_type_image");
const popupImage = modalImage.querySelector(".popup__image");
const popupImageName = modalImage.querySelector(".popup__caption");
const closeButtonImage = modalImage.querySelector(".popup__close");

// Элементы, куда должны быть вставлены значения полей
const nameProfile = document.querySelector(".profile__title");
const jobProfile = document.querySelector(".profile__description");
const nameInputAdd = document.querySelector(".popup__input_type_card-name");
const jobInputAdd = document.querySelector(".popup__input_type_url");

// Слушатели событий
addModalEventListeners(modalAdd, openButtonAdd, closeButtonAdd);
addModalEventListeners(modalEdit, openButtonEdit, closeButtonEdit);
addModalEventListeners(modalImage, popupImage, closeButtonImage);

// Обработчик «отправки» формы
formElementAdd.addEventListener("submit", addFormSubmit);
closeButtonImage.addEventListener("click", closeModalImage);

//Export
export {
  nameInputEdit,
  jobInputEdit,
  nameProfile,
  jobProfile,
  nameInputAdd,
  jobInputAdd,
  modalAdd,
  modalEdit,
  modalImage,
  popupImage,
  popupImageName,
};
