import { modalImage, popupImage, popupImageName } from "../pages/index.js";

import { closeModal, openModal } from "./modal.js";

const cardImages = document.querySelectorAll(".card__image");

function openModalImage(event) {
  const targetImage = event.target; // изображение, на которое было нажато

  const targetCard = targetImage.closest(".card"); // карточка, содержащая изображение

  const targetTitle = targetCard.querySelector(".card__title"); // заголовок карточки

  popupImage.src = targetImage.src; // устанавливаем src изображения в модальном окне

  popupImageName.textContent = targetTitle.textContent; // устанавливаем текст подписи в модальном окне

  openModal(modalImage);
}

function closeModalImage() {
  closeModal(modalImage);
}

export { openModalImage, closeModalImage };
