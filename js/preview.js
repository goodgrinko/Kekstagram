'use strict';

/**
 * Модуль для отрисовки увеличенного изображения
 */
(function () {
  window.evt = {
    /**
     * Выполняет заданное действие при нажатии Esc или Enter
     * @param {*} evt - отслеживаемое событие по клавишам Esc или Enter
     * @param {Object} action - действие, которое необходимо выполнить
     */
    isKeyEvent: function (evt, action) {
      if (evt.keyCode === window.data.ESC_KEYCODE) {
        action();
      } else if (evt.keyCode === window.data.ENTER_KEYCODE) {
        action();
      }
    }
  };
  // Показ/скрытие картинки в галерее
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var galleryOverlayClose = document.querySelector('.gallery-overlay-close');
  var pictures = document.querySelectorAll('.picture');

  /**
   * Закрытие окна при нажатии Esc или Enter
   * @param {*} evt - отслеживаемое событие по клавишам Esc или Enter
   */
  var closeKeyHandler = function (evt) {
    window.evt.isKeyEvent(evt, closeOverlay);
  };

  /**
   * Показывает увеличенное выбранное изображение
   * @param {*} evt отслеживаемое событие
   */
  var showOverlay = function (evt) {
    evt.preventDefault();
    var clickedElement = evt.currentTarget;
    galleryOverlay.querySelector('img.gallery-overlay-image').src = clickedElement.querySelector('img').src;
    galleryOverlay.querySelector('.likes-count').textContent = clickedElement.querySelector('.picture-likes').textContent;
    galleryOverlay.querySelector('.comments-count').textContent = clickedElement.querySelector('.picture-comments').textContent;
    galleryOverlay.classList.remove('hidden');
    document.addEventListener('keydown', closeKeyHandler);
    galleryOverlayClose.focus();
  };

  /**
   * Закрытие окна с увеличенным фото
   */
  var closeOverlay = function () {
    galleryOverlay.classList.add('hidden');
    document.removeEventListener('keydown', closeKeyHandler);
  };
  // Цикл, который добавляет отслеживание клика на каждое фото
  for (var i = 0; i < pictures.length; i++) {
    pictures[i].addEventListener('click', showOverlay);
  }

  galleryOverlayClose.addEventListener('click', closeOverlay);
  galleryOverlayClose.addEventListener('keydown', closeKeyHandler);

})();
