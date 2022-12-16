import {getActiveTabURL} from "./utils.js";

export let setIntervalId;

function accessStorage(key) {
    return new Promise((resolve) => {
        chrome.storage.local.get(key, resolve)
    });
}

export async function getActiveTabAndSetValues() {
    const activeTab = await getActiveTabURL();
    console.log(activeTab.url);
    const url = new URL(activeTab.url);
    const hostname = url.hostname;
    let get = await accessStorage(hostname)
    let values = JSON.parse(get[hostname])
    display(values, hostname);
}

export async function getHostnameAndSetValues(hostname) {
    let get = await accessStorage(hostname)
    let values = JSON.parse(get[hostname])
    display(values, hostname);
}

document.addEventListener("DOMContentLoaded", async () => {
    setIntervalId = setInterval(getActiveTabAndSetValues, 200);
});

export function reset(hostname) {
    let oldValues = {
        no_visit: 0,
        no_main_frame: 0,
        size_main_frame: 0,
        no_sub_frame: 0,
        size_sub_frame: 0,
        no_stylesheet: 0,
        size_stylesheet: 0,
        no_script: 0,
        size_script: 0,
        no_image: 0,
        size_image: 0,
        no_font: 0,
        size_font: 0,
        no_object: 0,
        size_object: 0,
        no_xmlhttprequest: 0,
        size_xmlhttprequest: 0,
        no_ping: 0,
        size_ping: 0,
        no_csp_report: 0,
        size_csp_report: 0,
        no_media: 0,
        size_media: 0,
        no_websocket: 0,
        size_websocket: 0,
        no_other: 0,
        size_other: 0,
        no_cache_hit: 0,
        no_total: 0,
        size_total: 0
    }
    // write to storage
    chrome.storage.local.set({
        [hostname]: JSON.stringify(oldValues)
    });
    display(oldValues, hostname)
}


export function display(values, hostname) {
    document.getElementsByClassName("hostname")[0].innerHTML = "Hostname: " + hostname;
    document.getElementsByClassName("hostname-times-visited stat-box")[0].innerHTML = "# of hostname visits: " + values.no_visit
    document.getElementsByClassName("total-number-of-images")[0].innerHTML = "# of images: " + values.no_image
    document.getElementsByClassName("total-size-of-images")[0].innerHTML = "Total size (in bytes) of images: " + values.size_image
    document.getElementsByClassName("successful-cache-hits")[0].innerHTML = "# of cache hits: " + values.no_cache_hit
    let cache_hit_percentage = isNaN(values.no_cache_hit / values.no_total) ? "0.00000%" : String((values.no_cache_hit * 100 / values.no_total).toFixed(5))
    document.getElementsByClassName("cache-hit-percentage")[0].innerHTML = "Cache hit % of browser: " + cache_hit_percentage
    document.getElementsByClassName("total-number-of-all-traffic")[0].innerHTML = "Total # of completed requests: " + values.no_total
    document.getElementsByClassName("total-size-of-all-traffic")[0].innerHTML = "Total size of completed requests (in bytes): " + values.size_total


    // Miscellaneous
    document.getElementsByClassName("total-number-of-main-frame-requests")[0].innerHTML = "# of main-frames: " + values.no_main_frame
    document.getElementsByClassName("total-size-of-main-frame-requests")[0].innerHTML = "Total size (in bytes) of main-frames: " + values.size_main_frame
    document.getElementsByClassName("total-number-of-sub-frame-requests")[0].innerHTML = "# of sub-frames: " + values.no_sub_frame
    document.getElementsByClassName("total-size-of-sub-frame-requests")[0].innerHTML = "Total size (in bytes) of sub-frames: " + values.size_sub_frame
    document.getElementsByClassName("total-number-of-stylesheet-requests")[0].innerHTML = "# of stylesheets: " + values.no_stylesheet
    document.getElementsByClassName("total-size-of-stylesheet-requests")[0].innerHTML = "Total size (in bytes) of stylesheets: " + values.size_stylesheet
    document.getElementsByClassName("total-number-of-javascript-requests")[0].innerHTML = "# of scripts: " + values.no_script
    document.getElementsByClassName("total-size-of-javascript-requests")[0].innerHTML = "Total size (in bytes) of scripts: " + values.size_script
    document.getElementsByClassName("total-number-of-font-requests")[0].innerHTML = "# of fonts: " + values.no_font
    document.getElementsByClassName("total-size-of-font-requests")[0].innerHTML = "Total size (in bytes) of fonts: " + values.size_font
    document.getElementsByClassName("total-number-of-object-requests")[0].innerHTML = "# of objects: " + values.no_object
    document.getElementsByClassName("total-size-of-object-requests")[0].innerHTML = "Total size (in bytes) of objects: " + values.size_object
    document.getElementsByClassName("total-number-of-xmlhttprequest-requests")[0].innerHTML = "# of xml-http-requests: " + values.no_xmlhttprequest
    document.getElementsByClassName("total-size-of-xmlhttprequest-requests")[0].innerHTML = "Total size (in bytes) of xml-http-requests: " + values.size_xmlhttprequest
    document.getElementsByClassName("total-number-of-ping-requests")[0].innerHTML = "# of pings: " + values.no_ping
    document.getElementsByClassName("total-size-of-ping-requests")[0].innerHTML = "Total size (in bytes) of pings: " + values.size_ping
    document.getElementsByClassName("total-number-of-csp-report-requests")[0].innerHTML = "# of csp-reports: " + values.no_csp_report
    document.getElementsByClassName("total-size-of-csp-report-requests")[0].innerHTML = "Total size (in bytes) of csp-reports: " + values.size_csp_report
    document.getElementsByClassName("total-number-of-media-requests")[0].innerHTML = "# of media: " + values.no_media
    document.getElementsByClassName("total-size-of-media-requests")[0].innerHTML = "Total size (in bytes) of media: " + values.size_media
    document.getElementsByClassName("total-number-of-websocket-requests")[0].innerHTML = "# of websockets: " + values.no_websocket
    document.getElementsByClassName("total-size-of-websocket-requests")[0].innerHTML = "Total size (in bytes) of websockets: " + values.size_websocket
    document.getElementsByClassName("total-number-of-other-requests")[0].innerHTML = "# of other: " + values.no_other
    document.getElementsByClassName("total-size-of-other-requests")[0].innerHTML = "Total size (in bytes) of other: " + values.size_other
}
