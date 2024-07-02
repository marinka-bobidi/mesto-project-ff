import "../pages/index.css";
import "../components/modalImage.js";
import "../components/modalAdd.js";
import "../components/modalEdit.js";
import "../components/card.js";
import "../components/validity.js";

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
import {
  createCard,
  removeCard,
  handleLikeClick,
  placesList,
} from "../components/card.js";
import {
  onOpenCallback,
  modalEdit,
  nameProfile,
  jobProfile,
} from "../components/modalEdit.js";
import { enableValidation } from "../components/validity.js";
import { promiseAll, handelLikeCard } from "../components/api.js";
import {
  modalAvatar,
  closeModalAvatar,
  saveFormAvatar,
  formElementAvatar,
} from "../components/modalAvatar.js";

//                                    actions
// VAR modalAdd.js
const openButtonAdd = document.querySelector(".profile__add-button");
const closeButtonAdd = modalAdd.querySelector(".popup__close");

// VAR modalEdit.js
const openButtonEdit = document.querySelector(".profile__edit-button");
const closeButtonEdit = modalEdit.querySelector(".popup__close");
// const profileAvatar = document.querySelector(".profile__image");

//VAR Modalimage.js
const closeButtonImage = modalImage.querySelector(".popup__close");

//VAR MoadlAvatar.js
const closeButtonAvatar = modalAvatar.querySelector(".popup__close");
const formAvatar = document.querySelector(".profile__image");

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

// Обработчики «отправки» формы
formElementAdd.addEventListener("submit", addFormSubmit);
closeButtonImage.addEventListener("click", closeModalImage);
formElementAvatar.addEventListener("submit", saveFormAvatar);

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
  handelLikeCard(card);
});
