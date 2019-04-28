/*
 * Plugin: ageCheck.js
 * Description: A simple plugin to verify user's age.
 * Uses sessionStorage/localStorage API to store if user is verified.
 * Options can be passed for easy customization.
 * Author: Michael Soriano
 * Author's website: http://michaelsoriano.com
 *
 */

(function ($) {
	'use strict';
	$.ageCheck = function (options) {
	  const settings = $.extend({
		minAge: 18,
		redirectTo: '',
		redirectOnFail: '',
		title: 'Age Verification',
		copy: 'You must be [age] or older',
		footer: 'By clicking submit you agree to the use of cookies',
		success: null,
		successMsg: {
		  header: 'Success!',
		  body: 'You are now being redirected back to the website ...'
		},
		underAgeMsg: 'Sorry, you are not old enough to view this site...',
		underAge: null,
		errorMsg: {
		  invalidDay: 'Day is invalid or empty',
		  invalidMonth: 'Month is invalid or empty',
		  invalidYear: 'Year is invalid or empty'
		},
		storage: 'Cookie'
	  }, options);

	  const _this = {
		month: '',
		day: '',
		year: '',
		age: '',
		errors: [],
		setValues() {
		  const day = $('.ac-container .day').val();
		  const month = $('.ac-container .month').val();
		  _this.day = day.replace(/^0+/, ''); // remove leading zero
		  _this.month = month.replace(/^0+/, ''); // remove leading zero
		  _this.year = $('.ac-container .year').val();
		},
		validate() {
		  _this.errors = [];
		  if (Number(_this.day) <= 0 || Number(_this.day) > 31) {
			_this.errors.push(settings.errorMsg.invalidDay);
		  }
		  if (Number(_this.month) <= 0 || Number(_this.month) > 12) {
			_this.errors.push(settings.errorMsg.invalidMonth);
		  }
		  if (Number(_this.year) <= 0 || Number(_this.year) > 9999) {
			_this.errors.push(settings.errorMsg.invalidYear);
		  }
		  _this.clearErrors();
		  _this.displayErrors();
		  return _this.errors.length < 1;
		},
		clearErrors() {
		  $('.errors').html('');
		},
		displayErrors() {
		  let html = '<ul>';
		  for (let i = 0; i < _this.errors.length; i++) {
			html += `<li><span>x</span>${_this.errors[i]}</li>`;
		  }
		  html += '</ul>';
		  setTimeout(() => {
			$('.ac-container .errors').html(html);
		  }, 200);
		},
		reCenter(b) {
		  b.css('top', `${Math.max(0, (($(window).height() - (b.outerHeight() + 150)) / 2))}px`);
		  b.css('left', `${Math.max(0, (($(window).width() - b.outerWidth()) / 2))}px`);
		},
		buildHtml() {
		  const copy = settings.copy;
		  let html = '';
		  html += '<div class="ac-overlay"></div>';
		  html += '<div class="ac-container">';
		  if (settings.imgLogo != '') {
			html += '<img src="' + settings.imgLogo + '" alt="' + settings.title + '" />';
		  }
		  if (settings.title != '') {
			html += `<h2>${settings.title}</h2>`;
		  }
		  html += `<p>${copy.replace('[age]', `<strong>${settings.minAge}</strong>`)}` + '</p>';
		  html += '<div class="errors"></div>';
		  html += '<div class="fields">';
		  html += '<input class="day" maxlength="2" placeholder="DD" />';
		  html += '<input class="month" maxlength="2" placeholder="MM" />';
		  html += '<input class="year" maxlength="4" placeholder="YYYY"/>';
		  html += '<br>';
		  html += '<button>Submit</button></div>';
		  if (settings.footer != '') {
		    html += `<small>${settings.footer}</small>`;
		  }
		  html += '</div>';

		  $('body').append(html);

		  $('.ac-overlay').animate({
			opacity: 0.8,
		  }, 500, () => {
			_this.reCenter($('.ac-container'));
			$('.ac-container').css({
			  opacity: 1,
			});
		  });
		},
		setAge() {
		  _this.age = '';
		  const birthday = new Date(_this.year, _this.month, _this.day);
		  const ageDifMs = Date.now() - birthday.getTime();
		  const ageDate = new Date(ageDifMs); // miliseconds from epoch
		  _this.age = Math.abs(ageDate.getUTCFullYear() - 1970);
		},
		setCookie(key, val) {
			var d = new Date();
			d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
			var expires = "expires="+d.toUTCString();
			document.cookie = key + "=" + val + ";" + expires + ";path=/";
			return true;
		},
		handleSuccess() {
		  const successMsg = `<h3>${settings.successMsg.header}</h3><p>${settings.successMsg.body}</p>`;
		  $('.ac-container').html(successMsg);
		  setTimeout(() => {
			$('.ac-container').animate({
			  top: '-350px',
			}, 200, () => {
			  $('.ac-overlay').animate({
				opacity: '0',
			  }, 500, () => {
				if (settings.redirectTo !== '') {
				  window.location.replace(settings.redirectTo);
				} else {
				  $('.ac-overlay, .ac-container').remove();
				  if (settings.success) {
					settings.success();
				  }
				}
			  });
			});
		  }, 2000);
		},
		handleUnderAge() {
		  const underAgeMsg = `<h3>${settings.underAgeMsg}</h3>`;
		  setTimeout(() => {
			  window.location.assign("http://www.justaplant.com/story/01.html");
		  }, 1000);
		  $('.ac-container').html(underAgeMsg);
		  if (settings.redirectOnFail !== '') {
			setTimeout(() => {
			  window.location.replace(settings.redirectOnFail);
			}, 1000);
		  }
		  if (settings.underAge) {
			settings.underAge();
		  }
		},
	  }; // end _this

	  function getCookie(key) {
		var name = key + "=";
		var ca = document.cookie.split(';');
		for(var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	  }
	  if (getCookie('ageVerified') === 'true') {
		return false;
	  }

	  _this.buildHtml();

	  $('.ac-container button').on('click', () => {
		_this.setValues();
		if (_this.validate() === true) {
		  _this.setAge();

		  if (_this.age >= settings.minAge) {
			_this.setCookie('ageVerified', 'true');
			_this.setCookie('viewed_cookie_policy', 'true');
			CLI.accept_close();
			_this.handleSuccess();
		  } else {
			_this.handleUnderAge();
		  }
		}
	  });

	  $(window).resize(() => {
		_this.reCenter($('.ac-container'));
		setTimeout(() => {
		  _this.reCenter($('.ac-container'));
		}, 500);
	  });
	};
  }(jQuery));
