function openModal(modal) {
  modal.classList.add("popup_is-animated");

  setTimeout(() => {
    modal.classList.add("popup_is-opened");
  }, 100);

  document.addEventListener("keydown", closeModalByEsc);
}

//closeModalByEsc

function closeModalByEsc(evt) {
  const modal = document.querySelector(".popup_is-opened");
  if (evt.key === "Escape") {
    closeModal(modal);
  }
}

//Закрытие окна

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");

  document.removeEventListener("keydown", closeModalByEsc);
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
