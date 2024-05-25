import {
  openModal,
  closeModal,
  addModalEventListeners,
} from "../components/modal.js";
import {
  placesList,
  createCard,
  removeCard,
  handleLikeClick,
} from "../components/card.js";

import { openModalImage } from "../components/modalImage.js";

// Объявление переменных
const modalAdd = document.querySelector(".popup_type_new-card");
const openButtonAdd = document.querySelector(".profile__add-button");
const closeButtonAdd = modalAdd.querySelector(".popup__close");
// Слушатели событий
addModalEventListeners(modalAdd, openButtonAdd, closeButtonAdd);

// Находим форму в DOM
const formElement = document.querySelector('.popup__form[name="new-place"]');

// Находим поля формы в DOM
const nameInput = document.querySelector(".popup__input_type_card-name");
const jobInput = document.querySelector(".popup__input_type_url");

// Обработчик «отправки» формы
function addFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  // Создаем новую карточку и добавляем ее в DOM
  const newCardData = { name: nameValue, link: jobValue };
  const newCardElement = createCard(newCardData, removeCard, openModalImage);
  placesList.prepend(newCardElement);

  // Очищаем поля формы
  nameInput.value = "";
  jobInput.value = "";
  closeModal(modalAdd);
}

// Добавляем обработчик «отправки» формы
formElement.addEventListener("submit", addFormSubmit);
