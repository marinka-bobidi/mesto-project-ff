import {
  nameInputEdit,
  jobInputEdit,
  nameProfile,
  jobProfile,
  modalEdit,
} from "../pages/index.js";

import { closeModal } from "./modal.js";

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

export { onOpenCallback, handleFormSubmit };
