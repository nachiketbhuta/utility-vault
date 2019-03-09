/*
API FOR Images:- https://pixabay.com/api/
*/

$(() => {
    $(".submit").on('click', (e) => {
        e.preventDefault();
        const searchText = $.trim($(".search").val()); 
        const URL = `https://pixabay.com/api/?key=11831560-e0c25637763ecd54e8a1e424d&q=${encodeURIComponent(searchText)}&image_type=photo`;

        $.get({
            url: URL,
            cors: true,
            success: function (data) {
                console.log(data);
            },
            error: function (error) {
                console.log(error);
            }
        })
    });
});