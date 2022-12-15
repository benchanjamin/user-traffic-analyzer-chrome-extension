import {getHostnameAndSetValues, getActiveTabAndSetValues} from "./popup.js";
import {setIntervalId} from "./popup.js";

async function enumStorageForAllHostnames() {
    const all = await chrome.storage.local.get();
    clearInterval(setIntervalId)
    const allHostnamesSelect = document.getElementById('all-hostnames-select');
    allHostnamesSelect.addEventListener("change", (event) => {
        getHostnameAndSetValues(event.target.value);
    })
    for (const [key, val] of Object.entries(all)) {
        allHostnamesSelect.options.add(new Option(key, key))
    }
    // allHostnamesSelect
}

enumStorageForAllHostnames();
const backButton = document.getElementById("back-button");
backButton.addEventListener("click", (event) => setInterval(getActiveTabAndSetValues, 200))
