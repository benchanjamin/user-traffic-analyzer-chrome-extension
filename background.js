// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
    if (info.status === 'complete') {
        // Get the URL of the tab that was updated.
        let url = new URL(tab.url);
        // hostname returns "developer.chrome.com" in
        // 'https://developer.chrome.com/docs/extensions/reference/webRequest/#type-OnCompletedOptions'
        let hostname = url.hostname

        // send to contentScript.js
        chrome.tabs.sendMessage(tabId, {
            type: "NEW",
            hostname: hostname,
        });

        // Log the URL to the console.
        console.log(hostname);
    }
});

// listen for web requests
chrome.webRequest.onCompleted.addListener(
    function(details) {
        // log the URL of the web request
        console.log(details);
    },
    {urls: ["<all_urls>"]}
);
