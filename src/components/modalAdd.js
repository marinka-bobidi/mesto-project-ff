import { closeModal } from "../components/modal.js";
import { placesList, createCard, removeCard } from "../components/card.js";
import { openModalImage } from "../components/modalImage.js";
import { nameInputAdd, jobInputAdd, modalAdd } from "../pages/index.js";

function addFormSubmit(evt) {
  evt.preventDefault();

  const newCardData = {
    name: nameInputAdd.value,
    link: jobInputAdd.value,
  };

  const newCardElement = createCard(newCardData, removeCard, openModalImage);
  placesList.prepend(newCardElement);

  nameInputAdd.value = "";
  jobInputAdd.value = "";

  closeModal(modalAdd);
}

export { addFormSubmit };
