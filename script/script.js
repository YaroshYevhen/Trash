var APP = {};
APP.$document = $(document);
APP.slider = $('.slider-container');
APP.priceDropdown = $('.price-area__current');
APP.priceDropdownItem = $('.price-area__item');
APP.amountInput = $('.amount__number');
APP.amountBtn = $('.amount__button');
APP.trashTypeSelect = $('.price-type__li');
APP.containerTypeSelect = $('.price-size__li');
APP.modalBtn = $('.modal-btn');
APP.closeModal = $('.modal-close');
APP.sliderArrow = $('.slider-arrow');
APP.scrollBtn = $('.scroll-btn');
APP.hamburger = $('.hamburger');

function countSlides(slider) {
	let currentOutput = $(slider).find('.slider-counter__current');
	let currentSlide = $(slider).find('.slider-item.first').data('order');

	currentOutput.text(currentSlide);
}

function closeModal() {
  $('.modal').scrollTop(0).removeClass('active');
  $('html').removeClass('overflow');
}

APP.$document.ready(function() {
	APP.hamburger.on('click', function(){
		if(!$(this).hasClass('active')) {
    	$('.nav').scrollTop(0);
    }
    $(this).toggleClass('active');
    $('body').toggleClass('menu');
    $('html').toggleClass('overflow');
  });

	APP.scrollBtn.on('click', function(){
    let section = $(this).data('scroll');
    let scrollTo = $(section).offset().top;

    if(section === '.services') {
    	scrollTo = $(section).offset().top - 200;
    }
    $('html').removeClass('overflow');
    $('body').removeClass('menu');
    APP.hamburger.removeClass('active');
    $('html, body').animate({ scrollTop: scrollTo }, 500);
  });

	APP.sliderArrow.on('click', function() {
		let slider = $(this).parents('.slider-container');
		let firstSlide = slider.find('.slider-item.first');
		let secondSlide = slider.find('.slider-item.second');
		let thirdSlide = slider.find('.slider-item.third');
		let nextSlide = slider.find('.slider-item.third').next();
		let lastSlide = slider.find('.slider-item:last-of-type');

		let clone;

		if($(this).hasClass('slider-arrow_next')) {
			clone = firstSlide.clone().removeClass('first');

			firstSlide.addClass('prev').removeClass('first');
			setTimeout(function (){
			  firstSlide.remove();
			}, 300);
			secondSlide.addClass('first').removeClass('second');
			thirdSlide.addClass('second').removeClass('third');
			nextSlide.addClass('third');
			lastSlide.after(clone);
		}	else if($(this).hasClass('slider-arrow_prev')) {
			clone = lastSlide.clone().addClass('prev').addClass('first');

			firstSlide.before(clone).addClass('second').removeClass('first');
			setTimeout(function() {
				clone.removeClass('prev');
			}, 0);
			secondSlide.addClass('third').removeClass('second');
			thirdSlide.removeClass('third');
			lastSlide.remove();

		}

			countSlides(slider);
	})

	APP.slider.each(function() {
		let totalOutput = $(this).find('.slider-counter__total');
		let totalSlides = $(this).find('.slider-item').length;

		totalOutput.text(totalSlides);
		countSlides(this);
	})

	APP.modalBtn.on('click', function() {
    let attr = $(this).attr('data-target');
    let modal = $('.modal[data-target="' + attr + '"]');
    let modalTitle = modal.find('.modal__title');

    let text;

    if($(this).hasClass('services__btn')) {
			text = $(this).parents('.services-content').find('.services__text').html();
			modalTitle.html('Заказать ' + text);
    } else if($(this).hasClass('rent__btn')) {
    	text = $(this).parents('.rent-content').find('.rent__name').html();
			modalTitle.html('Арендовать ' + text);
    }
    modal.addClass('active');
    $('html').addClass('overflow');
  });

  $('.modal-close').on('click', function() {
    closeModal();
  });

  $('.modal').on('click', function(event){
    if($(event.target).hasClass('modal')){
      closeModal();
    }
  });

  $(document).keyup(function(e) { 
    if (e.keyCode == 27) { 
      closeModal();
    } 
  });

	APP.containerTypeSelect.on('click', function() {
		 $('.price-size__li.active').removeClass('active');
		 $(this).addClass('active');
	})

	APP.trashTypeSelect.on('click', function() {
		$('.price-type__li.active').removeClass('active');
		$(this).addClass('active');
	})

	APP.amountBtn.on('click', function() {
		let input = $(this).parents('.amount').find('.amount__number');
		let inputValue = input.val();

		if($(this).hasClass('amount__button_minus') && inputValue > 1) {
			inputValue--;
		} else if($(this).hasClass('amount__button_plus')) {
			inputValue++;
		}
		input.attr('value', inputValue).val(inputValue);;
	})

	APP.amountInput.on('change', function() {
		let value = $(this).val();

		$(this).attr('value', value);
	})

	APP.$document.on('click', function(event) {
		if(!$(event.target).hasClass('price-area-dropdown') && !$(event.target).parents('.price-area-dropdown').length) {
			$('.price-area-dropdown').removeClass('active');
		}
	})

	APP.priceDropdownItem.on('click', function() {
		let text = $(this).find('span').text();
		let currentChoice = $(this).parents('.price-area-dropdown').find('.price-area__current');

		currentChoice.text(text);
		$('.price-area__item.current').removeClass('current');
		$(this).addClass('current');
		$(this).parents('.price-area-dropdown').removeClass('active');
	})

	APP.priceDropdown.on('click', function() {
		$(this).parents('.price-area-dropdown').toggleClass('active');
	})

})