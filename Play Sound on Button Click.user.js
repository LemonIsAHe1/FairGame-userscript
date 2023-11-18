// ==UserScript==
// @name         Play Sound on Button Click with Movable GUI
// @namespace    http://your.namespace.here
// @version      0.7
// @description  Play a sound when a button is clickable with GUI
// @author       Your Name
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

    // Function to handle mutations and check for changes in button attributes
    function handleMutations(mutationsList) {
        for (const mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'disabled') {
                const targetButton = mutation.target;
                if (!targetButton.disabled) {
                    // Button is no longer disabled, add the click event listener
                    targetButton.addEventListener('click', playSound);
                } else {
                    // Button is disabled, remove the click event listener if it was added previously
                    targetButton.removeEventListener('click', playSound);
                }
            }
        }
    }

    // Set up a MutationObserver to observe changes in the DOM
    const observer = new MutationObserver(handleMutations);

    // Start observing the target node for changes in attributes
    const targetNode = document.body;
    const observerConfig = { attributes: true, attributeFilter: ['disabled'], subtree: true };
    observer.observe(targetNode, observerConfig);

    // Create GUI elements
    const guiContainer = document.createElement('div');
    guiContainer.style.position = 'fixed';
    guiContainer.style.top = '20px';
    guiContainer.style.left = '20px';
    guiContainer.style.background = 'rgba(255, 255, 255, 0.8)';
    guiContainer.style.padding = '10px';
    guiContainer.style.borderRadius = '8px';
    guiContainer.style.cursor = 'move';
    guiContainer.draggable = true;
    guiContainer.style.display = 'none'; // Initially hide the GUI
    guiContainer.style.zIndex = '9999'; // Set a high z-index value

    const guiTitle = document.createElement('div');
    guiTitle.innerHTML = '<strong>Sound Player</strong>';
    guiTitle.style.marginBottom = '8px';

    const closeButton = document.createElement('span');
    closeButton.innerHTML = '&times;';
    closeButton.style.float = 'right';
    closeButton.style.cursor = 'pointer';
    closeButton.addEventListener('click', () => {
        guiContainer.style.display = 'none'; // Hide the GUI on close
    });

    guiTitle.appendChild(closeButton);
    guiContainer.appendChild(guiTitle);

    const statusContainer = document.createElement('div');
    statusContainer.style.marginBottom = '8px';

    const statusText = document.createElement('div');
    statusText.style.fontWeight = 'bold';

    statusContainer.appendChild(statusText);
    guiContainer.appendChild(statusContainer);

    const refreshContainer = document.createElement('div');
    refreshContainer.style.marginBottom = '8px';

    const refreshLabel = document.createElement('label');
    refreshLabel.innerHTML = 'Refresh Time (seconds): ';

    const refreshSlider = document.createElement('input');
    refreshSlider.type = 'range';
    refreshSlider.min = '1';
    refreshSlider.max = '60';
    refreshSlider.value = '5';
    refreshSlider.addEventListener('input', () => {
        clearInterval(refreshInterval);
        refreshInterval = setInterval(updateStatus, refreshSlider.value * 1000);
    });

    refreshLabel.appendChild(refreshSlider);
    refreshContainer.appendChild(refreshLabel);
    guiContainer.appendChild(refreshContainer);

    document.body.appendChild(guiContainer);

    // Make the GUI movable
    let isDragging = false;
    let offsetX, offsetY;

    guiContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - guiContainer.getBoundingClientRect().left;
        offsetY = e.clientY - guiContainer.getBoundingClientRect().top;
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const x = e.clientX - offsetX;
            const y = e.clientY - offsetY;
            guiContainer.style.left = x + 'px';
            guiContainer.style.top = y + 'px';
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    // Update the status information and play sound if a button is enabled
    function updateStatus() {
        const biasButton = document.querySelector('button[class*="rounded-md"][data-tutorial="bias"]');
        const multiButton = document.querySelector('button[class*="rounded-md"][data-tutorial="multi"]');

        const biasStatus = biasButton ? (biasButton.disabled ? 'Disabled' : 'Enabled') : 'Not Found';
        const multiStatus = multiButton ? (multiButton.disabled ? 'Disabled' : 'Enabled') : 'Not Found';

        statusText.innerHTML = `Bias Button: ${biasStatus}<br>Multi Button: ${multiStatus}`;
    }

    // Initial status update
    updateStatus();

    // Set up a refresh interval
    let refreshInterval = setInterval(updateStatus, refreshSlider.value * 1000); // Update every 5 seconds initially
})();
