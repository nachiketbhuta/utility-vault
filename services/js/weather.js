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
				
				$(".weather").css('display', 'initial');

				$(".temp").html(Math.floor(data.main.temp) + "&deg;");
				$(".location").text(data.name);
				$(".rain").text(data.clouds.all + "MM");
				$(".wind").text(data.wind.speed + "KMPH");
			},
			error: function(error) {
				console.log(error);
			}
		});
	});
});
