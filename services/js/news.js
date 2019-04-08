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
                            <div class="news">
			                    <div class="news-image">
				                    <img src=${value['urlToImage']} width="150" height="150"  alt="">	
			                    </div>
			                    <div class="news-content">
				                    <h3>${value['title']}</h3>
				                    <p>${value['description']}</p>
                                    <span>Author: ${value['author']}</span><br>
                                    <a href=${value['url']}>Link to this article</a>
			                    </div>
		                    </div>
                        `);
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