import "../pages/index.css";
import "../components/modalImage.js";
import "../components/modalAdd.js";
import "../components/card.js";
import {
  addModalEventListeners,
  closeModal,
  openModal,
} from "../components/modal.js";
import { closeModalImage, openModalImage } from "../components/modalImage.js";
import {
  setEventListeners,
  enableValidation,
  clearValidationErrors,
  checkInputValidity,
} from "../components/validity.js";
import { promiseMethod, editHttp, editAvatarHttp } from "../components/api.js";
import { avatarFormSubmit } from "../components/modalAvatar.js";
import { removeCard } from "../components/card.js";
import { deleteCardHttp } from "../components/api.js";
import {
  createCardHttp,
  likeCardHttp,
  deleteLikeCardHttp,
} from "../components/api.js";

//                                    actions
// VAR card.js
const placesList = document.querySelector(".places__list");

// VAR modalAdd.js
const modalAdd = document.querySelector(".popup_type_new-card");
const openButtonAdd = document.querySelector(".profile__add-button");
const closeButtonAdd = modalAdd.querySelector(".popup__close");
const formElementAdd = document.querySelector('.popup__form[name="new-place"]');

// VAR modalEdit.js
const modalEdit = document.querySelector(".popup_type_edit");
const openButtonEdit = document.querySelector(".profile__edit-button");
const closeButtonEdit = modalEdit.querySelector(".popup__close");
const nameInputEdit = document.querySelector(".popup__input_type_name");
const jobInputEdit = document.querySelector(".popup__input_type_description");

// VAR modalAvatar.js
const modalAvatar = document.querySelector(".popup_type_edit_avatar");
const nameInputAvatar = document.querySelector(".popup__input_type_avatar");
const avatarElement = document.querySelector(".profile__avatar-edit");
const avatarForm = document.querySelector(
  '.popup__form[name="avatar-profile"]'
);
const avatarButtonSubmit = modalAvatar.querySelector(".popup__button");
const avatarCloseButton = modalAvatar.querySelector(".popup__close");

//VAR Modalimage.js
const modalImage = document.querySelector(".popup_type_image");
const popupImage = modalImage.querySelector(".popup__image");
const popupImageName = modalImage.querySelector(".popup__caption");
const closeButtonImage = modalImage.querySelector(".popup__close");

// Элементы, куда должны быть вставлены значения полей
const imageProfile = document.querySelector(".profile__image");

const nameInputAdd = document.querySelector(".popup__input_type_card-name");
const jobInputAdd = document.querySelector(".popup__input_type_url");

// Элементы формы
const formInput = document.querySelector(".popup__input");
const formList = document.querySelectorAll(".popup__form");

//  Темплейт карточки
const cardTemplate = document.querySelector("#card-template");

// Поля ввода профиля
const nameProfile = document.querySelector(".profile__title");
const jobProfile = document.querySelector(".profile__description");

const settings = {
  formSelector: "popup__form",
  inputSelector: "popup__input",
  submitButton: "popup__button",
  unactiveButtonClass: "popup__button_unactive",
  inputErrorClass: "popup__input_error",
  errorClass: "form__input-error_active",
};

