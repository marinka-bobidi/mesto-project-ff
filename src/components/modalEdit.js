import { closeModal } from "./modal.js";
import { saveСhanges } from "./api.js";

// VAR modalEdit.js
const modalEdit = document.querySelector(".popup_type_edit");
const nameInputEdit = document.querySelector(".popup__input_type_name");
const jobInputEdit = document.querySelector(".popup__input_type_description");
const formElementEdit = document.querySelector(
  '.popup__form[name="edit-profile"]'
);

// Элементы, куда должны быть вставлены значения полей
const nameProfile = document.querySelector(".profile__title");
const jobProfile = document.querySelector(".profile__description");

// Устанавливает введеное пользователем значение на страницу
function handleFormSubmit(evt) {
  evt.preventDefault();
  const editButton = formElementEdit.querySelector("button");
  editButton.textContent = "Сохранение...";
  // Ожидане ответа
  saveСhanges(nameInputEdit.value, jobInputEdit.value).then((result) => {
    editButton.textContent = "Сохранить";
    nameProfile.textContent = result.name;
    jobProfile.textContent = result.about;
  });

  closeModal(modalEdit);
}

// Установка актуальных данных в форму
function onOpenCallback() {
  nameInputEdit.value = nameProfile.textContent;
  jobInputEdit.value = jobProfile.textContent;
}

// Export
export { onOpenCallback, handleFormSubmit, modalEdit, nameProfile, jobProfile };
