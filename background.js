function getUtorrentToken() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://" + Shared.getSetting('username') + ":" + Shared.getSetting('password') + "@" + Shared.getSetting('host') + ":" + Shared.getSetting('port') + "/gui/token.html", false);
    xhr.send(null);

    if (xhr.readyState == 4 && xhr.status == 200) {
        var parser = new DOMParser();
        var token = parser.parseFromString(xhr.responseText, "text/html").getElementById("token").innerHTML;
        return token;
    }
    else {
        if (Shared.getSetting('notifyme') == 'error') {
            var options = {
                "type": "basic",
                "title": "uTorrent Magnet Link Sender",
                "contextMessage": "Please be sure settings are correct and that the server is running.",
                "message": "An error ocurred getting the auth token.",
                "iconUrl": "utorrent-128.png",
            }
            chrome.notifications.create('uTorrent-error', options, function (a) {});
        }
    }

    return null;
}


function getClickHandler() {

    return function(info, tab) {

        var token = getUtorrentToken();

        var uTorrentUrl = "http://" + Shared.getSetting('username') + ":" + Shared.getSetting('password') + "@" + Shared.getSetting('host') + ":" + Shared.getSetting('port') + "/gui/?action=add-url&s=" + encodeURIComponent(info.linkUrl) + "&t=" + (new Date().getTime()) + "&token=" + token;

        var xhr = new XMLHttpRequest();
        xhr.open("GET", uTorrentUrl, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var resp = JSON.parse(xhr.responseText);

                if (!(resp.build > 0)) {
                    if (Shared.getSetting('notifyme') == 'error') {
                        var options = {
                            "type": "basic",
                            "title": "uTorrent Magnet Link Sender",
                            "contextMessage": "Please be sure settings are correct and that the server is running.",
                            "message": "An error ocurred sending the magnet link to uTorrent.",
                            "iconUrl": "utorrent-128.png",
                        }
                        chrome.notifications.create('uTorrent-error', options, function (a) {});
                    }
                }
                else {
                    if (Shared.getSetting('notifyme') == 'success') {
                        var options = {
                            "type": "basic",
                            "title": "uTorrent Magnet Link Sender",
                            "message": "Magnet Link successfully sent to uTorrent server",
                            "iconUrl": "utorrent-128.png",
                        }
                        chrome.notifications.create('uTorrent-success', options, function (a) {});
                    }
                }
            }
        }
        
        xhr.send();

    };
}


chrome.contextMenus.create({
    "id" : "utorrent-send-link",
    "title" : "Send magnet link to uTorrent",
    "type" : "normal",
    "contexts" : ["link"],
    "targetUrlPatterns": ["magnet:*"],
    "onclick" : getClickHandler()
});

