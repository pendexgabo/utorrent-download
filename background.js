function getUtorrentHost() {
    return Shared.getSetting('protocol') + encodeURIComponent(Shared.getSetting('username')) + ":" + encodeURIComponent(Shared.getSetting('password')) + "@" + Shared.getSetting('host') + ":" + Shared.getSetting('port');
}



function getUtorrentToken() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", getUtorrentHost() + "/gui/token.html", false);
    xhr.send(null);

    if (xhr.readyState == 4 && xhr.status == 200) {
        var parser = new DOMParser();
        var token = parser.parseFromString(xhr.responseText, "text/html").getElementById("token").innerHTML;
        return token;
    } else {
        Shared.notify('error', 'An error ocurred getting the auth token.');
    }

    return '';
}


function makeRequest(url) {

    var resp = null;

    var token = getUtorrentToken();

    if (!token.length) {
        return null;
    }

    var requestUrl = getUtorrentHost() + "/gui/?" + url + "&t=" + (new Date().getTime()) + "&token=" + token;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", requestUrl, false);
    xhr.send(null);

    if (xhr.readyState == 4 && xhr.status == 200) {
        resp = JSON.parse(xhr.responseText);

    }

    return resp;

}

function getTorrentHashFromUrl(url) {
    return url.substring(url.indexOf('urn:btih:') + 9, url.indexOf('urn:btih:') + 49);
}

function getClickHandler() {

    return function(info, tab) {



        var response = makeRequest("action=add-url&s=" + encodeURIComponent(info.linkUrl));


        if (typeof response == "object" && response.build > 0) {
            Shared.notify('success');

            if (Shared.getSetting('torrent-label') != "") {

                var torrentHash = getTorrentHashFromUrl(info.linkUrl);
                makeRequest("action=setprops&s=label&v=" + Shared.getSetting('torrent-label') + "&hash=" + torrentHash);
            }

        } else {
            Shared.notify('error', 'An error ocurred sending link to uTorrent server.');
        }



    };
}


chrome.contextMenus.create({
    "id": "utorrent-send-link",
    "title": "Send to uTorrent",
    "type": "normal",
    "contexts": ["link"],
    "targetUrlPatterns": ["magnet:*", "*://*/*.torrent", "*://*/*.torrent?*"],
    "onclick": getClickHandler()
});

if (Shared.getSetting('notifyme') != 'never') {
    chrome.notifications.onClicked.addListener(function() {
        chrome.tabs.create({
            url: getUtorrentHost() + '/gui/'
        });
    });
}

// open the options page only the first time in order to configure
chrome.runtime.onInstalled.addListener(function() {
    Shared.setSetting('protocol', 'http://');

    chrome.tabs.create({
        url: chrome.runtime.getURL('options.html')
    });
});
