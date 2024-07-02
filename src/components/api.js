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
  return fetch("https://nomoreparties.co/v1/wff-cohort-17/users/me", {
    method: "PATCH",
    headers: {
      authorization: "15c26702-9c69-418c-9ef2-8c38a85250dc",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameInputEdit,
      about: jobInputEdit,
    }),
  }).then((res) => res.json());
}

// Функция сохранения новой карточки
function saveCard(newCardData) {
  return fetch("https://nomoreparties.co/v1/wff-cohort-17/cards", {
    method: "POST",
    headers: {
      authorization: "15c26702-9c69-418c-9ef2-8c38a85250dc",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: newCardData.name,
      link: newCardData.link,
    }),
  }).then((value) => {
    return value.json();
  });
}

// Функция удаления карточки
function deleteCard(ID) {
  fetch(`https://nomoreparties.co/v1/wff-cohort-17/cards/${ID}`, {
    method: "DELETE",
    headers: {
      authorization: "15c26702-9c69-418c-9ef2-8c38a85250dc",
    },
  });
}

// Постановка лайка карточки
function handelLikeCard(ID) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-17/cards/likes/${ID}`, {
    method: "PUT",
    headers: {
      authorization: "15c26702-9c69-418c-9ef2-8c38a85250dc",
    },
  }).then((res) => res.json());
}

// Удаления лайка карточки
function deleteLikeCard(ID) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-17/cards/likes/${ID}`, {
    method: "DELETE",
    headers: {
      authorization: "15c26702-9c69-418c-9ef2-8c38a85250dc",
    },
  }).then((res) => res.json());
}

// Обновление аватара пользователя
function updateAvatar(profileAvatar) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-17/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: "15c26702-9c69-418c-9ef2-8c38a85250dc",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: profileAvatar,
    }),
  }).then((res) => res.json());
}

// Export
export {
  promiseAll,
  saveСhanges,
  saveCard,
  deleteCard,
  getInformation,
  handelLikeCard,
  deleteLikeCard,
  updateAvatar,
};
