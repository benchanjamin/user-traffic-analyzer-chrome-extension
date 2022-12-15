function accessStorage(key) {
    return new Promise((resolve) => {
        chrome.storage.local.get(key, resolve)
    });
}

chrome.webNavigation.onCompleted.addListener(async (details) => {
    let url = new URL(details.url);
    let hostname = url.hostname;
    let get = await accessStorage(hostname);
    let values = JSON.parse(get[hostname]);
    values.no_visit = values.no_visit + 1;
    chrome.storage.local.set({[hostname]: JSON.stringify(values)});
});

// listen for web requests
chrome.webRequest.onCompleted.addListener(
    async function (details) {

        if (details === undefined || details === null) {
            return
        }
        // calculate fileSize
        let fileSize;
        details.responseHeaders.forEach(v => {
            if (v.name.toLowerCase() === 'content-length') {
                fileSize = parseInt(v.value);
            }
        });
        if (!fileSize) fileSize = 0

        // add the file to statistics
        if (details.initiator === "undefined") {
            return
        } else if (String(details.initiator).startsWith("chrome") || String(details.initiator).startsWith("brave")) {
            return
        }
        let urlInitiator
        try {
            urlInitiator = new URL(details.initiator);
        }
        catch (e) {
            return
        }

        let hostname = urlInitiator.hostname;

        let oldValues;
        let get = await accessStorage(hostname);

        if (get[hostname] === undefined) {
            oldValues = {
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
        } else {
            oldValues = JSON.parse(get[hostname]);
        }
        // console.log(get[hostname]);

        switch (details.type) {
            case "main_frame":
                oldValues.no_main_frame++;
                oldValues.size_main_frame += fileSize;
                break;
            case "sub_frame":
                oldValues.no_sub_frame++;
                oldValues.size_sub_frame += fileSize;
                break;
            case "stylesheet":
                oldValues.no_stylesheet++;
                oldValues.size_stylesheet += fileSize;
                break;
            case "script":
                oldValues.no_script++;
                oldValues.size_script += fileSize;
                break;
            case "image":
                oldValues.no_image++;
                oldValues.size_image += fileSize;
                break;
            case "font":
                oldValues.no_font++;
                oldValues.size_font += fileSize;
                break;
            case "object":
                oldValues.no_object++;
                oldValues.size_object += fileSize;
                break;
            case "xmlhttprequest":
                oldValues.no_xmlhttprequest++;
                oldValues.size_xmlhttprequest += fileSize;
                break;
            case "ping":
                oldValues.no_ping++;
                oldValues.size_ping += fileSize;
                break;
            case "csp_report":
                oldValues.no_csp_report++;
                oldValues.size_csp_report += fileSize;
                break;
            case "media":
                oldValues.no_media++;
                oldValues.size_media += fileSize;
                break;
            case "websocket":
                oldValues.no_websocket++;
                oldValues.size_websocket += fileSize;
                break;
            case "other":
                oldValues.no_other++;
                oldValues.size_other += fileSize;
                break;
        }

        if (details.fromCache) {
            oldValues.no_cache_hit++;
        }
        oldValues.no_total++;
        oldValues.size_total += fileSize;

        // write to storage
        chrome.storage.local.set({
            [hostname]: JSON.stringify(oldValues)
        });
    },
    {urls: ["<all_urls>"]}, ["responseHeaders"]
);
