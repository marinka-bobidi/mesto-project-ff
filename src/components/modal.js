import { clearValidationErrors } from "../components/validity.js";

function openModal(modal) {
  if (modal.querySelector("form") !== null) {
    modal.querySelector("form").querySelector("button").textContent =
      "Сохранить";
  }
  modal.classList.add("popup_is-animated");
  setTimeout(() => {
    modal.classList.add("popup_is-opened");
  }, 100);
  document.addEventListener("keydown", closeModalByEsc);
}

//Закрытие окна
const formElementus = document.querySelectorAll(".popup__form");

function closeModal(modal) {
  clearValidationErrors(formElementus);
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
  closeButton.addEventListener("click", () => closeModal(modal));
  if (typeof AdditionalFunction === "function") {
    AdditionalFunction();
  }

  //Закрытие по оверлей
  modal.addEventListener("click", (evt) => {
    if (evt.target === modal) {
      closeModal(modal);
    }
  });
}

export { openModal, closeModal, addModalEventListeners };
