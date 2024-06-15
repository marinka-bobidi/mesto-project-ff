function avatarFormSubmit(
  evt,
  imageProfile,
  modalAvatar,
  nameInputAvatar,
  Http,
  closeFunction
) {
  evt.preventDefault();
  var newAvatarData = {
    avatar: nameInputAvatar.value,
  };
  var avatarButtonSubmit = modalAvatar
    .querySelector(".popup__form")
    .querySelector(".popup__button");
  avatarButtonSubmit.textContent = "Загрузка...";
  Http(newAvatarData)
    .then(() => {
      imageProfile.src = nameInputAvatar.value;
      closeFunction(modalAvatar);
      avatarButtonSubmit.textContent = "Сохранить";
      evt.target.reset();
    })
    .catch((error) => {
      console.log(error);
    });
}

export { avatarFormSubmit };
