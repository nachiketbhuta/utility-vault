/*
	http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=c3584b224afd6dcc0b75b8e0d69f4a93&units=metric
	http://openweathermap.org/img/w/${icon}.png
*/

$(() => {

	toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-right",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "30000",
        "hideDuration": "10000",
        "timeOut": "50000",
        "extendedTimeOut": "10000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      }

	
	$(".submit").on("click", (e) => {
		e.preventDefault();
		$.busyLoadFull('show');

		let city = $.trim($(".search").val());

		const URL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=c3584b224afd6dcc0b75b8e0d69f4a93&units=metric`;

		$.get({
			url: URL,
			cors: true,
			dataType: "jsonp",
			success: function(data) {
				console.log(data);
				
				if (data.cod === 200) {
					$(".weather").css('display', 'initial');
	
					$(".temp").html(Math.floor(data.main.temp) + "&deg;");
					$(".location").text(data.name);
					$(".rain").text(data.clouds.all + "\nMM");
					$(".wind").text(data.wind.speed + "\nKMPH");

					$('#weatherIcon').attr('src', `http://openweathermap.org/img/w/${data.weather[0].icon}.png`)
				} 
				else {
					toastr['error']("No city related to your query was found");
				}

				$.busyLoadFull('hide');
			},
			error: function(error) {
				console.log(error);
				$.busyLoadFull('hide');
                toastr.error("Some error occured. Please contact admin");
			}
		});
	});
});
