Shared = {

  UTORRENT_NAMESPACE : "utorrent",

  getSetting: function(name) {
    return localStorage.getItem(Shared.UTORRENT_NAMESPACE + "." + name) || "";
  },
  setSetting: function(name, value) {
    localStorage.setItem(Shared.UTORRENT_NAMESPACE + "." + name, value);
  }

}


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
      alert ("An error ocurred sending the magnet link to uTorrent. Please be sure settings are correct and that the server is running");
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
          alert ("An error ocurred sending the magnet link to uTorrent. Please be sure settings are correct and that the server is running");
        }
      }

    }
    xhr.send();


  };
};

/**
 * Create a context menu which will only show up for images.
 */
chrome.contextMenus.create({
  "id" : "utorrent-send-link",
  "title" : "Send magnet link to uTorrent",
  "type" : "normal",
  "contexts" : ["link"],
  "targetUrlPatterns": ["magnet:*"],
  "onclick" : getClickHandler()
});

