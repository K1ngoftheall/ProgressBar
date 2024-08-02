const popupStyleEditElement = document.querySelector(".popup_style"); // Попап выбора стиля

const popupStyleOpenElement = document.querySelector(".progress__style-btn"); //Кнопка открытия

const popupSubmitElement = popupStyleEditElement.querySelector(".form__submit"); //кнопка сохранения цветов

const formProfilePopup = popupStyleEditElement.querySelector(".form"); //Формочка

const background = document.getElementById("progress__circle"); //Фон круга
const profileStatus = document.getElementById("progress-arc"); // Основной цвет круга

const inputBackgroundColor = popupStyleEditElement.querySelector(
  ".form__input_type_background"
); //Инпуты для изменения цвета
const inputCircleColor = popupStyleEditElement.querySelector(
  ".form__input_type_circle"
);

const openPopup = function (popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keyup", handleKeyUpEscape);
}; //общая функция открытия попапа

const closePopup = function (popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keyup", handleKeyUpEscape);
}; //общая функция закрытия попапа

const handleCloseByClick = (evt) => {
  //оверлейчик

  if (
    evt.target == evt.currentTarget ||
    evt.target.classList.contains("popup__close-img")
  ) {
    closePopup(evt.currentTarget);
  }
};

const handleKeyUpEscape = (evt) => {
  //Закрытие попапа нажатием на Esc

  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
};

function openEditProfile() {
  //Присвоение значений и открытие попапа стилей

  openPopup(popupStyleEditElement);
  inputBackgroundColor.value = background.getAttribute("stroke");
  inputCircleColor.value = profileStatus.getAttribute("stroke");
}

const handleSubmitProfileForm = function (event) {
  //Функция присвоения значений из попапа в круг

  event.preventDefault();
  background.setAttribute("stroke", inputBackgroundColor.value);
  profileStatus.setAttribute("stroke", inputCircleColor.value);
  closePopup(popupStyleEditElement);
};

popupStyleEditElement.addEventListener("click", handleCloseByClick);
popupStyleOpenElement.addEventListener("click", openEditProfile);
formProfilePopup.addEventListener("submit", handleSubmitProfileForm);
