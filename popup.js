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

function accessStorage(key) {
    return new Promise((resolve) => {
        chrome.storage.local.get(key, resolve)
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    const activeTab = await getActiveTabURL();
    console.log(activeTab.url);
    const url = new URL(activeTab.url);
    const hostname = url.hostname;
    // const hostnameStartTime = hostname + "startTime";

    document.getElementsByClassName("hostname")[0].innerHTML = hostname;

    let get = await accessStorage(hostname)
    let values = JSON.parse(get[hostname])

    document.getElementsByClassName("total-number-of-images")[0].innerHTML = "# of images: " + values.no_image
    document.getElementsByClassName("total-size-of-images")[0].innerHTML = "Size of images: " + values.size_image
    document.getElementsByClassName("cache-hit-percentage")[0].innerHTML = "Cache hit %: " + String(values.no_cache_hit / values.no_total)
    document.getElementsByClassName("total-size-of-all-traffic")[0].innerHTML = "Total size: " + values.size_total

    // Miscellaneous
    document.getElementsByClassName("total-number-of-main-frame-requests")[0].innerHTML = "# of main frames: " + values.no_main_frame
    document.getElementsByClassName("total-size-of-main-frame-requests")[0].innerHTML = "Total size of main frames: " + values.size_main_frame
    document.getElementsByClassName("total-number-of-sub-frame-requests")[0].innerHTML = "# of sub frames: " + values.no_sub_frame
    document.getElementsByClassName("total-size-of-sub-frame-requests")[0].innerHTML = "Total size of sub frames: " + values.size_sub_frame
    document.getElementsByClassName("total-number-of-stylesheet-requests")[0].innerHTML = "# of stylesheets: " + values.no_stylesheet
    document.getElementsByClassName("total-size-of-stylesheet-requests")[0].innerHTML = "Total size of stylesheets: " + values.size_stylesheet
    document.getElementsByClassName("total-number-of-javascript-requests")[0].innerHTML = "# of scripts: " + values.no_script
    document.getElementsByClassName("total-size-of-javascript-requests")[0].innerHTML = "Total size of scripts: " + values.size_script
    document.getElementsByClassName("total-number-of-font-requests")[0].innerHTML = "# of fonts: " + values.no_font
    document.getElementsByClassName("total-size-of-font-requests")[0].innerHTML = "Total size of fonts: " + values.size_font
    document.getElementsByClassName("total-number-of-object-requests")[0].innerHTML = "# of objects: " + values.no_object
    document.getElementsByClassName("total-size-of-object-requests")[0].innerHTML = "Total size of objects: " + values.size_object
    document.getElementsByClassName("total-number-of-xmlhttprequest-requests")[0].innerHTML = "# of xml http requests: " + values.no_xmlhttprequest
    document.getElementsByClassName("total-size-of-xmlhttprequest-requests")[0].innerHTML = "Total size of xml http requests: " + values.size_xmlhttprequest
    document.getElementsByClassName("total-number-of-ping-requests")[0].innerHTML = "# of pings: " + values.no_ping
    document.getElementsByClassName("total-size-of-ping-requests")[0].innerHTML = "Total size of pings: " + values.size_ping
    document.getElementsByClassName("total-number-of-csp-report-requests")[0].innerHTML = "# of csp reports: " + values.no_csp_report
    document.getElementsByClassName("total-size-of-csp-report-requests")[0].innerHTML = "Total size of csp reports: " + values.size_csp_report
    document.getElementsByClassName("total-number-of-media-requests")[0].innerHTML = "# of media: " + values.no_media
    document.getElementsByClassName("total-size-of-media-requests")[0].innerHTML = "Total size of media: " + values.size_media
    document.getElementsByClassName("total-number-of-websocket-requests")[0].innerHTML = "# of websockets: " + values.no_websocket
    document.getElementsByClassName("total-size-of-websocket-requests")[0].innerHTML = "Total size of websockets: " + values.size_websocket
    document.getElementsByClassName("total-number-of-other-requests")[0].innerHTML = "# of other: " + values.no_other
    document.getElementsByClassName("total-size-of-other-requests")[0].innerHTML = "Total size of other: " + values.size_other

    // await startTimer(hostnameStartTime)
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
    let currentHostnameElapsedTime = url.hostname + "elapsedTime"
    // set date as current one if not in storage dict
    const currentDate = new Date().toISOString();

    // Initializer
    chrome.storage.local.get([currentHostnameStartTime], function (result) {
        let profile = result[currentHostnameStartTime];
        if (typeof profile === "undefined") {
            chrome.storage.local.set({[currentHostnameStartTime]: currentDate})
            chrome.storage.local.set({[currentHostnameElapsedTime]: '0'})
        } else {
            // Profile exists in storage
        }
    });

    while (currentHostnameStartTime === hostnameStartTime) {
        let accumulatedSeconds;
        chrome.storage.local.get([currentHostnameElapsedTime]).then((result) => {
            console.log("Value currently is " + result[currentHostnameElapsedTime]);
            accumulatedSeconds = parseInt(result[currentHostnameElapsedTime])
        });

        chrome.storage.local.get([currentHostnameElapsedTime]).then((result) => {
            console.log("Value currently is " + result[currentHostnameElapsedTime]);
        });
    }
}
