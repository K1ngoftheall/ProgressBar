const progressBar = document.getElementById("progress__bar"); // Контейнер с кругом-шкалой
const progressCircle = document.getElementById("progress-arc"); // Полилиния
const progressSvg = document.getElementById("progress__svg"); //
const valueInput = document.getElementById("value-input"); // инпут для круга-шкалы
const animateCheckbox = document.getElementById("animate-check"); // свич для включения анимации
const error = document.getElementById("value-input-error"); // мини-валидация
const hideBtn = document.getElementById("hide-btn"); //

function describeArc(centerX, centerY, radius, startAngle, endAngle) { //Функция преобразования полилинии в нужную форму
  const start = {
    x: centerX + radius * Math.cos(((endAngle - 90) * Math.PI) / 180.0),
    y: centerY + radius * Math.sin(((endAngle - 90) * Math.PI) / 180.0),
  };

  const end = {
    x: centerX + radius * Math.cos(((startAngle - 90) * Math.PI) / 180.0),
    y: centerY + radius * Math.sin(((startAngle - 90) * Math.PI) / 180.0),
  };

  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  const d = [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");

  return d;
}

function updateProgress() { //Функция для записи value в круг
  const value = parseInt(valueInput.value, 10);

  if (!valueInput.validity.valid) {
    valueInput.classList.add("border");
    error.textContent = "value is invalid";

    return;
  } else {
    valueInput.classList.remove("border");
    valueInput.setAttribute("border-color", "#ccc");
    error.textContent = "";
  }

  const endAngle = (value / 100) * 360;
  const d = describeArc(50, 50, 45, 0, endAngle === 360 ? 359.99 : endAngle);

  progressCircle.setAttribute("d", d);
}

function toggleAnimation() { // Функция для активации анимации
  toggleActivity(this);
  if (this.classList.contains("active")) {
    progressSvg.classList.add("animated");
  } else {
    progressSvg.classList.remove("animated");
    void progressSvg.offsetWidth;
  }
}
function toggleActivity(checkbox) { // Функция для смены состояния свича
  if (!checkbox.classList.contains("active")) {
    checkbox.classList.add("active");
  } else {
    checkbox.classList.remove("active");
  }
}
function myFunction() {
  toggleActivity(hideBtn);
  document.getElementById("Dropdown").classList.toggle("show");
}

animateCheckbox.addEventListener("click", toggleAnimation);
valueInput.addEventListener("input", updateProgress);

/* Когда пользователь нажимает на кнопку,
переключение между скрытием и отображением раскрывающегося содержимого */