// Функции
let owner_id;
// Функция создании карточки
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
      if (element._id === owner_id) {
        likeButton.classList.add("card__like-button_is-active");
      }
    });
  } else {
    alert("cardData or cardData.likes is undefined");
  }

  cardImage.addEventListener("click", handleImageClick);
  likeButton.addEventListener("click", handleLikeClick);
  const avtorCohort = owner_id;

  // Функция обработчика событий
  function handleRemoveCard() {
    deleteCardHttp(cardElement.id)
      .then(() => {
        removeCard(cardElement);
      })
      .catch((error) => {
        console.log(error);
      });
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

// OpenModalImageFunc
const openModalImageFunc = (evt) => {
  openModalImage(evt, openModal, modalImage, popupImage, popupImageName);
};

function closeModalFunc(modal) {
  closeModal(modal);
  clearValidationErrors(settings);
}
// Функция добавления действия отправки данных о карточке на кнопку
function addFormSubmit(evt) {
  evt.preventDefault();
  const newCardData = {
    name: nameInputAdd.value,
    link: jobInputAdd.value,
  };
  const addButtonSubmit = formElementAdd.querySelector(".popup__button");
  addButtonSubmit.textContent = "Загрузка...";

  createCardHttp(newCardData.name, newCardData.link)
    .then((value) => {
      const cardElement = createCard(
        value,
        removeCard,
        openModalImageFunc,
        handleLikeClick
      );
      placesList.prepend(cardElement);
      addButtonSubmit.textContent = "Сохранить";
      closeModalFunc(modalAdd);
    })
    .catch((error) => {
      console.log(error);
    });
  formElementAdd.reset();
}

// Обработчик лайкa
function handleLikeClick(event) {
  let card = event.target.closest(".card");
  let likeCount = card.querySelector(".like__count");

  if (event.target.classList.contains("card__like-button_is-active")) {
    event.target.classList.remove("card__like-button_is-active");
    deleteLikeCardHttp(card.id)
      .then((value) => {
        likeCount.textContent = value.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    event.target.classList.add("card__like-button_is-active");
    likeCardHttp(card.id)
      .then((value) => {
        likeCount.textContent = value.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

// Первоначальная прогрузка страницы

promiseMethod()
  .then((value) => {
    // Установка значений из actualNameHttp
    nameProfile.textContent = value[1].name;
    jobProfile.textContent = value[1].about;
    nameInputEdit.value = value[1].name;
    jobInputEdit.value = value[1].about;
    imageProfile.src = value[1].avatar;
    owner_id = value[1]._id;
    // Карточки инициализация
    const initialCards = value[0];
    initialCards.forEach((cardData) => {
      const cardElement = createCard(
        cardData,
        removeCard,
        openModalImageFunc,
        handleLikeClick
      );
      placesList.append(cardElement);
    });
  })
  .then(() => {
    enableValidation(settings);
  })
  .catch((error) => {
    console.log(error);
  });

let formElementEdit = document.querySelector(
  '.popup__form[name="edit-profile"]'
);
function handleFormSubmit(evt) {
  evt.preventDefault();
  var ButtonSubmit = evt.target.querySelector("button");
  ButtonSubmit.textContent = "Загрузка...";
  editHttp(nameInputEdit.value, jobInputEdit.value)
    .then((result) => {
      nameProfile.textContent = nameInputEdit.value;
      ButtonSubmit.textContent = "Сохранить";
      jobProfile.textContent = jobInputEdit.value;
      closeModalFunc(modalEdit);
    })
    .catch((error) => {
      console.log(error);
    });
}
function onOpenCallback() {
  nameInputEdit.value = nameProfile.textContent;

  jobInputEdit.value = jobProfile.textContent;
}

formElementEdit.addEventListener("submit", handleFormSubmit);

// Слушатели событий
addModalEventListeners(modalAdd, openButtonAdd, closeButtonAdd);
addModalEventListeners(
  modalEdit,
  openButtonEdit,
  closeButtonEdit,
  onOpenCallback
);

addModalEventListeners(modalImage, popupImage, closeButtonImage);
addModalEventListeners(modalAvatar, avatarElement, avatarCloseButton);

const avatarFunc = (evt) => {
  var inputAvatar = document.querySelector("#image__input_avatar");
  avatarFormSubmit(
    evt,
    imageProfile,
    modalAvatar,
    inputAvatar,
    editAvatarHttp,
    closeModal
  );
};

// Обработчик «отправки» формы
formElementAdd.addEventListener("submit", addFormSubmit);
closeButtonImage.addEventListener("click", closeModalImage);
avatarForm.addEventListener("submit", avatarFunc);

//Export
export { handleFormSubmit };
