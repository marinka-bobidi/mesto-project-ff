import { closeModal } from "../components/modal.js";
import { createCard, removeCard } from "../components/card.js";
import { openModalImage } from "../components/modalImage.js";
import {
  nameInputAdd,
  jobInputAdd,
  formElementAdd,
  modalAdd,
  placesList,
} from "../pages/index.js";

function addFormSubmit(evt) {
  evt.preventDefault();

  const newCardData = {
    name: nameInputAdd.value,
    link: jobInputAdd.value,
  };

  const newCardElement = createCard(newCardData, removeCard, openModalImage);
  placesList.prepend(newCardElement);

  formElementAdd.reset();

  closeModal(modalAdd);
}

export { addFormSubmit };
