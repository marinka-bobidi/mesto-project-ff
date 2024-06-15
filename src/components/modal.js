// Установка модификатора при загрузке приложения
document.querySelectorAll(".popup").forEach((popup) => {
  popup.classList.add("popup_is-animated");
});

//Открытие окна
function openModal(modal) {
  modal.classList.add("popup_is-animated");
  setTimeout(() => {
    modal.classList.add("popup_is-opened");
  }, 100);
}

//Закрытие окна
function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

//Слушатели событий
function addModalEventListeners(modal, openButton, closeButton) {
  openButton.addEventListener("click", () => openModal(modal));
  closeButton.addEventListener("click", () => closeModal(modal));

  //Закрытие по оверлей
  document.addEventListener("click", (evt) => {
    if (evt.target === modal) {
      closeModal(modal);
    }
  });
}

export { openModal, closeModal, addModalEventListeners };
