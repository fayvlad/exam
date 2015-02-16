$(document).ready(function () {
    function searchitems() {
        var lengyes = $('.no').length;
        $('div.leftinfo a').empty().append(lengyes);
        var lengno = $('.yes').length;
        $('div.rightinfo a').empty().append(lengno);
    }

    var i = 1;
    $(document).on('keypress', 'input#inp', function (e) {
        console.log(arguments);
        if (e.keyCode == 13) {
            var value = $(this).val();
            $(this).val('');
            if (value == '') {
                $(this).addClass('error');
            } else {
                $(this).removeClass('error');
                var insert = $(this).parents().find('.main');
                insert.append('<div class="content data" id="' + i + '"><div class="left no">' +
                '<i class="left glyphicon glyphicon-chevron-down"></i></div>' +
                '<div class="center active"><p>' + value + '</p></div><div class="right">' +
                '<i class="right glyphicon glyphicon-remove"></i>' +
                '<i class="right glyphicon glyphicon-pencil"id="' + i + '"></i></div></div>');
                i++;
                searchitems();
            }
        }
        ;
    });
    $(document).on("click", 'div.data i.left', function () {
        var left = $(this).parent('div.left');
        if (left.attr("class") == 'left no') {
            left.removeClass('no').addClass('yes');
            left.parent('.data').find('.center').removeClass('active').addClass('noactive');
            searchitems();
        } else {
            left.removeClass('yes').addClass('no');
            left.parent('.data').find('.center').removeClass('noactive').addClass('active');
            searchitems();
        }

    });
    $(document).on("click", 'div.data i.glyphicon-remove', function () {
        $(this).parents('div.data').addClass('remove').remove();
        $(this).parents('div.data').find('.yes').removeClass('yes').addClass('no');
        searchitems();
    });

    $(document).on("click", 'i.glyphicon-pencil', function () {
        var options = {
            "backdrop": "static"
        };
        $('#modal').modal(options);
        myid = $(this).attr('id');
    });

    $(document).on("click", '.btn-default', function () {
        $(document).find('.modimp').val('')
    });
    $(document).on("click",'.close', function () {
        $(document).find('.modimp').val('')
    });
    $(document).on("click", '.btn-primary', function () {
        var input = $(document).find('.modimp');
        var insert = $('.content#' + myid + ' > .center >p');
        var val = input.val();
        var text = insert.text();
        if (val != "") {
            insert.empty();
            insert.append(val);
            input.val('');
        }
        else {
            alert('insert text');
        }
    });

    $(document).on("click", 'div.centerinfo a#active', function () {
        $('div.data').show();
        var active = $('div.data').find('.noactive');
        active.parent('.data').hide();
    });
    $(document).on("click", 'div.centerinfo a#completed', function () {
        $('div.data').show();
        var completed = $('div.data').find('.active');
        completed.parent('.data').hide();
    });
    $(document).on("click", 'div.centerinfo a#all', function () {
        $('.data').show();
    });
    $(document).on("click", 'div.rightinfo p#clear', function () {
        var clear = $('div.data').find('.noactive');
        clear.parent('.data').remove();
        searchitems();
    });
});