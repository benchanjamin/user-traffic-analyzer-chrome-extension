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

document.addEventListener("DOMContentLoaded", async () => {
    const activeTab = await getActiveTabURL();
    const url = new URL(activeTab.url);
    const hostname_timer = url.hostname + "-timer"

    document.getElementsByClassName("hostname")[0].innerHTML = hostname;

    setInterval(startTimer.bind(hostname_timer), 1000);

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
    const activeTab = await getActiveTabURL();
    let url = new URL(activeTab.url);
    let currentHostnameTimer = url.hostname + "-timer";
    // set date as current one if not in storage dict
    const defaultValue = new Date();
    chrome.storage.sync.get({[currentHostnameTimer]: defaultValue},
        function (data) {
            chrome.storage.sync.set({currentHostnameTimer: data.currentHostnameTimer});
        }
    );


    chrome.storage.sync.set({[currentHostnameTimer]: JSON.stringify()})

    // else if in dict


}
