// content.js
(function inject() {
    try {
        const script = document.createElement('script');
        script.src = chrome.runtime.getURL('inpage.js');
        script.async = false; // ensure execution order
        (document.head || document.documentElement).appendChild(script);
        script.remove();
    } catch (e) {
        console.warn('[Sprinkles] Injection failed:', e);
    }
})();


// Bridge in-page -> extension
window.addEventListener('message', (event) => {
    if (event.source !== window) return; // only accept from same page
    const msg = event.data;
    if (!msg || msg.__xhr_captor__ !== true) return;
    // Forward to background
    chrome.runtime.sendMessage(msg).catch(() => {});
});