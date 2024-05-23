// Объявление переменных
const modalEdit = document.querySelector(".popup_type_edit");
const closeButtonEdit = modalEdit.querySelector(".popup__close");
const openButtonEdit = document.querySelector(".profile__edit-button");

// Вызов окна
function openModalEdit() {
  modalEdit.classList.add("popup_is-opened");
}

// Закрытие окна
function closeModalEdit() {
  modalEdit.classList.remove("popup_is-opened");
}

document.addEventListener("click", (evt) => {
  if (evt.target === modalEdit) {
    closeModalEdit();
  }
});

// Слушатели событий
openButtonEdit.addEventListener("click", openModalEdit);
closeButtonEdit.addEventListener("click", closeModalEdit);

// Export
export { modalEdit, closeButtonEdit, openButtonEdit };
