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

            },
            error: function (error) {
                console.log(error);
            }
        })
    }   

});


