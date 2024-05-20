import { initialCards } from "../pages/cards.js";
import { openModalImage } from "../components/modalImage.js";

// @todo: Темплейт карточки
export const cardTemplate = document.querySelector("#card-template");

// @todo: Функция создания карточки
export function createCard(cardData, removeCard, handleImageClick) {
  const cardClone = cardTemplate.content.cloneNode(true);
  const cardTitle = cardClone.querySelector(".card__title");
  const cardImage = cardClone.querySelector(".card__image");
  const deleteButton = cardClone.querySelector(".card__delete-button");
  const cardElement = cardClone.querySelector(".card");

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;

  // Добавление обработчика событий для изображения
  cardImage.addEventListener("click", handleImageClick);

  deleteButton.addEventListener("click", function () {
    removeCard(cardElement);
  });

  return cardClone;
}

// @todo: Функция удаления карточки
export function removeCard(cardElement) {
  cardElement.remove();
}

// @todo: Вывести карточки на страницу
const placesList = document.querySelector(".places__list");

initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, removeCard, openModalImage);
  placesList.append(cardElement);
});
