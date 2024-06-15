import { handleFormSubmit } from "../pages/index.js";

const formButton = document.querySelector(".popup__button");

const enableValidation = (settings) => {
  const formList = Array.from(
    document.querySelectorAll(`.${settings.formSelector}`)
  );
  formList.forEach((formElement) => {
    setEventListeners(formElement, settings);
  });
};

// Реализация валидности формы
const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(
    formElement.querySelectorAll(`.${settings.inputSelector}`)
  );
  inputList.forEach((inputElement) => {
    checkInputValidity(formElement, inputElement, settings);
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, settings);
    });
  });
};

const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
};

const symbolInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = inputElement.dataset.text;
  errorElement.classList.add(settings.errorClass);
};

const buttonUnactive = (formElement, inputElement, settings) => {
  let popupButton = formElement.querySelector(".popup__button");
  try {
    popupButton.classList.remove(settings.submitButton);
    popupButton.classList.add(settings.unactiveButtonClass);
  } catch {}
};

const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = "";
};

// Методы изменения input button, border
const inputStyleUnactive = (formElement, inputElement, settings) => {
  let popupButton = formElement.querySelector(".popup__button");
  inputElement.classList.remove(settings.inputSelector);
  inputElement.classList.add(settings.inputErrorClass);
  try {
    popupButton.classList.remove(settings.submitButton);
    popupButton.classList.add(settings.unactiveButtonClass);
  } catch {}
  formElement.removeEventListener("submit", handleFormSubmit);
};

const inputStyleActive = (formElement, inputElement, settings) => {
  const popupButton = formElement.querySelector("button");
  inputElement.classList.add(settings.inputSelector);
  inputElement.classList.remove(settings.inputErrorClass);
  try {
    popupButton.classList.add(settings.submitButton);
    popupButton.classList.remove(settings.unactiveButtonClass);
  } catch {}
  formElement.addEventListener("submit", handleFormSubmit);
};

// Проверка валидности ввода
const checkInputValidity = (formElement, inputElement, settings) => {
  const isOnlyLettersAndSymbols = /^[a-zA-Zа-яА-Я\s\-]+$/.test(
    inputElement.value
  );
  if (inputElement.value === "") {
    inputStyleActive(formElement, inputElement, settings);
    buttonUnactive(formElement, inputElement, settings);
  } else if (!isOnlyLettersAndSymbols & (inputElement.type !== "url")) {
    symbolInputError(formElement, inputElement, settings);
    inputStyleUnactive(formElement, inputElement, settings, false);
  } else {
    if (!inputElement.validity.valid) {
      showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage,
        settings
      );
      inputStyleUnactive(formElement, inputElement, settings);
    } else {
      inputStyleActive(formElement, inputElement, settings);
      hideInputError(formElement, inputElement, settings);
    }
  }
};

// Функция для очистки ошибок валидации
const clearValidationErrors = (settings) => {
  const formElements = document.querySelectorAll(`.${settings.formSelector}`);
  formElements.forEach((formElement) => {
    const inputList = Array.from(
      formElement.querySelectorAll(`.${settings.inputSelector}`)
    );
    inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement, settings);
      buttonUnactive(formElement, inputElement, settings);
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
  enableValidation,
};
