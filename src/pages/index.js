import "../pages/index.css";
import {
  addModalEventListeners,
  closeModal,
  openModal,
} from "../components/modal.js";
import { createCard } from "../components/card.js";
import { enableValidation, clearValidation } from "../components/validation.js";
import {
  promiseAll,
  deleteCard,
  saveCard,
  updateAvatar,
  saveСhanges,
} from "../components/api.js";

//                                       ACTIONS

// VAR modalAdd
const modalAdd = document.querySelector(".popup_type_new-card");
const openButtonAdd = document.querySelector(".profile__add-button");
const saveButtonAdd = modalAdd.querySelector(".popup__button");
const closeButtonAdd = modalAdd.querySelector(".popup__close");
const inputModalAddList = modalAdd.querySelectorAll(".popup__input");
const formElementAdd = modalAdd.querySelector('.popup__form[name="new-place"]');
const nameInputAdd = formElementAdd.querySelector(
  ".popup__input_type_card-name"
);
const linkInputAdd = formElementAdd.querySelector(".popup__input_type_url");
const placesList = document.querySelector(".places__list");

// VAR modalEdit
const modalEdit = document.querySelector(".popup_type_edit");
const saveButtonEdit = modalEdit.querySelector(".popup__button");
const openButtonEdit = document.querySelector(".profile__edit-button");
const closeButtonEdit = modalEdit.querySelector(".popup__close");
const formElementEdit = modalEdit.querySelector(
  '.popup__form[name="edit-profile"]'
);
const nameInputEdit = formElementEdit.querySelector(".popup__input_type_name");
const jobInputEdit = formElementEdit.querySelector(
  ".popup__input_type_description"
);

// Элементы, куда должны быть вставлены значения полей modalEdit
const nameProfile = document.querySelector(".profile__title");
const jobProfile = document.querySelector(".profile__description");

//VAR Modalimage
const modalImage = document.querySelector(".popup_type_image");
const closeButtonImage = modalImage.querySelector(".popup__close");
const popupImage = modalImage.querySelector(".popup__image");
const popupImageName = modalImage.querySelector(".popup__caption");

//VAR MoadlAvatar
const modalAvatar = document.querySelector(".popup_type_edit_avatar");
const saveButtonAvatar = modalAvatar.querySelector(".popup__button");
const inputModalAvatarList = modalAvatar.querySelectorAll(".popup__input");
const closeButtonAvatar = modalAvatar.querySelector(".popup__close");
const formAvatar = document.querySelector(".profile__image");
const inputAvatar = modalAvatar.querySelector(".popup__input_type_avatar");
const profileImage = document.querySelector(".profile__image");
const formElementAvatar = document.querySelector(
  '.popup__form[name="avatar-profile"]'
);

let ownerID;

//VAR MoadlDelete
const modalDelete = document.querySelector(".popup_type_delete");
const formDelete = modalDelete.querySelector(
  '.popup__form[name="delete-button"]'
);
const closeButtonDelete = modalDelete.querySelector(".popup__close");
const deleteButton = modalDelete.querySelector(".popup__button");

//                          Установка модификатора при загрузке приложения
document.querySelectorAll(".popup").forEach((popup) => {
  popup.classList.add("popup_is-animated");
});

// Settings
const settings = {
  modal: ".popup",
  formElement: ".popup__form",
  inputElement: ".popup__input",
  buttonElement: ".popup__button",
  errorInputClass: "popup__input_error",
  errorElementClass: "form__input-error_active",
  buttonUnactiveClass: "popup__button_unactive",
  errorTag: "-error",
  modalCheck: [
    [handleFormSubmit, "popup_type_edit"],
    [addFormSubmit, "popup_type_new-card"],
    [saveFormAvatar, "popup_type_edit_avatar"],
  ],
};
//                                      ОКНО ДОБАВЛЕНИЯ КАРТОЧКИ

// Открытие модального окна аватара
function openModalAdd() {
  // Очистка текста
  inputModalAddList.forEach((input) => {
    input.value = "";
  });
  saveButtonAdd.removeEventListener("click", addFormSubmit);
  clearValidation(modalAdd, settings);
  openModal(modalAdd);
}

// Замена данных пользователя
function addFormSubmit(evt) {
  evt.preventDefault();
  const addButton = formElementAdd.querySelector("button");
  addButton.textContent = "Сохранение...";
  saveButtonAdd.removeEventListener("click", addFormSubmit);
  const newCardData = {
    name: nameInputAdd.value,
    link: linkInputAdd.value,
  };
  saveCard(newCardData)
    .then((value) => {
      const newCardElement = createCard(
        value,
        removeCard,
        openModalImage,
        ownerID
      );
      placesList.prepend(newCardElement);
      formElementAdd.reset();
      closeModal(modalAdd);
    })
    .finally(() => {
      addButton.textContent = "Сохранить";
    })
    .catch((err) => {
      console.log(err);
    });
}

// Слушатель событий для modalAdd
addModalEventListeners(modalAdd, openButtonAdd, closeButtonAdd, openModalAdd);

