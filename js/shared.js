Shared = {

	UTORRENT_NAMESPACE : "utorrent",

	getSetting: function(name) {
		return localStorage.getItem(Shared.UTORRENT_NAMESPACE + "." + name) || "";
	},
	setSetting: function(name, value) {
		localStorage.setItem(Shared.UTORRENT_NAMESPACE + "." + name, value);
	}

}

