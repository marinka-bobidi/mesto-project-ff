import { closeModal } from "./modal.js";
import { saveСhanges } from "./api.js";

// VAR modalEdit.js
const modalEdit = document.querySelector(".popup_type_edit");
const nameInputEdit = document.querySelector(".popup__input_type_name");
const jobInputEdit = document.querySelector(".popup__input_type_description");

// Элементы, куда должны быть вставлены значения полей
const nameProfile = document.querySelector(".profile__title");
const jobProfile = document.querySelector(".profile__description");

// Устанавливает введеное пользователем значение на страницу
function handleFormSubmit(evt) {
  evt.preventDefault();
  saveСhanges(nameInputEdit.value, jobInputEdit.value);
  closeModal(modalEdit);
}

// Установка актуальных данных в форму
function onOpenCallback() {
  nameInputEdit.value = nameProfile.textContent;
  jobInputEdit.value = jobProfile.textContent;
}

// Export
export { onOpenCallback, handleFormSubmit, modalEdit, nameProfile, jobProfile };
