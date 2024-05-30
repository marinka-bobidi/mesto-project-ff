import { openModalImage } from "../components/modalImage.js";

//  Темплейт карточки
const cardTemplate = document.querySelector("#card-template");

// Функция создания карточки
function createCard(cardData, removeCard, handleImageClick, handleLikeClick) {
  const cardClone = cardTemplate.content.cloneNode(true);
  const cardTitle = cardClone.querySelector(".card__title");
  const cardImage = cardClone.querySelector(".card__image");
  const deleteButton = cardClone.querySelector(".card__delete-button");
  const cardElement = cardClone.querySelector(".card");
  const likeButton = cardClone.querySelector(".card__like-button");

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  cardImage.addEventListener("click", handleImageClick);
  likeButton.addEventListener("click", handleLikeClick);

  deleteButton.addEventListener("click", function () {
    removeCard(cardElement);
  });

  return cardClone;
}

// Обработчик лайкa
function handleLikeClick(event) {
  event.target.classList.toggle("card__like-button_is-active");
}

//  Функция удаления карточки
function removeCard(cardElement) {
  cardElement.remove();
}

export { createCard, removeCard, handleLikeClick };
