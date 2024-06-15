import {
  nameInputEdit,
  jobInputEdit,
  nameProfile,
  jobProfile,
  modalEdit,
} from "../pages/index.js";

import { closeModal } from "./modal.js";

const formElement = document.querySelector(".popup__form");

function handleFormSubmit(evt) {
  evt.preventDefault();

  nameProfile.textContent = nameInputEdit.value;

  jobProfile.textContent = jobInputEdit.value;

  closeModal(modalEdit);
}

function onOpenCallback() {
  nameInputEdit.value = nameProfile.textContent;

  jobInputEdit.value = jobProfile.textContent;
}

formElement.addEventListener("submit", handleFormSubmit);

export { onOpenCallback };
