import { error } from "jquery";
import { handleFormSubmit } from "../components/modalEdit";
const formButton = document.querySelector(".popup__button");

// Реализация валидности формы
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
    });
  });
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("form__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
};

const symbolInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("form__input_type_error");
  errorElement.textContent =
    "Поле ввода может содержать только латинские и кириллические буквы, знаки, дефисы и пробелы";
  errorElement.classList.add("form__input-error_active");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__input_error");
  inputElement.classList.add("popup__input");
  try {
    errorElement.classList.remove("form__input-error_active");
  } catch (error) {
    console.log(error);
  }
  errorElement.textContent = "";
};

// Методы изменения input button, border
const inputStyleUnactive = (formElement, inputElement) => {
  const popupButton = formElement.querySelector("button");
  inputElement.classList.remove("popup__input");
  inputElement.classList.add("popup__input_error");
  popupButton.classList.remove("popup__button");
  popupButton.classList.add("popup__button_unactive");
  formElement.removeEventListener("submit", handleFormSubmit);
};

const inputStyleActive = (formElement, inputElement) => {
  const popupButton = formElement.querySelector("button");
  inputElement.classList.add("popup__input");
  inputElement.classList.remove("popup__input_error");
  popupButton.classList.add("popup__button");
  popupButton.classList.remove("popup__button_unactive");
  formElement.addEventListener("submit", handleFormSubmit);
};

// Проверка валидности ввода
const checkInputValidity = (formElement, inputElement) => {
  const isOnlyLettersAndSymbols = /^[a-zA-Zа-яА-Я\s\-]+$/.test(
    inputElement.value
  );
  if (!isOnlyLettersAndSymbols & (inputElement.type !== "url")) {
    symbolInputError(formElement, inputElement);
    inputStyleUnactive(formElement, inputElement);
  } else {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
      inputStyleUnactive(formElement, inputElement);
    } else {
      inputStyleActive(formElement, inputElement);
      hideInputError(formElement, inputElement);
    }
  }
};

// Функция для очистки ошибок валидации
const clearValidationErrors = (formElements) => {
  formElements.forEach((formElement) => {
    const inputList = Array.from(formElement.querySelectorAll("input"));
    inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement);
    });
  });
};

export {
  showInputError,
  symbolInputError,
  hideInputError,
  setEventListeners,
  checkInputValidity,
  clearValidationErrors,
};
