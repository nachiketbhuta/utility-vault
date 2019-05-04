/*
API for dictionary :- https://googledictionaryapi.eu-gb.mybluemix.net/
*/

function showMeaning(data) {
    let wordContainer = $('.word-container');
    $('.word-searched').text(data.word);
    $('.phonetic').text(data.phonetic);
    $('.play-btn').show();
    $('#pronunciation').empty();
    $('#pronunciation').append('<source src="' + data.pronunciation + '" type="audio/mp3">')
    $('.definitions').empty();
    let key_list = [];

    for (var key in data.meaning) {
        key_list.push(key);
        $('.definitions').append('<p class="grammar-info"><i>' + key + '</i></p>');
        $('.definitions').append('<ol class="definition-list-' + key + '"></ol>')
        for (var item in data.meaning[key]) {
            $('.definition-list-' + key).append('<li>' + data.meaning[key][item]['definition'] + '</li>');
            if ("example" in data.meaning[key][item]) {
                $('.definition-list-' + key).append('<ul class="example-list-' + key + '"></ul>');
                $('.example-list-' + key).append('<li>' + data.meaning[key][item]['example'] + '</li>')
            }
        }
    }

    $.busyLoadFull('hide');
    wordContainer.show();
}

$(() => {

    $("#submit").on('click', function (event) {
        event.preventDefault();
        $.busyLoadFull('show');

        var search_query = $.trim($("#search").val());

        const URL = `https://googledictionaryapi.eu-gb.mybluemix.net/?define=${search_query}&lang=en`;

        $.get({
            url: URL,
            cors: true,
            secure: true,
            success: function (data) {
                $(".footer").css('position', 'relative');
                showMeaning(data[0]);
            },
            error: function (error) {
                $.busyLoadFull('hide');
                $('.word-searched').text('Word not found!! :(');
                $('.play-btn').hide();
                $('.word-container').show();
            }
        });
    });

    $(document).on('click', '.play-btn', function () {
        var x = document.getElementById("pronunciation");
        x.load();
        x.play();
    });

});