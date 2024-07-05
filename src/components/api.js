// Функция запроса основной информации
const baseHttp = "https://nomoreparties.co/v1/wff-cohort-17/";
const headers = {
  authorization: "15c26702-9c69-418c-9ef2-8c38a85250dc",
  "Content-Type": "application/json",
};

function getInformation() {
  return fetch(baseHttp + "users/me", {
    headers: headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
}

// Функция запроса карточек
function getCards() {
  return fetch(baseHttp + "cards", {
    headers: headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
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
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
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
  })
    .then((value) => {
      if (value.ok) {
        return value.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${value.status}`);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
}

// Функция удаления карточки
function deleteCard(ID) {
  fetch(`https://nomoreparties.co/v1/wff-cohort-17/cards/${ID}`, {
    method: "DELETE",
    headers: headers,
  });
}

// Постановка лайка карточки
function handelLikeCard(ID) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-17/cards/likes/${ID}`, {
    method: "PUT",
    headers: headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
}

// Удаления лайка карточки
function deleteLikeCard(ID) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-17/cards/likes/${ID}`, {
    method: "DELETE",
    headers: headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
}

// Обновление аватара пользователя
function updateAvatar(profileAvatar) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-17/users/me/avatar`, {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify({
      avatar: profileAvatar,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
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
