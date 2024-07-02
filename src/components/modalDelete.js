import { closeModal, openModal } from "./modal";

// VAR modalDeiete
const modalDelete = document.querySelector(".popup_type_delete");

// Открытие модального окна уточнения
function openModalDelete() {
  const modalDelete = document.querySelector(".popup_type_delete");
  openModal(modalDelete);
}

// Закрытие модального окна уточнения
function closeModalDelete() {
  const modalDelete = document.querySelector(".popup_type_delete");
  closeModal(modalDelete);
}

// Export
export { closeModalDelete, openModalDelete, modalDelete };
