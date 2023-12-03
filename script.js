const tan = document.getElementById("tan");
const pink = document.getElementById("pink");
const showCoords = document.getElementById("showCoords");
const state = document.getElementById("state");
const irises = document.getElementsByClassName("iris");

for (let i = 0; i < irises.length; i++) {
  // подія натискання миші
  irises[i].addEventListener("mousedown", go);
}

// вплив на подію натискання миші
function go(event) {
  // Ірис, на якому сталася подія натискання миші
  const flower = document.getElementById(event.target.id);
  const breed = flower.dataset.breed;
  const coords = getCoords(flower);
  // shiftX - зсув курсора від лівого краю картинки
  const shiftX = event.pageX - coords.left;
  // shiftY - зсув курсора від верхнього краю картинки
  const shiftY = event.pageY - coords.top;
  // функція переміщення об'єкта під координати курсору
  function moveAt(event) {
    // shiftX и shiftY - зсув курсора щодо верхнього лівого кута картинки
    let left = event.pageX - shiftX;
    let top = event.pageY - shiftY;
    flower.style.left = left + "px";
    flower.style.top = top + "px";
    // Координати зображення щодо вікна записуємо в полі showCoords
    showCoords.innerHTML = `x: ${flower.style.left}, y: ${flower.style.top}`;
    // перевірка, чи попадає на поле tan квітка з координатами left, top
    if (onField(tan, left, top)) {
      if (breed == "tan") {
        tan.style.border = "2px solid green";
        pink.style.border = "none";
      } else {
        tan.style.border = "2px solid red";
        pink.style.border = "none";
      }
    }
    // перевірка, чи потрапляє на поле pink квітка з координатами left, top
    if (onField(pink, left, top)) {
      if (breed == "pink") {
        pink.style.border = "2px solid green";
        tan.style.border = "none";
      } else {
        pink.style.border = "2px solid red";
        tan.style.border = "none";
      }
    }
  }
  // подія переміщення миші
  document.onmousemove = function (event) {
    moveAt(event);
  };
  // подія відпускання миші
  flower.onmouseup = function (event) {
    res(event);
  };
  function res(event) {
    tan.style.border = "none";
    pink.style.border = "none";
    // отримуємо координати квітки
    const left = parseInt(flower.style.left);
    const top = parseInt(flower.style.top);
    // перевірка, чи потрапляє на поле tan квітка з координатами left, top
    if (onField(tan, left, top)) {
      state.innerHTML =
        flower.id + " сорт " + breed + " відпускаємо на поле tan!"; // записуємо у поле state
    }
    // перевірка, чи потрапляє на поле pink квітка з координатами left, top
    if (onField(pink, left, top)) {
      state.innerHTML =
        flower.id + " сорт " + breed + " відпускаємо на поле pink!";
    }
    document.onmousemove = null;
    flower.onmouseup = null;
  }
  flower.ondragstart = function () {
    return false; // скасування drag and drop браузера
  };
}

//проверка, попадает ли на поле f цветок с координатами left, top
function onField(f, left, top) {
  let field = getCoords(f); // получили координаты top и left, а также width и height текущего поля f

  if (
    left > field.left &&
    left < field.left + field.width &&
    top > field.top &&
    top < field.top + field.height &&
    (f == tan || f == pink)
  ) {
    return true;
  }
  return false;
}

function getCoords(elem) {
  const box = elem.getBoundingClientRect();
  // scrollY та scrollX повертають скролювання вікна в пікселях
  return {
    height: box.height,
    width: box.width,
    top: box.top + scrollY,
    left: box.left + scrollX,
  };
}
