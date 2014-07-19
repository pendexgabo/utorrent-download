{
  "name" : "uTorrent Link Sender",
  "version" : "0.0.1",
  "description" : "Sends a magnet link to the uTorrent Web UI",
  "background" : {
                  "persistent", true, 
                  "scripts": [
                    "js/shared.js",
                    "background.js",
                    "js/bootstrap.min.js",
                    "js/jquery.min.js"
                    "js/options.js"
                    ] },
  "permissions" : [
    "contextMenus",
    "notifications",
    "storage",
    "tabs",
    "http://*/*",
    "https://*/*"
   ],
  "minimum_chrome_version" : "6.0.0.0",
  "icons" : {
    "16" : "utorrent-16.png",
    "48" : "utorrent-48.png",
    "128" : "utorrent-128.png"
  },
  "manifest_version": 2,
  "options_page": "options.html"

}