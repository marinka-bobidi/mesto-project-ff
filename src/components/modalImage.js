import { closeModal, openModal } from "./modal.js";

// VAR modalImage.js
const modalImage = document.querySelector(".popup_type_image");
const popupImage = modalImage.querySelector(".popup__image");
const popupImageName = modalImage.querySelector(".popup__caption");
const cardImages = document.querySelectorAll(".card__image");

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

// Export
export { openModalImage, closeModalImage, cardImages, modalImage, popupImage };
