import "../components/modal.js";

// Объявление переменных
const modalEdit = document.querySelector(".popup_type_edit");
const openButtonEdit = document.querySelector(".profile__edit-button");
const closeButtonEdit = modalEdit.querySelector(".popup__close");

// Слушатели событий
addModalEventListeners(modalEdit, openButtonEdit, closeButtonEdit);

// Находим поля формы в DOM
const formElement = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

// Обработчик «отправки» формы
function handleFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  // Элементы, куда должны быть вставлены значения полей
  const nameProfile = document.querySelector(".profile__title");
  const jobProfile = document.querySelector(".profile__description");

  // Новые значения
  nameProfile.textContent = nameValue;
  jobProfile.textContent = jobValue;
  closeModal(modalEdit);
}

// Прикрепляем обработчик к форме:
formElement.addEventListener("submit", handleFormSubmit);
