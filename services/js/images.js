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
                let images = data.hits;
                $('.image-holder').remove();
                $('.not_found').remove();
                if (images.length > 0) {
                    $.each(images, function(index, value) {
                        $(".img-container").append('<div class="image-holder" id="lightgallery"><img width="300" class="image" height="300" src="'+value['webformatURL']+'"</img></div>');
                    });
                }
                else {
                    $('.img-container').append('<p class="not_found">There are no images found on this topic.</p>');
                }
            },
            error: function (error) {
                console.log(error);
            }
        })
    });
});