import "../pages/index.css";

import { addModalEventListeners } from "../components/modal.js";
import {
  addFormSubmit,
  modalAdd,
  formElementAdd,
} from "../components/modalAdd.js";
import {
  closeModalImage,
  openModalImage,
  modalImage,
  popupImage,
} from "../components/modalImage.js";
import { createCard, removeCard, placesList } from "../components/card.js";
import {
  onOpenCallback,
  modalEdit,
  nameProfile,
  jobProfile,
} from "../components/modalEdit.js";
import { enableValidation } from "../components/validity.js";
import { promiseAll } from "../components/api.js";
import {
  modalAvatar,
  saveFormAvatar,
  formElementAvatar,
} from "../components/modalAvatar.js";
import { closeModalDelete, modalDelete } from "../components/modalDelete.js";

//                                    actions
// VAR modalAdd.js
const openButtonAdd = document.querySelector(".profile__add-button");
const closeButtonAdd = modalAdd.querySelector(".popup__close");

// VAR modalEdit.js
const openButtonEdit = document.querySelector(".profile__edit-button");
const closeButtonEdit = modalEdit.querySelector(".popup__close");

//VAR Modalimage.js
const closeButtonImage = modalImage.querySelector(".popup__close");

//VAR MoadlAvatar.js
const closeButtonAvatar = modalAvatar.querySelector(".popup__close");
const formAvatar = document.querySelector(".profile__image");

//VAR MoadlDelete.js
const formDelete = modalDelete.querySelector(
  '.popup__form[name="delete-button"]'
);
const closeButtonDelete = modalDelete.querySelector(".popup__close");

//                               Вывести карточки на страницу
//                                 Слушатели событий
// Для modalAdd.js
addModalEventListeners(modalAdd, openButtonAdd, closeButtonAdd);

// Для modalEdit.js
addModalEventListeners(
  modalEdit,
  openButtonEdit,
  closeButtonEdit,
  onOpenCallback
);

// Для modalImage.js
addModalEventListeners(modalImage, popupImage, closeButtonImage);

// Для modalAvatar.js
addModalEventListeners(modalAvatar, formAvatar, closeButtonAvatar);

// Для modalDelete
addModalEventListeners(modalDelete, formDelete, closeButtonDelete);

// Обработчики «отправки» формы
formElementAdd.addEventListener("submit", addFormSubmit);
closeButtonImage.addEventListener("click", closeModalImage);
formElementAvatar.addEventListener("submit", saveFormAvatar);
formDelete.addEventListener("submit", closeModalDelete);

//Вызов функций
enableValidation();

// Обработка основной информации
promiseAll().then(([info, card]) => {
  nameProfile.textContent = info.name;
  jobProfile.textContent = info.about;
  formAvatar.src = info.avatar;

  const ownerID = info._id;
  const initialCards = card;

  initialCards.forEach((cardData) => {
    const cardElement = createCard(
      cardData,
      removeCard,
      openModalImage,
      ownerID
    );
    placesList.append(cardElement);
  });
});
