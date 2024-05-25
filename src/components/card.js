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
  const likeButton = cardClone.querySelector(".card__like-button");

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;

  cardImage.addEventListener("click", handleImageClick);
  likeButton.addEventListener("click", handleLikeClick); // Добавляем обработчик событий к кнопке лайка

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
export const placesList = document.querySelector(".places__list");

initialCards.forEach((cardData) => {
  const cardElement = createCard(
    cardData,
    removeCard,
    openModalImage,
    handleLikeClick
  );
  placesList.append(cardElement);
});

// Обработчик клика по лайку
export function handleLikeClick(event) {
  event.target.classList.toggle("card__like-button_is-active");
}
