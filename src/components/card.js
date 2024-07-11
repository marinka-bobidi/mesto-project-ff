import { handelLikeCard, deleteLikeCard } from "./api";

// VAR card.js
const cardTemplate = document.querySelector("#card-template");

// Функция создания карточки
function createCard(cardData, openModalDelete, handleImageClick, ownerID) {
  const cardClone = cardTemplate.content.cloneNode(true);
  const cardTitle = cardClone.querySelector(".card__title");
  const cardImage = cardClone.querySelector(".card__image");
  const cardElement = cardClone.querySelector(".card");
  const deleteButton = cardClone.querySelector(".card__delete-button");
  const likeButton = cardClone.querySelector(".card__like-button");
  const countLikes = cardClone.querySelector(".like__count");
  const ID = cardData._id;
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
  likeButton.addEventListener("click", () => {
    handleLikeClick(likeButton, ID);
  });
  deleteButton.addEventListener("click", () => {
    openModalDelete(cardElement, ID);
  });

  return cardClone;
}

// Обработчик лайка
function handleLikeClick(likeButton, cardID) {
  const likeElement = likeButton.closest(".like__element");
  const countLikes = likeElement.querySelector(".like__count");
  // Проверка на класс активности кнопки если класс есть, то удалить, если нет, до добавить.
  if (likeButton.classList.contains("card__like-button_is-active")) {
    deleteLikeCard(cardID)
      .then((result) => {
        // Количество лайков
        countLikes.textContent = result.likes.length;
        likeButton.classList.toggle("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    handelLikeCard(cardID)
      .then((result) => {
        // Кличество лайков
        countLikes.textContent = result.likes.length;
        likeButton.classList.toggle("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export { createCard };
