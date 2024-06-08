import {
  deleteCardHttp,
  likeCardHttp,
  deleteLikeCardHttp,
} from "../components/api.js";

//  Темплейт карточки
const cardTemplate = document.querySelector("#card-template");

// Функция создания карточки
function createCard(
  cardData,
  removeCard = undefined,
  handleImageClick,
  handleLikeClick
) {
  const cardClone = cardTemplate.content.cloneNode(true);
  const cardTitle = cardClone.querySelector(".card__title");
  const cardImage = cardClone.querySelector(".card__image");
  const deleteButton = cardClone.querySelector(".card__delete-button");
  const cardElement = cardClone.querySelector(".card");
  const likeButton = cardClone.querySelector(".card__like-button");
  const likeCount = cardClone.querySelector(".like__count");

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.id = cardData._id;

  if (cardData && cardData.likes) {
    likeCount.textContent = cardData.likes.length;
    cardData.likes.forEach((element) => {
      if (element._id === "f5bf90e1e0f7ad367cc80d00") {
        likeButton.classList.add("card__like-button_is-active");
      }
    });
  } else {
    alert("cardData or cardData.likes is undefined");
  }

  cardImage.addEventListener("click", handleImageClick);
  likeButton.addEventListener("click", handleLikeClick);
  const avtorCohort = "f5bf90e1e0f7ad367cc80d00";

  // Функция обработчика событий
  function handleRemoveCard() {
    deleteCardHttp(cardElement.id);
    removeCard(cardElement);
  }

  if (removeCard !== undefined) {
    deleteButton.addEventListener("click", handleRemoveCard);

    if (cardData && cardData.owner && cardData.owner._id != avtorCohort) {
      deleteButton.removeEventListener("click", handleRemoveCard);
      deleteButton.style.display = "none";
    }
  }
  return cardClone;
}

// Обработчик лайкa
function handleLikeClick(event) {
  if (event.target.classList.contains("card__like-button_is-active")) {
    event.target.classList.remove("card__like-button_is-active");
    deleteLikeCardHttp(event.target.closest(".card").id).then((value) => {
      event.target.parentNode.querySelector(".like__count").textContent =
        value.likes.length;
    });
  } else {
    event.target.classList.add("card__like-button_is-active");
    likeCardHttp(event.target.closest(".card").id).then((value) => {
      event.target.parentNode.querySelector(".like__count").textContent =
        value.likes.length;
    });
  }
}

//  Функция удаления карточки
function removeCard(cardElement) {
  cardElement.remove();
}

export { createCard, removeCard, handleLikeClick };
