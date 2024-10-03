// ==UserScript==
// @name         Galxe Script Loader
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Запуск внешнего скрипта при нажатии Ctrl + Q на сайте galxe.com
// @author       Ваше имя
// @match        *://*.galxe.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Функция для загрузки и выполнения внешнего скрипта
    function loadExternalScript() {
        const scriptUrl = 'https://raw.githubusercontent.com/zenivlad666/GALXE-BEAST/refs/heads/main/gb.js';
        const script = document.createElement('script');
        script.src = scriptUrl;
        script.onload = () => {
            console.log('Внешний скрипт успешно загружен и выполнен.');
        };
        script.onerror = () => {
            console.error('Ошибка при загрузке внешнего скрипта.');
        };
        document.body.appendChild(script);
    }

    // Слушаем событие нажатия клавиш Ctrl + Q
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'q') {
            e.preventDefault();
            loadExternalScript();
        }
    });
})();
