// VAR card.js
const cardTemplate = document.querySelector("#card-template");
const placesList = document.querySelector(".places__list");

// Функция создания карточки
function createCard(cardData, removeCard, handleImageClick) {
  const cardClone = cardTemplate.content.cloneNode(true);
  const cardTitle = cardClone.querySelector(".card__title");
  const cardImage = cardClone.querySelector(".card__image");
  const deleteButton = cardClone.querySelector(".card__delete-button");
  const cardElement = cardClone.querySelector(".card");
  const likeButton = cardClone.querySelector(".card__like-button");

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;

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

export { createCard, removeCard, handleLikeClick, placesList };
