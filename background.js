
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


function getClickHandler() {

  return function(info, tab) {

    var token = getUtorrentToken();

    if (!token.length) {
      return null;
    }

    var uTorrentUrl = getUtorrentHost() + "/gui/?action=add-url&s=" + encodeURIComponent(info.linkUrl) + "&t=" + (new Date().getTime()) + "&token=" + token;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", uTorrentUrl, false);
    xhr.send(null);

    if (xhr.readyState == 4 && xhr.status == 200) {
      var resp = JSON.parse(xhr.responseText);

      if (resp.build > 0) {
        Shared.notify('success');
      } else {
        Shared.notify('error', 'An error ocurred sending magnet link to uTorrent server.');
      }
    } else {
      Shared.notify('error', 'An error ocurred sending magnet link to uTorrent server.');
    }


  };
}


chrome.contextMenus.create({
  "id": "utorrent-send-link",
  "title": "Send magnet link to uTorrent",
  "type": "normal",
  "contexts": ["link"],
  "targetUrlPatterns": ["magnet:*"],
  "onclick": getClickHandler()
});

// open the options page only the first time in order to configure
chrome.runtime.onInstalled.addListener(function() {
  Shared.setSetting('protocol', 'http://');
  chrome.tabs.create({
    url: chrome.runtime.getURL('options.html')
  });
});

