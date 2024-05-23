// Объявление переменных
const modalAdd = document.querySelector(".popup_type_new-card");
const closeButtonAdd = modalAdd.querySelector(".popup__close");
const openButtonAdd = document.querySelector(".profile__add-button");

// Вызов окна
function openModalAdd() {
  modalAdd.classList.add("popup_is-opened");
}

// Закрытие окна
function closeModalAdd() {
  modalAdd.classList.remove("popup_is-opened");
}
// Закрытие через оверлей и esc
document.addEventListener("click", (evt) => {
  if (evt.target === modalAdd) {
    closeModalAdd();
  }
});

document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    closeModalAdd();
  }
});

// Слушатели событий
openButtonAdd.addEventListener("click", openModalAdd);
closeButtonAdd.addEventListener("click", closeModalAdd);

// Export
export { modalAdd, closeButtonAdd, openButtonAdd };

// Находим форму в DOM
const formElement = document.querySelector('.popup__form[name="new-place"]');
// Находим поля формы в DOM
const nameInput = document.querySelector(".popup__input_type_card-name");
const jobInput = document.querySelector(".popup__input_type_url");

// Обработчик «отправки» формы
function addFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // Получите значение полей jobInput и nameInput из свойства value
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  // Создаем новую карточку и добавляем ее в DOM
  const newCardData = { name: nameValue, link: jobValue };
  const newCardElement = createCard(newCardData, removeCard, openModalImage);
  placesList.prepend(newCardElement);

  // Очищаем поля формы
  nameInput.value = "";
  jobInput.value = "";
  closeModalAdd();
}

// Добавляем обработчик «отправки» формы
formElement.addEventListener("submit", addFormSubmit);
import {
  cardTemplate,
  createCard,
  removeCard,
  placesList,
} from "../components/card.js";
import { openModalImage } from "../components/modalImage.js";
