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

formElement.addEventListener("submit", handleFormSubmit);
