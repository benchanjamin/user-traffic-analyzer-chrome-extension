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

async function getURLTimer(key) {
    return new Promise((resolve) => {
        chrome.storage.local.get(key, resolve)
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    const activeTab = await getActiveTabURL();
    console.log(activeTab.url);
    const url = new URL(activeTab.url);
    const hostname = url.hostname;
    const hostnameStartTime = hostname + "startTime";

    document.getElementsByClassName("hostname")[0].innerHTML = hostname;

    setInterval(startTimer.bind(hostnameStartTime), 1000);
    let timer = await getURLTimer(hostnameStartTime)[hostnameStartTime];
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

async function startTimer(hostnameStartTime) {
    const activeTab = await getActiveTabURL();
    let url = new URL(activeTab.url);
    let currentHostnameStartTime = url.hostname + "startTime";
    // set date as current one if not in storage dict
    const currentDate = new Date().toISOString();

    chrome.storage.local.get([currentHostnameStartTime], function(result) {
        let profile = result[currentHostnameStartTime];
        if (typeof profile === "undefined") {
            chrome.storage.local.set({[currentHostnameStartTime] : currentDate})
        } else {
            // Profile exists in storage
        }
    });

    // let timer = await getURLTimer(currentHostnameStartTime)[currentHostnameStartTime];
    chrome.storage.local.get([currentHostnameStartTime]).then((result) => {
        console.log("Value currently is " + result[currentHostnameStartTime]);
    });
}
