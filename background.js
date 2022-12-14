chrome.devtools.network.onNavigated.addListener((url) => {
    chrome.devtools.network.getHAR((log) => {
        console.log(log)
    })
});