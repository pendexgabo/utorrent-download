
$(document).ready(function() {
    OptionsPage.loadSettings();

    $('#save-settings').click(function(e) {
        e.preventDefault();

        OptionsPage.setSetting('host', 'host');
        OptionsPage.setSetting('port', 'port');
        OptionsPage.setSetting('username', 'username');
        OptionsPage.setSetting('password', 'password');
        OptionsPage.setSetting('notifyme', 'notifyme');

        $('#notification').html('<div class="alert alert-success" role="alert" id="settings-saved">Your settings have been saved.</div>');
        
        setTimeout(function(){
                $('#settings-saved').fadeOut(500);
            }, 2000);
        
    });

    $('#buymeabeer').click(function (e) {
        e.preventDefault();
        $('#buymeabeer-form').submit();
    });


});


OptionsPage = {
    loadSettings : function () {
        OptionsPage.getSetting('host', 'host');
        OptionsPage.getSetting('port', 'port');
        OptionsPage.getSetting('username', 'username');
        OptionsPage.getSetting('password', 'password');
        OptionsPage.getSetting('notifyme', 'never');
    },

    getSetting : function (setting, elementId) {    
        var value = Shared.getSetting(setting);

        if ($("#" + elementId).attr('type') == 'checkbox') {
            value == 'true' ?
                $("#" + elementId).attr('checked','checked') :
                null;
        }
        else {
            $("#" + elementId).val(value);
        }

    },

    setSetting : function (elementId, setting) {

        if ($("#" + elementId).attr('type') == 'checkbox') {
            var value = $("#" + elementId).is(":checked") ? 'true' : 'false';
        }
        else {
            var value = $("#" + elementId).val(); 
        }

        Shared.setSetting(setting, value);
    }}

