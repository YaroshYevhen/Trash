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
APP.sliderNav = $('.slider-nav');
APP.testimonialsMore = $('.testimonials__more');

function doAnimation() {
    var windowScroll = $(window).height() + APP.$document.scrollTop();

  $('.js-animation:not(.animate)').each(function(key, item){
    var itemOffset = $(item).offset().top + 100;

    if(windowScroll >= itemOffset){
        $(item).addClass('animate');
    }
  });
};

function calculatePrice() {
  let normalPrice = $('.price-size__li.active').data('price');
  let snowPrice = $('.price-size__li.active').data('price-snow');
  let volume = $('.price-size__li.active').data('volume');
  let amount = $('.amount__number').val();
  let isSnow = $('.price-type__li.active').data('snow');

  let price = isSnow? snowPrice : normalPrice;
  let totalPrice = (+price) * (+amount);

  $('.price-total__value .number').text(amount);
  $('.price-total__value .volume').text(volume);
  $('.price-total__value .cost').text(price);
  $('.price-cost__value span').text(totalPrice);
}

function fillWpForm(element) {
  let target = $(element).data('target');
  let thisVal = $(element).val();

  if($(element).hasClass('js-text')){
    $(target).text(thisVal);
  } else if($(element).hasClass('modal__title')) {
  	thisVal = $(element).text();
  	$(target).val(thisVal);
  } else {
    $(target).val(thisVal);
  }
}

function countSlides(slider) {
	let currentOutput = $(slider).find('.slider-counter__current');
	let currentSlide = $(slider).find('.slider-item.first').data('order');

	currentOutput.text(currentSlide);
}

function closeModal() {
  $('.modal').scrollTop(0).removeClass('active');
  $('html').removeClass('overflow');
  $('.modal').find('textarea').val('');
  $('.modal input').removeClass('error');
}

APP.$document.ready(function() {
  calculatePrice();
  
  $('.preloader').delay(500).fadeToggle(500);
  setTimeout(function (){
    $('html').removeClass('overflow');
    doAnimation();
  }, 500);
  

  APP.$document.on('scroll', function(){
    doAnimation ();
  })

  $(document).keyup(function(e) { 
    APP.slider.each(function() {
      let isCanSlide = (($(window).scrollTop() + $(window).height() > $(this).offset().top) && ($(window).scrollTop() < $(this).offset().top)) ? true : false;
      if (e.keyCode == 39 && isCanSlide) { 
        $(this).find('.slider-arrow_next').click();
      } 
      if (e.keyCode == 37 && isCanSlide) { 
        $(this).find('.slider-arrow_prev').click();
      } 
    })
  });

  APP.testimonialsMore.each(function() {
    if($(this).parents('.testimonials-content').find('.testimonials__text').height() < 141) {
      $(this).hide();
    }
  })

	$('.js-change').on('change', function(){
    fillWpForm(this)
  });

  $('.modal__button, .form__btn').on('click', function() {
    let parent = $(this).parents('.modal-container, .form-container');
    let requiredInput = parent.find('input.required, textarea.required');
    let submitBtn = parent.find('.wpforms-submit');
    let emailInput = parent.find('input.validate');
    let emailPattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
    
    submitBtn.click();
  
    if(!requiredInput.val()) {
      requiredInput.addClass('error');
    } else {
    	requiredInput.removeClass('error');
    }
    if(!emailPattern.test(emailInput.val()) && emailInput.val() ){
      emailInput.addClass('error');
    } else {
    	emailInput.removeClass('error');
    }
  })

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
    let scrollTo = $(section).offset().top - 68;

    if(section === '.services') {
    	scrollTo = $(section).offset().top - 268;
    }
    $('html').removeClass('overflow');
    $('body').removeClass('menu');
    APP.hamburger.removeClass('active');
    $('html, body').animate({ scrollTop: scrollTo }, 500);
  });
	APP.sliderNav.each(function() {
		let slider = $(this).parents('.slider-container');
		let slidesCount = slider.find('.slider-item').length;

		if((slider.parents('.autopark').length && slidesCount < 4) || 
			 (slider.parents('.testimonials').length && slidesCount < 3)) {
			$(this).hide();
		}
	})

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

	$(document).on('click', '.modal-btn', function() {
    let attr = $(this).attr('data-target');
    let modal = $('.modal[data-target="' + attr + '"]');
    let modalTitle = modal.find('.modal__title');

    let text;

    if($(this).hasClass('services__btn')) {
			text = $(this).parents('.services-content').find('.services__text').html();

			if(text === 'Вывоз и утилизация ТБО') {
				text = 'вывоз и утилизацию ТБО';
			}

			modalTitle.html('Заказать ' + text);
    } else if($(this).hasClass('rent__btn')) {
    	text = $(this).parents('.rent-content').find('.rent__name span').html();
			modalTitle.html('Арендовать ' + text);
    } else if($(this).hasClass('price__btn')) {
      let type = $('.price-type__li.active span').text();
      let area = $('.price-area__current').text();
      let number = $('.amount__number').val();
      let container = $('.price-size__li.active .price-size__name').text();
      let price = $('.price-cost__value').text()

      text = 'Тип мусора: ' + type + '\nРайон: ' + area + '\n' +  container + '\nВывозов в месяц: ' + number + '\nСтоимость: ' + price;
      modal.find('textarea').val(text);
      modalTitle.html('Оформить заказ');
    } else if($(this). hasClass('testimonials__more')) {
      text = $(this).parents('.testimonials-content').find('.testimonials__text').text();
      let author = $(this).parents('.testimonials-item').find('.testimonials__author').text();
      let date = $(this).parents('.testimonials-content').find('.testimonials__date').text();
      modal.find('.modal__testimonial').text(text);
      modal.find('.modal__date').text(date);
      modal.find('.modal__author').text(author);
    }
    fillWpForm(modalTitle);
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
     calculatePrice();
	})

	APP.trashTypeSelect.on('click', function() {
		$('.price-type__li.active').removeClass('active');
		$(this).addClass('active');
    calculatePrice();
	})

	APP.amountBtn.on('click', function() {
		let input = $(this).parents('.amount').find('.amount__number');
		let inputValue = input.val();

		if($(this).hasClass('amount__button_minus') && inputValue > 1) {
			inputValue--;
		} else if($(this).hasClass('amount__button_plus')) {
			inputValue++;
		}
		input.attr('value', inputValue).val(inputValue);
    calculatePrice();
	})

	APP.amountInput.on('change', function() {
		let value = $(this).val();

		$(this).attr('value', value);
    calculatePrice();
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


window.addEventListener("DOMContentLoaded", function() {
  [].forEach.call( document.querySelectorAll('input[type="tel"]'), function(input) {
  var keyCode;
  function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      var pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      var matrix = "+7 (___) ___ ____",
          i = 0,
          def = matrix.replace(/\D/g, ""),
          val = this.value.replace(/\D/g, ""),
          new_value = matrix.replace(/[_\d]/g, function(a) {
              return i < val.length ? val.charAt(i++) || def.charAt(i) : a
          });
      i = new_value.indexOf("_");
      if (i != -1) {
          i < 5 && (i = 3);
          new_value = new_value.slice(0, i)
      }
      var reg = matrix.substr(0, this.value.length).replace(/_+/g,
          function(a) {
              return "\\d{1," + a.length + "}"
          }).replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
      if (event.type == "blur" && this.value.length < 5)  this.value = ""
  }

  input.addEventListener("input", mask, false);
  input.addEventListener("focus", mask, false);
  input.addEventListener("blur", mask, false);
  input.addEventListener("keydown", mask, false)

});

});