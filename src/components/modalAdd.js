import { closeModal } from "../components/modal.js";
import { createCardHttp } from "../components/api.js";
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

  createCardHttp(
    newCardData.name,
    newCardData.link,
    formElementAdd.querySelector("button")
  ).then(() => {
    setTimeout(() => {
      closeModal(modalAdd);
    }, 1000);
  });
  formElementAdd.reset();
}

export { addFormSubmit };
