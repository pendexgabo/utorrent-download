
$(document).ready(function() {
	console.log('the document is ready');
	OptionsPage.loadSettings();

	$('#save-settings').click(function(e) {
			e.preventDefault();
			console.log('settings saved');

			OptionsPage.setSetting('host', 'host');
			OptionsPage.setSetting('port', 'port');
			OptionsPage.setSetting('username', 'username');
			OptionsPage.setSetting('password', 'password');



	});
});


OptionsPage = {
	loadSettings : function () {
		OptionsPage.getSetting('host', 'host');
		OptionsPage.getSetting('port', 'port');
		OptionsPage.getSetting('username', 'username');
		OptionsPage.getSetting('password', 'password');
	},

	getSetting : function (setting, elementId) {	
		var value = Shared.getSetting(setting);
		$("#" + elementId).val(value);
	},

	setSetting : function (elementId, setting) {	
		var value = $("#" + elementId).val(); 
		Shared.setSetting(setting, value);
	}
}
