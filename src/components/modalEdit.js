import {
  nameInputEdit,
  jobInputEdit,
  nameProfile,
  jobProfile,
  modalEdit,
} from "../pages/index.js";
import { closeModal } from "../components/modal.js";
import { editHttp } from "../components/api.js";

const formElement = document.querySelector('.popup__form[name="edit-profile"]');
function handleFormSubmit(evt) {
  evt.preventDefault();
  editHttp(
    nameInputEdit.value,
    jobInputEdit.value,
    formElement.querySelector("button")
  ).then((result) => {
    setTimeout(() => {
      nameProfile.textContent = nameInputEdit.value;
      jobProfile.textContent = jobInputEdit.value;
      closeModal(modalEdit);
    }, 500);
  });
}

function onOpenCallback() {
  nameInputEdit.value = nameProfile.textContent;
  jobInputEdit.value = jobProfile.textContent;
}

formElement.addEventListener("submit", handleFormSubmit);

export { onOpenCallback, formElement, handleFormSubmit };
