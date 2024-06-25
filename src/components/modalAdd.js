import { closeModal } from "../components/modal.js";
import { createCard, removeCard, placesList } from "../components/card.js";
import { openModalImage } from "../components/modalImage.js";
import { saveCard } from "./api.js";

// VAR modalAdd.js
const modalAdd = document.querySelector(".popup_type_new-card");
const formElementAdd = document.querySelector('.popup__form[name="new-place"]');

// Элементы, куда должны быть вставлены значения полей
const nameInputAdd = document.querySelector(".popup__input_type_card-name");
const linkInputAdd = document.querySelector(".popup__input_type_url");

//
function addFormSubmit(evt) {
  evt.preventDefault();

  const newCardData = {
    name: nameInputAdd.value,
    link: linkInputAdd.value,
  };

  const newCardElement = createCard(newCardData, removeCard, openModalImage);
  placesList.prepend(newCardElement);
  formElementAdd.reset();
  saveCard(newCardData);
  closeModal(modalAdd);
}

// Export
export { addFormSubmit, modalAdd, formElementAdd };