//                                      ОКНО РЕДАКТИРОВАНИЯ ПРОФИЛЯ

// Открытие модального окна аватара
function openModalEdit() {
  saveButtonEdit.removeEventListener("click", handleFormSubmit);
  // Очистка текста ошибок
  clearValidation(modalEdit, settings);
  openModal(modalEdit);
  // Установка актуальных данных в форму
  onOpenCallback();
}

// Сохранение актульных значений
function onOpenCallback() {
  nameInputEdit.value = nameProfile.textContent;
  jobInputEdit.value = jobProfile.textContent;
}

// Устанавливает введеное пользователем значение на страницу
function handleFormSubmit(evt) {
  evt.preventDefault();
  const editButton = formElementEdit.querySelector("button");
  editButton.textContent = "Сохранение...";

  // Ожидане ответа
  saveСhanges(nameInputEdit.value, jobInputEdit.value)
    .then((result) => {
      nameProfile.textContent = result.name;
      jobProfile.textContent = result.about;
      closeModal(modalEdit);
    })
    .finally(() => {
      editButton.textContent = "Сохранить";
    })
    .catch((err) => {
      console.log(err);
    });
}

// Слушатели событий для modalEdit
addModalEventListeners(
  modalEdit,
  openButtonEdit,
  closeButtonEdit,
  openModalEdit
);

//                                     ОКНО ПРИ ОТКРЫТИИ КАРТОЧКИ

// Открытие модального окна карточки
function openModalImage(event) {
  const targetImage = event.target; // изображение, на которое было нажато
  const targetCard = targetImage.closest(".card"); // карточка, содержащая изображение
  const targetTitle = targetCard.querySelector(".card__title"); // заголовок карточки
  popupImage.src = targetImage.src; // устанавливаем src изображения в модальном окне
  popupImageName.textContent = targetTitle.textContent; // устанавливаем текст подписи в модальном окне
  openModal(modalImage);
}

// Закрытия модального окна карточки
function closeModalImage() {
  closeModal(modalImage);
}

// Слушатели событий для modalImage
addModalEventListeners(
  modalImage,
  popupImage,
  closeButtonImage,
  openModalImage
);

//                                       ОКНО АВАТАРА ПРОФИЛЯ

// Открытие модального окна аватара
function openModalAvatar() {
  saveButtonAvatar.removeEventListener("click", saveFormAvatar);
  // Очистка текста ошибок
  inputModalAvatarList.forEach((input) => {
    input.value = "";
  });
  clearValidation(modalAvatar, settings);
  openModal(modalAvatar);
}

// Сохранение данных на страницу
function saveFormAvatar(evt) {
  evt.preventDefault();
  const newProfileImage = inputAvatar.value;
  const avatarButton = formElementAvatar.querySelector("button");
  avatarButton.textContent = "Сохранение...";
  updateAvatar(newProfileImage)
    .then((profileAvatar) => {
      profileImage.src = profileAvatar.avatar;
      closeModal(modalAvatar);
    })
    .finally(() => {
      avatarButton.textContent = "Сохранить";
    })
    .catch((err) => {
      console.log(err);
    });
}

// Для modalAvatar
addModalEventListeners(
  modalAvatar,
  formAvatar,
  closeButtonAvatar,
  openModalAvatar
);

//                                     ОКНО ПОТВЕРЖДЕНИЯ УДАЛЕНИЯ

// Открытие модального окна уточнения
function openModalDelete() {
  openModal(modalDelete);
}

// Закрытие модального окна уточнения
function closeModalDelete() {
  closeModal(modalDelete);
}

// Для modalDelete
addModalEventListeners(
  modalDelete,
  formDelete,
  closeButtonDelete,
  openModalDelete
);

//                                      Функция удаления карточки
function removeCard(cardElement, ID) {
  // VAR modalDelete
  openModalDelete();
  deleteButton.addEventListener("click", removeCardListener);
  closeButtonDelete.addEventListener("click", () => {
    deleteButton.removeEventListener("click", removeCardListener);
  });
  modalDelete.addEventListener("click", (evt) => {
    if (evt.target === modalDelete) {
      deleteButton.removeEventListener("click", removeCardListener);
    }
  });
  function removeCardListener(evt) {
    deleteCard(ID)
      .then((evt) => {
        cardElement.remove();
        closeModalDelete();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

//Вызов функций
enableValidation(settings);

// Обработчики «отправки» формы
closeButtonImage.addEventListener("click", closeModalImage);
formDelete.addEventListener("submit", closeModalDelete);

//                                    Обработка основной информации
promiseAll()
  .then(([info, card]) => {
    nameProfile.textContent = info.name;
    jobProfile.textContent = info.about;
    formAvatar.src = info.avatar;

    ownerID = info._id;
    const initialCards = card;

    initialCards.forEach((cardData) => {
      const cardElement = createCard(
        cardData,
        removeCard,
        openModalImage,
        ownerID
      );
      placesList.append(cardElement);
    });
  })
  .catch((err) => {
    console.log(err);
  });
