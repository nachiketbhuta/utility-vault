/*
API FOR Images:- https://pixabay.com/api/
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

    $("#searchBtn").on('click', (e) => {
        e.preventDefault();
        $.busyLoadFull('show');
        const searchText = $.trim($("#search-field").val());
        const URL = `https://pixabay.com/api/?key=11831560-e0c25637763ecd54e8a1e424d&q=${encodeURIComponent(searchText)}&image_type=photo&safesearch=true`;

        $.get({
            url: URL,
            cors: true,
            success: function (data) {
                let images = data.hits;
                $('.grid-item').remove();
                $('.not_found').remove();
                if (images.length > 0) {
                    $.each(images, function(index, value) {
                        let html = `<div class="grid-item">
                                        <a href="${value['webformatURL']}" data-lightbox="mygallery" data-title="${value['tags']}">
                                            <img src="${value['webformatURL']}" />
                                        </a>
                                    </div>`;
                        $('.gallery-grid').append(html);
                    });

                    var $grid = $('.gallery-grid').masonry({
                        // options...
                        itemSelector: '.grid-item',
                        columnWidth: '.grid-sizer',
                        // gutter: 5
                    });
                      // layout Masonry after each image loads
                    $grid.imagesLoaded().progress( function() {
                        $grid.masonry('layout');
                        $('.footer').css('position', 'relative');
                    });

                }
                else {
                    toastr['error']("No images related to your query were found");
                }
                $.busyLoadFull('hide');
            },
            error: function (error) {
                console.log(error);
                $.busyLoadFull('hide');
                toastr.error("Some error occured. Please contact admin");
            }
        })
    });

    $('.popular-tags li').click(function(e){
        let query = $.trim($(this).text());
        $("#search-field").val(query);
        $('#searchBtn').click();
    });
});