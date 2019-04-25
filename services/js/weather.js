/*
    http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=c3584b224afd6dcc0b75b8e0d69f4a93&units=metric
*/

$(() => {
	$(".submit").on("click", () => {
		let city = $.trim($(".search").val());

		const URL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=c3584b224afd6dcc0b75b8e0d69f4a93&units=metric`;

		$.get({
			url: URL,
			cors: true,
			dataType: "jsonp",
			success: function(data) {
				console.log(data);
				$(".summary").text(data.weather[0].main);
				$(".temperature").text(data.main.temp);
			},
			error: function(error) {
				console.log(error);
			}
		});
	});
});
