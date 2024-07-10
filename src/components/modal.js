// Открытие окна
function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeModalByEsc);
}

// Закрытие окна
function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeModalByEsc);
}

// closeModalByEsc
function closeModalByEsc(evt) {
  if (evt.key === "Escape") {
    const modal = document.querySelector(".popup_is-opened");
    closeModal(modal);
  }
}

// Слушатели событий
function addModalEventListeners(
  modal,
  openButton,
  closeButton,
  openModalFunction
) {
  openButton.addEventListener("click", () => openModalFunction(modal));
  closeButton.addEventListener("click", () => closeModal(modal));

  // Закрытие по оверлей
  modal.addEventListener("click", (evt) => {
    if (evt.target === modal) {
      closeModal(modal);
    }
  });
}

// Export
export { openModal, closeModal, addModalEventListeners };
