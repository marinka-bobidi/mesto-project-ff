// VAR api.js
const baseHttp = "https://nomoreparties.co/v1/wff-cohort-17/";
const headers = {
  authorization: "15c26702-9c69-418c-9ef2-8c38a85250dc",
  "Content-Type": "application/json",
};

// Функция проверки ответа сервера
function getResponseData(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

// Функция запроса основной информации
function getInformation() {
  return fetch(baseHttp + "users/me", {
    headers: headers,
  }).then(getResponseData);
}

// Функция запроса карточек
function getCards() {
  return fetch(baseHttp + "cards", {
    headers: headers,
  }).then(getResponseData);
}

// Функция проверки запросов
function promiseAll() {
  return Promise.all([getInformation(), getCards()]);
}

// Функция сохранения информации
function saveСhanges(nameInputEdit, jobInputEdit) {
  return fetch(baseHttp + "users/me", {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify({
      name: nameInputEdit,
      about: jobInputEdit,
    }),
  }).then(getResponseData);
}

// Функция сохранения новой карточки
function saveCard(newCardData) {
  return fetch(baseHttp + "cards", {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      name: newCardData.name,
      link: newCardData.link,
    }),
  }).then(getResponseData);
}

// Функция удаления карточки
function deleteCard(ID) {
  fetch(baseHttp + `cards/${ID}`, {
    method: "DELETE",
    headers: headers,
  });
}

// Постановка лайка карточки
function handelLikeCard(ID) {
  return fetch(baseHttp + `likes/${ID}`, {
    method: "PUT",
    headers: headers,
  }).then(getResponseData);
}

// Удаления лайка карточки
function deleteLikeCard(ID) {
  return fetch(baseHttp + `cards/likes/${ID}`, {
    method: "DELETE",
    headers: headers,
  }).then(getResponseData);
}

// Обновление аватара пользователя
function updateAvatar(profileAvatar) {
  return fetch(baseHttp + "users/me/avatar", {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify({
      avatar: profileAvatar,
    }),
  }).then(getResponseData);
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
