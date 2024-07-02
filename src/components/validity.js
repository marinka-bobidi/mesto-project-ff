import { handleFormSubmit } from "../components/modalEdit.js";
import { addFormSubmit } from "../components/modalAdd.js";

// Функция отображает сообщение об ошибке для элемента ввода внутри формы.
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("popup__input_error");
  errorElement.classList.add("form__input-error_active");
  errorElement.textContent = errorMessage;
};

// Функция скрывает сообщение об ошибке для элемента ввода
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__input_error");
  errorElement.classList.remove("form__input-error_active");
  errorElement.textContent = "";
};

// Функция проверяет валидность значения ввода
const checkInputValidity = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(
      "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы"
    );
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

// Функция добавляет слушатели событий ввода для каждого элемента ввода внутри формы
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button");
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// Функция включает валидацию для всех форм на странице
const enableValidation = (formElement) => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

// Функция проверяет, есть ли в списке недопустимые элементы ввода
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Функция определяет, какой обработчик отправки формы использовать в зависимости от типа модального окна
const formSubmitcheck = (buttonElement) => {
  const modal = buttonElement.closest(".popup");
  if (modal.dataset.modalType === "edit") {
    return handleFormSubmit;
  }
  if (modal.dataset.modalType === "add") {
    return addFormSubmit;
  }
};

// Функция переключает состояние кнопки на основе валидности ввода
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__button_unactive");
    buttonElement.removeEventListener("click", formSubmitcheck(buttonElement));
  } else {
    buttonElement.classList.remove("popup__button_unactive");
    buttonElement.addEventListener("click", formSubmitcheck(buttonElement));
  }
};

// Функция очищает сообщение об ошибке при закрытии окна
const clearValidation = (modal) => {
  const popupForm = modal.querySelector(".popup__form");
  if (popupForm !== null) {
    const buttonElement = popupForm.querySelector(".popup__button");
    buttonElement.classList.add("popup__button_unactive");
    const inputList = popupForm.querySelectorAll(".popup__input");
    inputList.forEach((newInputList) => {
      hideInputError(popupForm, newInputList);
      newInputList.value = "";
    });
  }
};

// Export
export { enableValidation, clearValidation, toggleButtonState };
