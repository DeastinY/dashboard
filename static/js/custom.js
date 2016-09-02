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
});
$(document).ready(function() {
    setInterval(function() {
        console.log("penis");
    }, 1000 * 10);
});

