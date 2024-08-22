new Swiper('.image-slider',{
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  
// slideToClickedSlide: true,
 autoHeight: true,
 spaceBetween: 16,
 freeMode: true,
 slidesPerView:1.25,
 breakpointsBase: 'container',

});

var button = document.querySelector('.button');
var imageList = document.querySelector('.image');
var imageElements = imageList.querySelectorAll('.image__size');
var originalImageCount = 6;  // Исходное количество элементов, отображаемых до 768px

var isExpanded = false;
var clonedElements = []; // Сохранение ссылок на клонированные элементы

button.addEventListener('click', function() {
  isExpanded = !isExpanded;
  
  if (isExpanded) {
    cloneImages();
    showImages();
    replaceButtonImage('images/close.svg');
  } else {
    hideImages();
    replaceButtonImage('images/button.svg');
  }
});

function cloneImages() {
  var cloneElements;
  
  if (window.innerWidth >= 768 && window.innerWidth <= 1119) {
    cloneElements = Array.from(imageElements).slice(0, 5);
  } else if (window.innerWidth >= 1120) {
    cloneElements = Array.from(imageElements).slice(0, 3);
  }
  
  cloneElements.forEach(function(element) {
    var clonedElement = element.cloneNode(true);
    clonedElement.classList.add('cloned'); // Добавляем класс "cloned"
    imageList.appendChild(clonedElement);
    clonedElements.push(clonedElement); // Сохраняем ссылку на клонированный элемент
  });
}

function showImages() {
  clonedElements.forEach(function(element) {
    element.style.display = 'flex';
  });
}

function hideImages() {
  clonedElements.forEach(function(element) {
    element.style.display = 'none';
    element.remove();
  });
  clonedElements = []; // Очищаем массив ссылок на клонированные элементы
}

function replaceButtonImage(newImagePath) {
  var oldImage = button.querySelector('img');
  var newImage = document.createElement('img');
  
  newImage.src = newImagePath;
  newImage.width = oldImage.width;
  newImage.height = oldImage.height;
  
  button.replaceChild(newImage, oldImage);
}

// Обработчик события изменения размера окна
window.addEventListener('resize', function() {
  if (isExpanded) {
    hideImages();
    cloneImages(); // Снова клонируем элементы при изменении размера окна
    showImages();
  }
});

// Вызов функций showImages() и hideImages() при загрузке страницы для правильного отображения элементов
if (window.innerWidth >= 768 && window.innerWidth <= 1119) {
  showImages();
} else if (window.innerWidth >= 1120) {
  hideImages();
}