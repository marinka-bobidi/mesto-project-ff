const Headers = {
  authorization: "e5843315-a034-497e-a50e-a3a3bb2355f1",
  "Content-Type": "application/json",
};

// Обработка ответа
function getResponseData(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

// Запрос для получения карточек на сервере
const cardListHttp = () => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-14/cards", {
    headers: Headers,
  }).then((value) => {
    return getResponseData(value);
  });
};

// Запрос для получения актуальной информации о пользователе
const actualNameHttp = () => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-14/users/me", {
    headers: Headers,
  }).then((value) => {
    return getResponseData(value);
  });
};

// Промисы. Возвращается массив cardListHttp, actualNameHttp запросов
const promiseMethod = () => {
  return Promise.all([cardListHttp(), actualNameHttp()]);
};

const editHttp = (nameInput, aboutInput, button) => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-14/users/me", {
    method: "PATCH",
    headers: Headers,
    body: JSON.stringify({
      name: nameInput,
      about: aboutInput,
    }),
  })
    .then((value) => {
      getResponseData(value);
    })
    .catch((error) => {
      console.log(error);
    });
};

const createCardHttp = (nameCard, linkCard) => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-14/cards", {
    method: "POST",
    headers: Headers,
    body: JSON.stringify({
      name: nameCard,
      link: linkCard,
    }),
  }).then((value) => {
    return getResponseData(value);
  });
};

const deleteCardHttp = (id) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-14/cards/${id}`, {
    method: "DELETE",
    headers: Headers,
  }).then((value) => {
    return getResponseData(value);
  });
};

const likeCardHttp = (id) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-14/cards/likes/${id}`, {
    method: "PUT",
    headers: Headers,
  }).then((value) => {
    return getResponseData(value);
  });
};

const deleteLikeCardHttp = (id) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-14/cards/likes/${id}`, {
    method: "DELETE",
    headers: Headers,
  }).then((value) => {
    return getResponseData(value);
  });
};

const editAvatarHttp = (data) => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-14/users/me/avatar", {
    method: "PATCH",
    headers: Headers,
    body: JSON.stringify(data),
  })
    .then((value) => {
      return getResponseData(value);
    })
    .catch((error) => {
      console.log(error);
    });
};

export {
  promiseMethod,
  editHttp,
  createCardHttp,
  deleteCardHttp,
  likeCardHttp,
  deleteLikeCardHttp,
  editAvatarHttp,
};
