function openModalImage(
  event,
  openModal,
  modalImage,
  popupImage,
  popupImageName
) {
  var cardImages = document.querySelectorAll(".card__image");
  const targetImage = event.target; // изображение, на которое было нажато
  const targetCard = targetImage.closest(".card"); // карточка, содержащая изображение
  const targetTitle = targetCard.querySelector(".card__title"); // заголовок карточки
  popupImage.src = targetImage.src; // устанавливаем src изображения в модальном окне
  popupImageName.textContent = targetTitle.textContent; // устанавливаем текст подписи в модальном окне
  openModal(modalImage);
}

function closeModalImage(closeModal) {
  closeModal(modalImage);
}

export { openModalImage, closeModalImage };
