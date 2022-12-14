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
    const hostname = url.hostname

    document.getElementsByClassName("hostname")[0].innerHTML = hostname;

    setInterval(startTimer.bind(hostname), 1000);

});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const getTime = t => {
    let date = new Date(0);
    date.setSeconds(t);

    return date.toISOString().substr(11, 8);
};

 function startTimer(hostname) {
    let defaultValue = new Date().getTime();


    let currentHostname = hostname;
    while (hostname === currentHostname) {
        // set date as current one if not in storage dict
        const defaultValue = new Date()
        chrome.storage.sync.get({hostname: defaultValue}, function (data) {
            // data.links will be either the stored value, or defaultValue if nothing is set
            chrome.storage.sync.set({hostname: data.links}, function () {
                // The value is now stored, so you don't have to do this again

            });
        });

        // else if in dict

        const activeTab = getActiveTabURL();
        let url = new URL(activeTab.url);
        currentHostname = url.hostname;
        sleep(500)
    }
}
