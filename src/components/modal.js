// Установка модификатора при загрузке приложения
document.querySelectorAll(".popup").forEach((popup) => {
  popup.classList.add("popup_is-animated");
});

//Открытие окна
function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeModalByEsc);
}

// Закрытие окна
const formElementus = document.querySelectorAll(".popup__form");

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeModalByEsc);
}

//closeModalByEsc
function closeModalByEsc(evt) {
  if (evt.key === "Escape") {
    const modal = document.querySelector(".popup_is-opened");
    closeModal(modal);
  }
}

//Слушатели событий
function addModalEventListeners(
  modal,
  openButton,
  closeButton,
  AdditionalFunction = undefined
) {
  openButton.addEventListener("click", () => openModal(modal));
  closeButton.addEventListener("click", () => {
    closeModal(modal);
    if (typeof AdditionalFunction === "function") {
      AdditionalFunction();
    }
  });
  //Закрытие по оверлей
  modal.addEventListener("click", (evt) => {
    if (evt.target === modal) {
      closeModal(modal);
    }
  });
}

export { openModal, closeModal, addModalEventListeners };
