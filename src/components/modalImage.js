// Объявление переменных
const modalImage = document.querySelector(".popup_type_image");
const closeButtonImage = modalImage.querySelector(".popup__close");
const cardImages = document.querySelectorAll(".card__image");
const popupImage = modalImage.querySelector(".popup__image");
const popupImageName = modalImage.querySelector(".popup__caption");

function openModalImage(event) {
  const targetImage = event.target; // изображение, на которое было нажато
  const targetCard = targetImage.closest(".card"); // карточка, содержащая изображение
  const targetTitle = targetCard.querySelector(".card__title"); // заголовок карточки
  popupImage.src = targetImage.src; // устанавливаем src изображения в модальном окне
  popupImageName.textContent = targetTitle.textContent; // устанавливаем текст подписи в модальном окне
  modalImage.classList.add("popup_is-opened");
}

// Закрытие окна
function closeModalImage() {
  modalImage.classList.remove("popup_is-opened");
}
// Закрытие через оверлей и esc
document.addEventListener("click", (evt) => {
  if (evt.target === modalImage) {
    closeModalImage();
  }
});
document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    closeModalImage();
  }
});

// Слушатели событий
cardImages.forEach((image) => {
  image.addEventListener("click", openModalImage);
});

closeButtonImage.addEventListener("click", closeModalImage);

// Export
export { openModalImage };
