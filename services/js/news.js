/*
API FOR Images:- https://pixabay.com/api/
*/

$(() => {
    $(".submit").on('click', (e) => {
        e.preventDefault();
        const searchText = $.trim($(".search").val()); 
        const URL = `https://newsapi.org/v2/everything?apiKey=18aecab4df0d462082f5801c0cf06172&q=${encodeURIComponent(searchText)}`;

        $.get({
            url: URL,
            cors: true,
            success: function (data) {
                let articles = data.articles;
                console.log(articles);

                $('.news').remove();

                if (articles.length > 0) {
                    $.each(articles, function(index, value) {
                        $(".news-container").append(`
                            <div class="card">
                                <img class="card-img-top" src=${value['urlToImage']} alt="Card image cap">
                                <div class="card-body">
                                    <h5 class="card-title">${value['title']}</h5>
                                    <p class="card-text">${value['description']}</p>
                                </div>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Author: ${value['author']}</</li>
                                    <li class="list-group-item">Source: ${value['source']['name']}</li>
                                    <li class="list-group-item">Vestibulum at eros</li>
                                </ul>
                                <div class="card-body">
                                    <a href=${value['url']} class="card-link" style="color: var(--dark-color);">Link to the article</a>
                                </div>
                            </div>
                        `);
                    });
                    $('.footer').css('position','relative');
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