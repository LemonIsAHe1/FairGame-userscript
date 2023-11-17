// ==UserScript==
// @name         Play Sound on Button Click
// @namespace    http://your.namespace.here
// @version      0.2
// @description  Play a sound when a button is clickable
// @author       LemonIsAHe
// @match        https://fair.kaliburg.de/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Define the sound file URL
    const soundURL = 'https://cdn.discordapp.com/attachments/932894220509909033/1175215629758898296/337049__shinephoenixstormcrow__320655__rhodesmas__level-up-01.mp3';

    // Create an audio element
    const audioElement = new Audio(soundURL);

    // Function to play the sound
    function playSound() {
        audioElement.play();
    }

    // Function to add a click event listener to a button with a specific selector
    function addButtonClickListener(selector) {
        const button = document.querySelector(selector);
        if (button) {
            button.addEventListener('click', playSound);
        }
    }

    // Function to handle mutations and check for the presence of buttons
    function handleMutations(mutationsList) {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                addButtonClickListener('button[class*="rounded-md"][data-tutorial="bias"]');
                addButtonClickListener('button[class*="rounded-md"][data-tutorial="multi"]');
            }
        }
    }

    // Set up a MutationObserver to observe changes in the DOM
    const observer = new MutationObserver(handleMutations);

    // Start observing the target node for changes in child elements
    const targetNode = document.body;
    const observerConfig = { childList: true, subtree: true };
    observer.observe(targetNode, observerConfig);
})();
