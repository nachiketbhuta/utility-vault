/*

API for dictionary :- https://googledictionaryapi.eu-gb.mybluemix.net/

*/


function showMeaning(data){
    let wordContainer = $('.word-container');
    $('.word-searched').text(data.word);
    $('.pronounciation').text(data.meaning.pronounciation);
    let key_list = [];
    for( key in data.meaning ){
        key_list.push(key);
        for ( item in data.meaning['key']){
            $('.definition-list').append('<li>' + item.definition + '<li>')
            if(item.definition.example){
                $('.example-list').append('<li>' + item.definition.example + '</li>')
            }
        }
    }
    $('.grammar-info').append(key_list.join(', '));

    wordContainer.show();
}

$(() => {

	$("#submit").on('click', function(event) {
		event.preventDefault();

		var search_query = $.trim($("#search").val());

		const URL = `https://googledictionaryapi.eu-gb.mybluemix.net/?define=${search_query}&lang=en`;

		$.get({
            url: URL,
            cors: true,
            secure: true,
            success: function (data) {
                console.log(data);
                showMeaning(data[0]);
            },
            error: function (error) {
                console.log(error);
            }
        });
    });

});