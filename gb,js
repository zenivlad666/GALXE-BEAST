// ==UserScript==
// @name         Insert JS to Console on Ctrl+Q
// @namespace    http://tampermonkey.net/
// @version      1.5
// @description  Inserts and executes the specified code in the console upon pressing Ctrl + Q
// @author       Your Name
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    console.log('TamperMonkey script loaded');

    // Отслеживаем комбинацию Ctrl+Q
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'q') {
            e.preventDefault();
            console.log('Ctrl+Q pressed, executing script...');
            processElements();
        }
    });

    // Селекторы для элементов
    const selectors = {
        elementsToClick: 'button.bg-primary:not([disabled]).w-full',
        refreshButtonSvgClass: 'div.flex.gap-1.items-center span svg',
        waitForClass: '.text-size-14.font-bold',
        successIconClass: 'svg[data-state="closed"] .ml-4.flex.gap-4.items-center',
        claimButtonSelector: 'button.bg-primary:not([disabled]).w-full',
        closeButtonSelector: 'button.absolute.rounded-sm.opacity-70.right-5.top-6.sm\\:right-9.sm\\:top-9'
    };

    // Универсальная функция для клика по элементу
    function clickElement(selector) {
        const element = document.querySelector(selector);
        if (element) {
            var event = new MouseEvent('click', { view: window, bubbles: true, cancelable: true });
            element.dispatchEvent(event);
            console.log(`Element clicked: ${selector}`);
        } else {
            console.log(`Element not found: ${selector}`);
        }
    }

    // Закрытие попапа
    function closePopup() {
        clickElement(selectors.closeButtonSelector);
    }

    // Проверка кнопки Claim
    function checkClaimButton() {
        const claimButton = document.querySelector(selectors.claimButtonSelector);
        if (claimButton) {
            clickElement(selectors.claimButtonSelector);
            console.log('Claim button clicked');
            setTimeout(closePopup, 2000);
            return true;
        }
        return false;
    }

    // Проверка условий и повторный запуск
    function checkConditionsAndRetry() {
        const elementsWaiting = document.querySelectorAll(selectors.waitForClass),
              successIcons = document.querySelectorAll(selectors.successIconClass),
              elementsToClick = document.querySelectorAll(selectors.elementsToClick);

        if (elementsWaiting.length > 0 || successIcons.length !== elementsToClick.length) {
            console.log('Retrying in 60 seconds...');
            setTimeout(processElements, 60000);
        } else {
            checkClaimButton();
        }
    }

    // Основная функция для обработки элементов
    function processElements() {
        console.log('Processing elements...');
        if (!checkClaimButton()) {
            document.querySelectorAll(selectors.elementsToClick).forEach(clickElement);
            setTimeout(() => {
                document.querySelectorAll(selectors.refreshButtonSvgClass).forEach(clickElement);
                setTimeout(checkConditionsAndRetry, 2000);
            }, 2000);
        }
    }
})();
