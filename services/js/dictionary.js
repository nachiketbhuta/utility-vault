/*

API for dictionary :- https://googledictionaryapi.eu-gb.mybluemix.net/

*/

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
            },
            error: function (error) {
                console.log(error);
            }
        });
	});
});