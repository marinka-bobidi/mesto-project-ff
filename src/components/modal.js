import { jobInputEdit, jobProfile, nameInputEdit, nameProfile } from "../pages";

function openModal(modal) {
  nameInputEdit.value = nameProfile.textContent;
  jobInputEdit.value = jobProfile.textContent;
  modal.classList.add("popup_is-animated");
  setTimeout(() => {
    modal.classList.add("popup_is-opened");
  }, 100);

  //Закрытие по esc
  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      closeModal(modal);
    }
  });
}

//Закрытие окна
function closeModal(modal) {
  modal.classList.remove("popup_is-opened");

  //Удаление закрытие по esc
  document.removeEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      closeModal(modal);
    }
  });
}

//Слушатели событий
function addModalEventListeners(modal, openButton, closeButton) {
  openButton.addEventListener("click", () => openModal(modal));
  closeButton.addEventListener("click", () => closeModal(modal));

  //Закрытие по оверлей
  modal.addEventListener("click", (evt) => {
    if (evt.target === modal) {
      closeModal(modal);
    }
  });
}

export { openModal, closeModal, addModalEventListeners };
