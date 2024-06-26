const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// Event handler for the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    //Store the triggered events
    windoww.deferredPrompt = event;
    //Remove the hidden class from the button
    butInstall.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;

    if (!promptEvent){
        return;
    }

    //Show prompt
    promptEvent.prompt();

    //Reset the deferred prompt variable, it can only be used once.
    window.deferredPrompt = null;


    butInstall.classList.toggle('hidden', true);
});

window.addEventListener('appinstalled', (event) => {
    console.log('App installed!');
    window.deferredPrompt = null;
});
