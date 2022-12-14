chrome.tabs.onUpdated.addListener((tabId, tab) => {
    if(tab.url) {
        // finds the site Name. Example: https://cos316.princeton.edu/final.html becomes cos316.princeton.edu
        const siteName = tab.url.split("//")[1].split("/")[0];

        chrome.tabs.sendMessage(tabId, {
            type: "NEW",
            siteName: siteName
        });
    }
});