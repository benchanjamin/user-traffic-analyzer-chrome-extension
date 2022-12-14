import {getActiveTabURL} from "./utils.js";

// adding a new bookmark row to the popup
const addNewBookmark = () => {
};

const viewBookmarks = () => {
};

const onPlay = e => {
};

const onDelete = e => {
};

const setBookmarkAttributes = () => {
};

function getURLTimer(key) {
    return new Promise((resolve) => {
        chrome.storage.local.get(key, resolve)
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    const activeTab = await getActiveTabURL();
    console.log(activeTab.url);
    const url = new URL(activeTab.url);
    const hostname = url.hostname;
    const hostname_timer = hostname + "-timer";

    document.getElementsByClassName("hostname")[0].innerHTML = hostname;

    setInterval(startTimer.bind(hostname_timer), 1000);
    let timer = getURLTimer(hostname_timer)[hostname_timer];
    console.log(timer);
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const getTime = t => {
    let date = new Date(0);
    date.setSeconds(t);

    return date.toISOString().substr(11, 8);
};

 async function startTimer(hostname) {
    let defaultValue = new Date().getTime();


    let currentHostnameTimer = hostname;
    while (hostname === currentHostnameTimer) {
        // set date as current one if not in storage dict
        const defaultValue = new Date()
        chrome.storage.sync.get({hostname: defaultValue}, function (data) {
            // data.links will be either the stored value, or defaultValue if nothing is set
            chrome.storage.sync.set({hostname: data.links}, function () {
                // The value is now stored, so you don't have to do this again

            });
        });

        // else if in dict

        const activeTab = await getActiveTabURL();
        let url = new URL(activeTab.url);
        currentHostnameTimer = url.hostname + "-timer";
        sleep(500)
    }
}
