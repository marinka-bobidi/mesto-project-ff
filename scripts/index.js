// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template");

// @todo: Функция создания карточки
function createCard(cardData, removeCard) {
  const cardClone = cardTemplate.content.cloneNode(true);
  const cardTitle = cardClone.querySelector(".card__title");
  const cardImage = cardClone.querySelector(".card__image");
  const deleteButton = cardClone.querySelector(".card__delete-button");
  const cardElement = cardClone.querySelector(".card");

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;

  deleteButton.addEventListener("click", function () {
    removeCard(cardElement);
  });

  return cardClone;
}

// @todo: Функция удаления карточки
function removeCard(cardElement) {
  cardElement.remove();
}
