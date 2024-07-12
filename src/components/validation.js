// Функция отображает сообщение об ошибке для элемента ввода внутри формы.
const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(
    `.${inputElement.id}${settings.errorTag}`
  );
  inputElement.classList.add(settings.errorInputClass);
  errorElement.classList.add(settings.errorElementClass);
  errorElement.textContent = errorMessage;
};

// Функция скрывает сообщение об ошибке для элемента ввода
const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(
    `.${inputElement.id}${settings.errorTag}`
  );
  inputElement.classList.remove(settings.errorInputClass);
  errorElement.classList.remove(settings.errorElementClass);
  errorElement.textContent = "";
};

// Функция проверяет валидность значения ввода
const checkInputValidity = (formElement, inputElement, settings) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.text);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      settings
    );
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

// Функция добавляет слушатели событий ввода для каждого элемента ввода внутри формы
const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputElement)
  );
  const buttonElement = formElement.querySelector(settings.buttonElement);
  toggleButtonState(inputList, buttonElement, settings);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
};

// Функция включает валидацию для всех форм на странице
const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formElement));
  formList.forEach((formElement) => {
    setEventListeners(formElement, settings);
  });
};

// Функция проверяет, есть ли в списке недопустимые элементы ввода
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Функция переключает состояние кнопки на основе валидности ввода
const toggleButtonState = (inputList, buttonElement, settings) => {
  // Cсылка на функцию обработчика события
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.buttonUnactiveClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(settings.buttonUnactiveClass);
    buttonElement.disabled = false;
  }
};

// Функция очищает сообщение об ошибке при закрытии окна
const clearValidation = (modal, settings) => {
  const popupForm = modal.querySelector(settings.formElement);
  const buttonElement = popupForm.querySelector(settings.buttonElement);
  buttonElement.classList.add(settings.buttonUnactiveClass);
  buttonElement.disabled = true;
  const inputList = popupForm.querySelectorAll(settings.inputElement);
  inputList.forEach((newInputList) => {
    hideInputError(popupForm, newInputList, settings);
  });
};

// Export
export { enableValidation, clearValidation };
