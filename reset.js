import {getActiveTabURL} from "./utils.js";
import {reset} from "./popup.js";

const activeTab = await getActiveTabURL();
console.log(activeTab.url);
const url = new URL(activeTab.url);
const hostname = url.hostname;
const resetHostnameButton = document.getElementsByClassName("reset-hostname-button")[0];
resetHostnameButton.addEventListener("click", function () {
    reset(hostname);
});
const resetAllButton = document.getElementsByClassName("reset-all-button")[0];
resetAllButton.addEventListener("click",
    async function enumStorage() {
        const all = await chrome.storage.local.get();
        for (const [key, val] of Object.entries(all)) {
            reset(key);
            console.log(key)
        }
    });
