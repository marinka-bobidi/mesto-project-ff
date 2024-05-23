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
// Закрытие через оверлей и esc
document.addEventListener("click", (evt) => {
  if (evt.target === modalEdit) {
    closeModalEdit();
  }
});
document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    closeModalEdit();
  }
});

// Слушатели событий
openButtonEdit.addEventListener("click", openModalEdit);
closeButtonEdit.addEventListener("click", closeModalEdit);

// Export
export { modalEdit, closeButtonEdit, openButtonEdit };

// Находим форму в DOM
const formElement = document.querySelector(".popup__form");
// Находим поля формы в DOM
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

// Обработчик «отправки» формы
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // Получите значение полей jobInput и nameInput из свойства value
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  // Выберите элементы, куда должны быть вставлены значения полей
  const nameProfile = document.querySelector(".profile__title"); // Изменено на заголовок попапа
  const jobProfile = document.querySelector(".profile__description"); // Изменено на класс, который вы предоставили

  // Вставьте новые значения с помощью textContent
  nameProfile.textContent = nameValue;
  jobProfile.textContent = jobValue;
  closeModalEdit();
}

// Прикрепляем обработчик к форме:
formElement.addEventListener("submit", handleFormSubmit);
