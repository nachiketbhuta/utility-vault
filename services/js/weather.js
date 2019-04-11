/*
    https://api.darksky.net/forecast/f7909cbf805c22f4f9172eaefba3406c/${latitude},${longitude}
*/


$(() => {

    // Get current Location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            
            displayWeather(latitude, longitude);
        });
    }
    else {
        alert("Geolocation is not supported by this browser.");
    }

    function displayWeather(latitude, longitude) {
        const URL = `https://api.darksky.net/forecast/f7909cbf805c22f4f9172eaefba3406c/${latitude},${longitude}`;

        $.get({
            url: URL,
            cors: true,
            dataType: "jsonp",
            success: function (data) {
                console.log(data);

                $(".time").text(moment(data.currently.time).format("MMM Do YY"));
                $(".summary").text(data.daily.summary);
                $(".temperature").text(toCelsius(data.currently.temperature));
            },
            error: function (error) {
                console.log(error);
            }
        })
    }   

    function toCelsius(f) {
        return (5/9) * (f-32);
    }
});


