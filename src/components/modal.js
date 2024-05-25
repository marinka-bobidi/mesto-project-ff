//Открытие окна
function openModal(modal) {
  modal.classList.add("popup_is-opened");
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

  //Закрытие по esc
  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      closeModal(modal);
    }
  });
}

export { openModal, closeModal, addModalEventListeners };
