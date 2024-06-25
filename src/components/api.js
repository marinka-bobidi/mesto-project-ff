// Функция запроса основной информации
function getInformation() {
  return fetch("https://nomoreparties.co/v1/wff-cohort-17/users/me", {
    headers: {
      authorization: "15c26702-9c69-418c-9ef2-8c38a85250dc",
    },
  }).then((res) => res.json());
}

// Функция запроса карточек
function getCards() {
  return fetch("https://nomoreparties.co/v1/wff-cohort-17/cards", {
    headers: {
      authorization: "15c26702-9c69-418c-9ef2-8c38a85250dc",
    },
  }).then((res) => res.json());
}

// Функция проверки запросов
function promiseAll() {
  return Promise.all([getInformation(), getCards()]);
}

// Функция сохранения информации
function saveСhanges(nameInputEdit, jobInputEdit) {
  fetch("https://nomoreparties.co/v1/wff-cohort-17/users/me", {
    method: "PATCH",
    headers: {
      authorization: "15c26702-9c69-418c-9ef2-8c38a85250dc",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameInputEdit,
      about: jobInputEdit,
    }),
  });
}

// Функция сохранения новой карточки
function saveCard(newCardData) {
  fetch("https://nomoreparties.co/v1/wff-cohort-17/cards", {
    method: "POST",
    headers: {
      authorization: "15c26702-9c69-418c-9ef2-8c38a85250dc",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: newCardData.name,
      link: newCardData.link,
    }),
  });
}

// Export
export { promiseAll, saveСhanges, saveCard };
