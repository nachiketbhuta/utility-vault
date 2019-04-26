const slides = $(".slide");
const next = $("#next");
const prev = $("#prev");
const auto = false; // Auto scroll
const intervalTime = 5000;
let slideInterval;

const nextSlide = function() {
	const current = $(".current");
	current.removeClass("current");
	if (current[0].nextElementSibling) {
		$(current[0].nextElementSibling).addClass("current");
	} else {
		$(slides[0]).addClass("current");
	}
	setTimeout(() => current.removeClass("current"));
};

const prevSlide = () => {
	const current = $(".current");
	current.removeClass("current");
	if (current[0].previousElementSibling) {
		$(current[0].previousElementSibling).addClass("current");
	} else {
		$(slides[slides.length - 1]).addClass("current");
	}
	setTimeout(() => current.removeClass("current"));
};

next.click(function(e){
	nextSlide();
	if (auto) {
		clearInterval(slideInterval);
		slideInterval = setInterval(nextSlide, intervalTime);
	}
});

prev.click(function(e) {
	prevSlide();
	if (auto) {
		clearInterval(slideInterval);
		slideInterval = setInterval(nextSlide, intervalTime);
	}
});

if (auto) {
	slideInterval = setInterval(nextSlide, intervalTime);
}

// Read More Section
$(document).ready(function() {
	$("#toggle").click(function() {
		var elem = $("#toggle").text();
		if (elem == "Read More") {
			$("#toggle").text("Read Less");
			$("#text").slideDown();
		} else {
			$("#toggle").text("Read More");
			$("#text").slideUp();
		}
	});

	$(window).resize(function(){
		var h = $('nav').height();
		$('.container-fluid').css('padding-top',h);
	});
});
