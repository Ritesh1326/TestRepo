/*
Title: Main JS File
Theme Name: Wedding
Author Name: Myweddingicon
Author URI: myweddingicon.com
====================*/
/*
Table of Contents:
------------------
1. Loader
2. Navbar on Scroll
3. Page scrolling
4. Countdown
5. Gallery
6. Form
7. Scroll To Top

/* 5. Gallery
===================================*/
$(window).load(function() {    
	$("#gallery_section").flexisel({
		visibleItems: 4,
		itemsToScroll: 1,         
		autoPlay: {
			enable: true,
			interval: 5000,
			pauseOnHover: true
		}        
	});    
});

/* 1. Loader
====================*/
'use strict';
$(window).on('load', function() {
	$('.loader').delay(1000).fadeOut('slow');
	imgIntoBg();
});

/* 2. Navbar on Scroll
====================*/
//jQuery to collapse the navbar on scroll
var newNav = $('nav.clone');
$(window).on('scroll', function() {
	if ($(this).scrollTop() > 300) {
		newNav.removeClass('unstick').addClass('stick');
	} else {
		newNav.removeClass('stick').addClass('unstick');
	}
});
if ($('.wedding-date').length != 0){
	$('.wedding-date').arctext({radius: 360});
}

/* 3. Page scrolling
=====================*/
//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
	$('a.page-scroll').on('click', function(event) {
		var $anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: $($anchor.attr('href')).offset().top-76
		}, 1500, 'easeInOutExpo');
		event.preventDefault();
		$('.navbar-collapse.in').collapse('hide');
	});
});

/* 4. Countdown
=======================*/
var countdown = document.querySelector('.countdown');
function getTimeRemaining(endtime) {
	var t = Date.parse(endtime) - Date.parse(new Date());
	var seconds = Math.floor((t / 1000) % 60);
	var minutes = Math.floor((t / 1000 / 60) % 60);
	var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
	var days = Math.floor(t / (1000 * 60 * 60 * 24));
	return {
		'total': t,
		'days': days,
		'hours': hours,
		'minutes': minutes,
		'seconds': seconds
	};
}

function initializeClock(id, endtime) {
	var clock = document.getElementById(id);
	var daysSpan = clock.querySelector('.days');
	var hoursSpan = clock.querySelector('.hours');
	var minutesSpan = clock.querySelector('.minutes');
	var secondsSpan = clock.querySelector('.seconds');
	var newChild;

	function updateClock() {
		var t = getTimeRemaining(endtime);
		var daysArr = String(t.days).split('');
		daysSpan.innerHTML = '';
		for (var i = 0; i < daysArr.length; i++){
			newChild = document.createElement('span');
			newChild.innerHTML = daysArr[i];
			daysSpan.appendChild(newChild);
		}
		var hoursArr = String(('0' + t.hours).slice(-2)).split('');
		hoursSpan.innerHTML = '';
		for (var i = 0; i < hoursArr.length; i++) {
			newChild = document.createElement('span');
			newChild.innerHTML = hoursArr[i];
			hoursSpan.appendChild(newChild);
		}
		var minuteArr = String(('0' + t.minutes).slice(-2)).split('');
		minutesSpan.innerHTML = '';
		for (var i = 0; i < minuteArr.length; i++) {
			newChild = document.createElement('span');
			newChild.innerHTML = minuteArr[i];
			minutesSpan.appendChild(newChild);
		}
		var secondArr = String(('0' + t.seconds).slice(-2)).split('');
		secondsSpan.innerHTML = '';
		for (var i = 0; i < secondArr.length; i++) {
			newChild = document.createElement('span');
			newChild.innerHTML = secondArr[i];
			secondsSpan.appendChild(newChild);
		}
		if (t.total <= 0) {
			//clearInterval(timeinterval);
		}
		
	}
	updateClock();
	var timeinterval = setInterval(updateClock, 1000);
}
// set your wedding date here
var deadline = '13 june 2017 13:00:00 UTC+5:30';
if (countdown){
	initializeClock('timer', deadline);
}

/* 6. Form
===================================*/
(function ($, window, document, undefined) {
	var $form = $('#contact-form');
	$form.submit(function (e) {
		// remove the error class
		$('.form-group').removeClass('has-error');
		$('.help-block').remove();
		// get the form data
		var formData = {
			'name' : $('input[name="form-name"]').val(),
			'email' : $('input[name="form-email"]').val(),
			'wishs' : $('input[name="form-wishs"]').val(),
		};
		// process the form
		$.ajax({
			type : 'POST',
			url  : 'form.php',
			data : formData,
			dataType : '',
			encode : trujsone
		}).done(function (data) {
			// handle errors
			if (!data.success) {
				if (data.errors.name) {
					$('#name-field').addClass('has-error');
					$('#name-field').find('.col-sm-6').append('<span class="help-block">' + data.errors.name + '</span>');
				}
				if (data.errors.email) {
					$('#email-field').addClass('has-error');
					$('#email-field').find('.col-sm-6').append('<span class="help-block">' + data.errors.email + '</span>');
				}
				if (data.errors.number) {
					$('#number-field').addClass('has-error');
					$('#number-field').find('.col-sm-6').append('<span class="help-block">' + data.errors.wishs + '</span>');
				}
			} else {
				// display success message
				$form.html('<div class="message-success">' + data.message + '</div>');
			}
		}).fail(function (data) {
			// for debug
			// console.log(data);
		});
		e.preventDefault();
	});
}(jQuery, window, document));


/* 7. Scroll To Top
==========================================*/

	var timeOut;
	function scrollToTop() {
	  if (document.body.scrollTop!=0 || document.documentElement.scrollTop!=0){
		window.scrollBy(0,-50);
		timeOut=setTimeout('scrollToTop()',10);
	  }
	  else clearTimeout(timeOut);
	}
	
	$(function() {
	  var slidebox = $('#slidebox');
	  if (slidebox.length>0) {
		$(window).scroll(function(){
			var distanceTop = $('#about').offset().top - $(window).height();
			if  ($(window).scrollTop() > distanceTop){
				slidebox.animate({'right':'0px'},300);
			}
			else{
				slidebox.stop(true).animate({'right':'-430px'},100);
			}
		});
	  }
	});

