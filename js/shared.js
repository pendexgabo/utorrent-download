Shared = {

    APPLICATION_NAMESPACE: "utorrent",

    getSetting: function(name, _default) {

        if (typeof(_default) == 'undefined') {
            _default = '';
        }

        var value = String(localStorage.getItem(Shared.APPLICATION_NAMESPACE + "." + name) || _default);

        return value;
    },
    setSetting: function(name, value) {

        localStorage.setItem(Shared.APPLICATION_NAMESPACE + "." + name, value);

    },
    notify: function(on, _details) {

        var choice = Shared.getSetting('notifyme');

        if (typeof(_details) == 'undefined') {
            _details = 'An error ocurred.';
        }

        if ((choice == 'both' || choice == 'error') && on == 'error') {
            var options = {
                "type": "basic",
                "title": "uTorrent Link Sender",
                "contextMessage": "Please be sure settings are correct and that the server is running.",
                "message": _details,
                "iconUrl": "utorrent-128.png"
            }
            chrome.notifications.create('utorrent-error-' + (new Date().getTime()), options, function(a) {});
        }

        if ((choice == 'both' || choice == 'success') && on == 'success') {
            var options = {
                "type": "basic",
                "title": "uTorrent Link Sender",
                "message": "Link successfully sent to uTorrent server.",
                "iconUrl": "utorrent-128.png"
            }
            chrome.notifications.create('utorrent-success-' + (new Date().getTime()), options, function(a) {});
        }

    }

}