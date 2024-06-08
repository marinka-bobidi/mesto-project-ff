import {
  nameProfile,
  jobProfile,
  imageProfile,
  nameInputEdit,
  jobInputEdit,
} from "../pages/index.js";
import { removeCard, handleLikeClick, createCard } from "./card.js";
import { openModalImage } from "./modalImage.js";
import { placesList } from "../pages/index.js";

const http = () => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-14/cards", {
    headers: {
      authorization: "e5843315-a034-497e-a50e-a3a3bb2355f1",
    },
  }).then((result) => {
    if (result.ok) {
      return result.json();
    }
  });
};

const actualName = () => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-14/users/me", {
    headers: {
      authorization: "e5843315-a034-497e-a50e-a3a3bb2355f1",
    },
  })
    .then((result) => {
      if (result.ok) {
        return result.json();
      }
    })
    .then((data) => {
      return data;
    });
};

// Промисы
const promiseMethod = () => {
  Promise.all([http(), actualName()])
    .then((value) => {
      nameProfile.textContent = value[1].name;
      jobProfile.textContent = value[1].about;
      nameInputEdit.value = value[1].name;
      jobInputEdit.value = value[1].about;
      imageProfile.src = value[1].avatar;
      const initialCards = value[0];
      // Карточки инициализация

      initialCards.forEach((cardData) => {
        const cardElement = createCard(
          cardData,
          removeCard,
          openModalImage,
          handleLikeClick
        );
        placesList.append(cardElement);
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

const editHttp = (nameInput, aboutInput, button) => {
  button.textContent = "Сохранение...";
  return fetch("https://nomoreparties.co/v1/wff-cohort-14/users/me", {
    method: "PATCH",
    headers: {
      authorization: "e5843315-a034-497e-a50e-a3a3bb2355f1",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameInput,
      about: aboutInput,
    }),
  })
    .then((value) => {
      if (value.ok) {
        button.textContent = "Сохранено";
        return value.json();
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const createCardHttp = (nameCard, linkCard, button) => {
  button.textContent = "Сохранение...";
  return fetch("https://nomoreparties.co/v1/wff-cohort-14/cards", {
    method: "POST",
    headers: {
      authorization: "e5843315-a034-497e-a50e-a3a3bb2355f1",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameCard,
      link: linkCard,
    }),
  })
    .then((value) => {
      if (value.ok) {
        return value.json();
      }
    })
    .then((result) => {
      const cardElement = createCard(
        result,
        removeCard,
        openModalImage,
        handleLikeClick
      );
      placesList.prepend(cardElement);
      button.textContent = "Сохранено";
    });
};

const deleteCardHttp = (id) => {
  fetch(`https://nomoreparties.co/v1/wff-cohort-14/cards/${id}`, {
    method: "DELETE",
    headers: {
      authorization: "e5843315-a034-497e-a50e-a3a3bb2355f1",
    },
  });
};

const likeCardHttp = (id) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-14/cards/likes/${id}`, {
    method: "PUT",
    headers: {
      authorization: "e5843315-a034-497e-a50e-a3a3bb2355f1",
    },
  }).then((value) => {
    if (value.ok) {
      return value.json();
    }
  });
};

const deleteLikeCardHttp = (id) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-14/cards/likes/${id}`, {
    method: "DELETE",
    headers: {
      authorization: "e5843315-a034-497e-a50e-a3a3bb2355f1",
    },
  }).then((value) => {
    if (value.ok) {
      return value.json();
    }
  });
};

const editAvatarHttp = (data, button) => {
  button.textContent = "Сохранение...";
  return fetch("https://nomoreparties.co/v1/wff-cohort-14/users/me/avatar", {
    method: "PATCH",
    headers: {
      authorization: "e5843315-a034-497e-a50e-a3a3bb2355f1",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((value) => {
      if (value.ok) {
        button.textContent = "Сохранено";
        return value.json();
      }
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
