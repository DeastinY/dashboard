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
                var btn = $("button[name="+name+"]");
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
});