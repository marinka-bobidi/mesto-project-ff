// Объявление переменных
const modalAdd = document.querySelector(".popup_type_new-card");
const closeButtonAdd = modalAdd.querySelector(".popup__close");
const openButtonAdd = document.querySelector(".profile__add-button");

// Вызов окна
function openModalAdd() {
  modalAdd.classList.add("popup_is-opened");
}

// Закрытие окна
function closeModalAdd() {
  modalAdd.classList.remove("popup_is-opened");
}

document.addEventListener("click", (evt) => {
  if (evt.target === modalAdd) {
    closeModalAdd();
  }
});

// Слушатели событий
openButtonAdd.addEventListener("click", openModalAdd);
closeButtonAdd.addEventListener("click", closeModalAdd);

// Export
export { modalAdd, closeButtonAdd, openButtonAdd };
