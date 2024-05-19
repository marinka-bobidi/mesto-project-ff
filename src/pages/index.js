import "../pages/index.css";
import { cardTemplate, createCard, removeCard } from "../components/card.js";

// Получите модальное окно
const modal = document.querySelector(".popup");

// Получите кнопку, которая закрывает модальное окно
const closeButton = modal.querySelector(".popup__close");

// Получите кнопки, которые открывают модальное окно
const openButtonEdit = document.querySelector(".profile__edit-button");
const openButtonAdd = document.querySelector(".profile__add-button");

// Функция для открытия модального окна
function openModal() {
  modal.style.display = "block";
}

// Функция для закрытия модального окна
function closeModal() {
  modal.style.display = "none";
}

// Добавьте обработчики событий для кнопок открытия
openButtonEdit.addEventListener("click", openModal);
openButtonAdd.addEventListener("click", openModal);

// Добавьте обработчик событий для кнопки закрытия
closeButton.addEventListener("click", closeModal);
