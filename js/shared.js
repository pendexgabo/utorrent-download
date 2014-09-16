Shared = {

	APPLICATION_NAMESPACE : "utorrent",

	getSetting: function(name, _default) {

		if (typeof(_default) == 'undefined') {
			_default = '';
		}

		var value = String(localStorage.getItem(Shared.APPLICATION_NAMESPACE + "." + name) || _default);

		console.log('get setting <' + name + '> : ' + value); 

		return value;
	},
	setSetting: function(name, value) {
		localStorage.setItem(Shared.APPLICATION_NAMESPACE + "." + name, value);

		console.log('set setting <' + name + '> : ' + value); 

	}

}

