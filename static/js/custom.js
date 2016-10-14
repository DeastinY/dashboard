$(function() {
    $('.lightbtn').click(function() {
        $.ajax({
            url: '/togglelight',
            type: 'POST',
            contentType : 'application/json',
            dataType : 'json',
            data: JSON.stringify({
                "name" : $(this).attr('name')
            }),
            success: function(response) {
                console.log(response);
                var name = response['light'];
                var btn = $("button[name=l"+name+"]");
                btn.removeClass('btn-warning');
                btn.removeClass('btn-default');
                if (response['on']) {
                    btn.addClass('btn-warning');
                } else {
                    btn.addClass('btn-default');
                }
            },
            error: function(error) {
                console.log(error);
            }
        });
    });
    $('.togglebtn').click(function() {
        console.log(this);
        if (this.classList.contains('btn-warning')) {
            this.classList.remove('btn-warning');
            this.classList.add('btn-default');
        } else {
            this.classList.remove('btn-default');
            this.classList.add('btn-warning');
    }});
    $('.onbtn').click(function() {
        $.ajax({
            url: '/lighton',
            type: 'POST',
            contentType : 'application/json',
            dataType : 'json',
            data: JSON.stringify({
                "name" : $(this).attr('name')
            }),
            success: function(response) {
                console.log(response);
                for (var l in response['lights']) {
                    console.log(l);
                    var btn = $("button[name=l"+response['lights'][l]+"]");
                    btn.removeClass('btn-default').addClass('btn-warning');
                }
            },
            error: function(error) {
                console.log(error);
            }
        });
    });
    $('.offbtn').click(function() {
        $.ajax({
            url: '/lightoff',
            type: 'POST',
            contentType : 'application/json',
            dataType : 'json',
            data: JSON.stringify({
                "name" : $(this).attr('name')
            }),
            success: function(response) {
                console.log(response);
                for (var l in response['lights']) {
                    var btn = $("button[name=l"+response['lights'][l]+"]");
                    btn.removeClass('btn-warning').addClass('btn-default');
                }
            },
            error: function(error) {
                console.log(error);
            }
        });
    });
    $('.callbtn').click(function() {
        $(".togglebtn").each(function (i, obj) {
            obj.classList.remove("btn-default");
            obj.classList.add("btn-warning");
        });
    });
    $('.cnonebtn').click(function() {
        $(".togglebtn").each(function (i, obj) {
            obj.classList.remove("btn-warning");
            obj.classList.add("btn-default");
        });
    });
    $('.csetbtn').click(function() {
        var lights = [];
        $(".togglebtn.btn-warning").each(function (i, obj) {
            lights.push(obj.innerHTML);
        });
        $.ajax({
            url: '/lightcolor',
            type: 'POST',
            contentType : 'application/json',
            dataType : 'json',
            data: JSON.stringify({
                "lights" : lights,
                "color" : $(".pick-a-color").val()
            }),
            success: function(response) {
                console.log(response);
            },
            error: function(error) {
                console.log(error);
            }
        });
    });
    $('.scenecreator_savebtn').click(function() {
        var lights = [];
        $(".togglebtn.btn-warning").each(function (i, obj) {
            lights.push(obj.innerHTML);
        });
        $.ajax({
            url: '/scenecreator_savebtn',
            type: 'POST',
            contentType : 'application/json',
            dataType : 'json',
            data: JSON.stringify({
                "name" : $(".scenecreator_name").val(),
                "lights" : lights
            }),
            success: function(response) {
                console.log(response);
                var alert = $(".scenecreator_alert");
                if (response["success"] == false) {
                    alert.html("<strong>Something went wrong.</strong> Double check the name maybe ...");
                    alert.removeClass("alert-success")
                    alert.addClass("alert-danger");
                    alert.show();
                }
                else {
                    alert.hide();
                }
            }
        });
    });
    $('.scenecreator_showbtn').click(function() {
        $.ajax({
            url: '/scenecreator_showbtn',
            type: 'POST',
            contentType : 'application/json',
            dataType : 'json',
            success: function(response) {
                console.log(response);
                $(".scenecreator_alert").show();
            },
            error: function(error) {
                console.log(error);
            }
        });
    });
    $('.audiograbber_savebtn').click(function() {
        $.ajax({
            url: '/audiograbber_savebtn',
            type: 'POST',
            contentType : 'application/json',
            dataType : 'json',
            data: JSON.stringify({
                "name" : "test",
                "url" : "test"
            }),
            success: function(response) {
                console.log(response);
            },
            error: function(error) {
                console.log(error);
            }
        });
    });
    $('.audiograbber_showbtn').click(function() {
        $.ajax({
            url: '/audiograbber_showbtn',
            type: 'POST',
            contentType : 'application/json',
            dataType : 'json',
            success: function(response) {
                console.log(response);
            },
            error: function(error) {
                console.log(error);
            }
        });
    });

});
$(document).ready(function() {
    setInterval(function() {
        console.log("penis");
    }, 1000 * 10);
    $(".pick-a-color").pickAColor({
        showSpectrum          : true,
        showSavedColors       : true,
        saveColorsPerElement  : false,
        fadeMenuToggle        : false,
        showAdvanced          : true,
        showBasicColors       : false,
        showHexInput          : false,
        allowBlank            : false
    });
});

