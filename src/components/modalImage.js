import { modalImage, popupImage, popupImageName } from "../pages/index.js";
import { closeModal } from "./modal.js";

const cardImages = document.querySelectorAll(".card__image");

function openModalImage(event) {
  const targetImage = event.target; // изображение, на которое было нажато
  const targetCard = targetImage.closest(".card"); // карточка, содержащая изображение
  const targetTitle = targetCard.querySelector(".card__title"); // заголовок карточки
  popupImage.src = targetImage.src; // устанавливаем src изображения в модальном окне
  popupImageName.textContent = targetTitle.textContent; // устанавливаем текст подписи в модальном окне
  modalImage.classList.add("popup_is-opened");
}

function closeModalImage() {
  closeModal(modalImage);
}

cardImages.forEach((image) => {
  image.addEventListener("click", openModalImage);
});

export { openModalImage, closeModalImage };
