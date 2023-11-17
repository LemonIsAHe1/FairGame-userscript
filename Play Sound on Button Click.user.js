// ==UserScript==
// @name         Play Sound on Button Click
// @namespace    http://your.namespace.here
// @version      0.1
// @description  Play a sound when a button is clickable
// @author       LemonIsAHe
// @match        https://fair.kaliburg.de/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Define the sound file URL
    const soundURL = 'https://www.soundurl.com/your-sound-file.mp3'; // Replace with your sound file URL

    // Create an audio element
    const audioElement = new Audio(soundURL);

    // Function to play the sound
    function playSound() {
        audioElement.play();
    }

    // Add a click event listener to the button
    function addButtonClickListener() {
    const button = document.querySelector('.rounded-md.border-solid.border-1.h-8.px-2.bg-button-bg.text-button-text.border-button-border.disabled:select-none.disabled:opacity-50.disabled:grayscale.disabled:pointer-events-none.hover:bg-button-bg-hover.hover:text-button-text-hover.w-full.rounded-r-none.whitespace-nowrap[data-tutorial="multi"]');
    if (button) {
        button.addEventListener('click', playSound);
    }
}

    // Call the function to add the click event listener when the DOM is ready
    document.addEventListener('DOMContentLoaded', addButtonClickListener);
})();
