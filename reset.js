import {getActiveTabURL} from "./utils.js";
import {reset} from "./popup.js";

const activeTab = await getActiveTabURL();
console.log(activeTab.url);
const url = new URL(activeTab.url);
const hostname = url.hostname;
const button = document.getElementsByClassName("reset-button")[0];
button.addEventListener("click", function() {reset(hostname);});
