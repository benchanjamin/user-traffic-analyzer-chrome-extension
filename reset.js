import {getActiveTabURL} from "./utils.js";
import {reset} from "./popup.js";

const activeTab = await getActiveTabURL();
console.log(activeTab.url);
const url = new URL(activeTab.url);
const hostname = url.hostname;
const resetHostnameButton = document.getElementsByClassName("reset-hostname-button")[0];
resetHostnameButton.addEventListener("click", async function () {
    const activeTab = await getActiveTabURL();
    const url = new URL(activeTab.url);
    const hostname = url.hostname;
    reset(hostname);
});
const resetAllButton = document.getElementsByClassName("reset-all-button")[0];
resetAllButton.addEventListener("click", async function () {
        const activeTab = await getActiveTabURL();
        const url = new URL(activeTab.url);
        const hostname = url.hostname;
        chrome.storage.local.clear(function () {
            var error = chrome.runtime.lastError;
            if (error) {
                console.error(error);
            }
            // do something more
        })
        reset(hostname)
    }
);
