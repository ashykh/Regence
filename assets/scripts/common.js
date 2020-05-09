$(document).ready(function() {
	$('[data-toggle="tooltip"]').tooltip()

	//Landing Page
	var slider = $('.dashboard_section_2 ul')
  var slider_height = $('li:first', slider).height();
	$(slider).height(slider_height);
  $('>li:gt(0)', slider).hide();
  setInterval(function () {
	  var slider_height = $('li:first', slider).height();
		$(slider).height(slider_height);
    $('> li:first', slider).fadeOut(1000).next().fadeIn(1000).end().appendTo(slider);
  }, 4000);

  $('[data-target="#personalized_care"]').on('click', function() {
	 	$("#video").attr('src','https://www.youtube.com/embed/SkiyhtUynYQ?rel=0');
  })
  $('#personalized_care button').on('click', function() {
	 	$("#video").attr('src','https://www.youtube.com/embed/SkiyhtUynYQ?rel=0');
  })

  //Check Copay
  var check_form = $('#checkCopayForm')
	var submit_button = $('#checkCopaySubmit')
  $('.check_method_1 [placeholder="Month"]', check_form).focus();
  $('.check_method input', check_form).on('click', function() {
  	$('.check_method input', check_form).attr('readonly', true);
  	$(this).closest('.check_method').find('input').removeAttr('readonly');
  	$('.check_method input[readonly]', check_form).val('');
  	submit_button.attr('disabled', true);
  });
  function check_form_validate(method) {

  }
  $('input', check_form).on('change paste keyup', function() {
  	var this_method = $(this).closest('.check_method');
  	var empty = true;
  	$('input', this_method).each(function() {
  		if($(this).val() != "") {
	  		empty = false;
  		}
  		else {
  			empty = true;
	      return false;
  		} 
  	});
  	if(empty != true) submit_button.removeAttr('disabled');
  	else submit_button.attr('disabled', true);
  })

  //Registration

	function register_validation() {
  	var submit_button = $('#registrationComplete')
  	if($("#fp_username").hasClass('valid') && $("#fp_password").hasClass('valid') && $("#fp_confirm_password").hasClass('valid')) {
  		submit_button.removeAttr('disabled');
  	}
  	else {
  		submit_button.attr('disabled', true);
  	}
	}

	var PasswordHandler = {
    validate: function(event, pass) {
      var $this = $(event.currentTarget);
      var password_guidelines = $('#password_errors');

      var characterCount = 0,
            capitalLetters = 0,
            lowercaseLetters = 0,
            number = 0,
            unique = 0,
            specialCharacters = 0;

      var upperCase = new RegExp('[A-Z]'),
        lowerCase = new RegExp('[a-z]'),
        numbers = new RegExp('[0-9]'),
        specialchars = new RegExp('([!,%,&,@,#,$,^,*,?,_,~])');
      if (pass.match(specialchars)) {
        specialCharacters = 1;
      }
      else {
        specialCharacters = 0;
      }

      // Password length should be greater than 8
      if (pass.length >= 8) {
        characterCount = 1;
        password_guidelines.find('li.ucheck2').removeClass('guideline-error');
      } 
      else {
        characterCount = -1;
        password_guidelines.find('li.ucheck2').addClass('guideline-error');
      }
      // Password should have an uppercase character
      if (pass.match(upperCase)) {
        capitalLetters = 1;
      } else {
        capitalLetters = 0;
      }
      // Password should have a lowercase character
      if (pass.match(lowerCase)) {
        lowercaseLetters = 1;
      } else {
        lowercaseLetters = 0;
      }
      // Password should have a letter
      if (pass.match(upperCase) || pass.match(lowerCase)) {
        password_guidelines.find('li.ucheck3').removeClass('guideline-error');
      }
      else {
        password_guidelines.find('li.ucheck3').addClass('guideline-error');
      }

      // Password must have a number 0-9
      if (pass.match(numbers)) {
        number = 1;
        password_guidelines.find('li.ucheck4').removeClass('guideline-error');
      } 
      else {
        number = 0;
        password_guidelines.find('li.ucheck4').addClass('guideline-error');
      }

      // Password shouldn't be the same as username
      var username =  $("#fp_username").val()
      if (username !== pass) {
          unique = 1;
          password_guidelines.find('li.ucheck1').removeClass('guideline-error');
      }
      else {
          unique = 0;
          password_guidelines.find('li.ucheck1').addClass('guideline-error');
      }

      var total = number + unique + lowercaseLetters + specialCharacters + capitalLetters + characterCount;
      var score = this.getPercentage(6, total).toFixed(0);


      var passStrength = "";
      if (pass.length == 0) {
          passStrength = "";
      }
      else if (characterCount == -1 || (score > 0 && score < 50)) {
        passStrength = "weak";
      }
      else if (score > 50 && score < 90) {
        passStrength = "medium";
      }
      else if (score > 90) {
        passStrength = "strong";
      }

      $("#passStrength").text(passStrength).removeAttr('class').addClass(passStrength).show();
	    if($('li', password_guidelines).hasClass('guideline-error')) {
	    	$('#fp_password').removeClass('valid')
	    } 
	    else {
	    	$('#fp_password').addClass('valid');
	    	$('#password_errors').hide();
	    } 
    },
    getPercentage: function(a, b) {
        return((b / a) * 100);
    }
	};

  $("#fp_password").on("change paste keyup", function(e) {
    e.stopPropagation();
    var $this = $(e.currentTarget),
    pass = $this.val();
    if (pass.length !== 16) {
      PasswordHandler.validate(e, pass);
    }
    $("#fp_confirm_password").removeClass('valid').val('');
    $('#confirm_password_errors').hide();
    register_validation();
  });
  $("#fp_password").on("blur", function(e) {
      if($('#password_errors li').hasClass('guideline-error')) $('#password_errors').show();
  		else $('#password_errors').hide();
  });

  $("#fp_confirm_password").on("change paste keyup", function(e) {
      e.stopPropagation();
      var $this = $(e.currentTarget),
      confPass = $("#fp_password").val(),
      pass = $this.val();
      if (pass.length !== 16) {
        if (pass.length > 0 && (pass === confPass))  {
	        $('#confirm_password_errors li').removeClass('guideline-error');
	        $(this).addClass('valid');
	        $('#confirm_password_errors').hide();
         }
        else {
          $('#confirm_password_errors li').addClass('guideline-error');
          $(this).removeClass('valid');
        }
      }
      register_validation();
  });
  $("#fp_confirm_password").on("blur", function(e) {
      if($('#confirm_password_errors li').hasClass('guideline-error')) $('#confirm_password_errors').show();
  		else $('#confirm_password_errors').hide();
  });
  $('#fp_username').on("change paste keyup", function() {
		if($(this).val() != "") {
  		$(this).addClass('valid')
		}
		else {
  		$(this).removeClass('valid');
		} 
		register_validation();
  });

  //Static Pages
  $('.static-page-wrapper form input').on('change paste keyup', function() {
  	var this_form = $(this).closest('form');
  	var submit_button = $('input[type="submit"]', this_form)
  	var empty = true;
  	$('.static-page-wrapper form input:not([type="hidden"])').each(function() {
  		if($(this).val() != "") {
	  		empty = false;
  		}
  		else {
  			empty = true;
	      return false;
  		} 
  	});
  	if(empty != true) submit_button.removeAttr('disabled');
  	else submit_button.attr('disabled', true);
  })

});
