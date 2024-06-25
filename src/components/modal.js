import { onOpenCallback } from "../components/modalEdit.js";
import { clearValidation } from "./validity.js";

// Установка модификатора при загрузке приложения
document.querySelectorAll(".popup").forEach((popup) => {
  popup.classList.add("popup_is-animated");
});

// Открытие окна
function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeModalByEsc);
  if (modal.dataset.modalType === "edit") {
    onOpenCallback();
  }
}

// Закрытие окна
function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeModalByEsc);
  clearValidation(modal);
}

// closeModalByEsc
function closeModalByEsc(evt) {
  if (evt.key === "Escape") {
    const modal = document.querySelector(".popup_is-opened");

    closeModal(modal);
  }
}

// Слушатели событий
function addModalEventListeners(modal, openButton, closeButton) {
  openButton.addEventListener("click", () => openModal(modal));
  closeButton.addEventListener("click", () => closeModal(modal));

  // Закрытие по оверлей
  document.addEventListener("click", (evt) => {
    if (evt.target === modal) {
      closeModal(modal);
    }
  });
}

// Export
export { openModal, closeModal, addModalEventListeners };
