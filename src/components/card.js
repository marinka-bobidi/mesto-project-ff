import { deleteCard, handelLikeCard, deleteLikeCard } from "./api";
import { openModalDelete, closeModalDelete, modalDelete } from "./modalDelete";

// VAR card.js
const cardTemplate = document.querySelector("#card-template");
const placesList = document.querySelector(".places__list");

// Функция создания карточки
function createCard(cardData, removeCard, handleImageClick, ownerID) {
  const cardClone = cardTemplate.content.cloneNode(true);
  const cardTitle = cardClone.querySelector(".card__title");
  const cardImage = cardClone.querySelector(".card__image");
  const cardElement = cardClone.querySelector(".card");
  const deleteButton = cardClone.querySelector(".card__delete-button");
  const likeButton = cardClone.querySelector(".card__like-button");
  const countLikes = cardClone.querySelector(".like__count");
  const ID = cardData._id;
  likeButton.setAttribute("data-id", ID);
  countLikes.textContent = cardData.likes.length;
  cardData.likes.forEach((obj) => {
    if (obj._id) {
      if (obj._id == ownerID) {
        likeButton.classList.toggle("card__like-button_is-active");
      }
    }
  });

  // Добавление иконы корзины при создании
  if (cardData.owner._id !== ownerID) {
    deleteButton.remove();
  }

  // Определение значений
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;

  //Слушатели
  cardImage.addEventListener("click", handleImageClick);
  likeButton.addEventListener("click", handleLikeClick);
  deleteButton.addEventListener("click", function (evt) {
    removeCard(cardElement, ID);
  });

  return cardClone;
}

// Обработчик лайкa
function handleLikeClick(event) {
  const likeButton = event.target;
  const cardID = likeButton.getAttribute("data-id");
  const likeElement = likeButton.closest(".like__element");
  const countLikes = likeElement.querySelector(".like__count");
  // Проверка на класс активности кнопки если класс есть, то удалить, если нет, до добавить.
  if (likeButton.classList.contains("card__like-button_is-active")) {
    deleteLikeCard(cardID).then((result) => {
      // Количество лайков
      countLikes.textContent = result.likes.length;
    });
  } else {
    handelLikeCard(cardID).then((result) => {
      // Кличество лайков
      countLikes.textContent = result.likes.length;
    });
  }
  likeButton.classList.toggle("card__like-button_is-active");
}

//  Функция удаления карточки
function removeCard(cardElement, ID) {
  // VAR modalDelete.js
  const deleteButton = modalDelete.querySelector(".popup__button");
  openModalDelete();
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
    deleteCard(ID);
    closeModalDelete();
  });
}

export { createCard, removeCard, placesList, modalDelete };
