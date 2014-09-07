var newClass = '';
var checkingFK = false;

function checkAvail(fk) {
  if (fk.length < 5) {
    $("#availability").html('<span class="error">Too short</span>');
  } else if (fk.length > 30) {
    $("#availability").html('<span class="error">Too long</span>');
  } else {
    if (!checkingFK) {
      checkingFK = true;
      $("#availability").load('/?lid=1&tmpl=getavail&tag='+escape(fk));
      checkingFK = false;
    }
  }
}

$(document).ready(function(){
  var stop = false;

    $(".accordion").accordion({
        autoHeight: false,
        navigation: true,
        collapsible: true
    })

  $(".tabbed").tabs({
    ajaxOptions: {
      error: function(xhr, status, index, anchor) {
        $(anchor.hash).html("Error fetching page");
      }
    }
  });
  $(".tabbed1").tabs();


  //fade out 'actionresult' user feedback
  $('.actionresult').delay(4000).fadeOut(4000); 
  //fade out 'result' user feedback
  $('.result').delay(4000).fadeOut(4000); 

  //$("#foreignkey").keydown(function (e) {
    //// stop spaces
    //if (e.keyCode == 32) {
      //return false;
    //}
    //// a = 65, z=90, 0=48, 9=57
    //// bksp=8, arleft=37, arright=39
    //if ((e.keyCode < 48 || e.keyCode > 90) || (e.keyCode > 57 && e.keyCode < 65)) {
      //alert(e.keyCode);
      //return false;
    //}
  //})

  $("#foreignkey").keyup(function(e) {
    var val = $(this).val();
    checkAvail(val);
  })
  
  $("#foreignkey").blur(function(e) {
    var val = $(this).val();
    checkAvail(val);
  })

  $("#password").keyup(function(e) {
    var val = $(this).val();
    if (val.length < 8) {
      $("#passwordfeedback").html('<span class="error">Too short</span>');
    } else {
      var hasnumbers = new RegExp('[0-9]+');
      var hasletters = new RegExp('[a-zA-Z]+');// 
      if (val.match(hasnumbers) && val.match(hasletters)) {
        $("#passwordfeedback").html('<span class="available">Password OK</span>');
      } else {
        $("#passwordfeedback").html('<span class="error">Password needs to have both letters and numbers</span>');
      }
    }
  })
    
  $("#passwordcheck").keyup(function(e) {
    var val = $(this).val();
    var pwd = $("#password").val();
    if (val != pwd) {
      $("#passwordfeedback").html('<span class="error">Passwords are not the same</span>');
    } else {
      $("#passwordfeedback").html('<span class="available">Password OK</span>');
    }
  })

  $("#currencySelector").change(function() {
    $("#currencychoice").submit();
  });
  $(".tincaninvoice").click(function() {
    alert("Invoice unavailable");
  })
  $("#opencancelpp").click(function() {
    $("#cancelpp").show();
    $(this).hide();
  })
  $("#canceloops").click(function() {
    $("#opencancelpp").hide();
    $("#cancelpp").hide();
  })
  $("#cancelyes").click(function() {
    $("#cancelyes").load('/?lid=1&tmpl=cancelpp&hash='+$(this).attr("href").substr(1,50));
    $("#opencancelpp").hide();
    $("#cancelpp").hide();
    $("#cancelppsent").fadeIn(4000); 
  })
  
  $("#openeraseacct").click(function() {
    $("#eraseacct").show();
    $(this).hide();
  })
  $("#openconfirmdownload").click(function() {
    $("#confirmdownload").show();
    $("#confirmdownload").load('/?lid=1&tmpl=requestdownload');
    $("#openconfirmdownload").hide();
  })
  $("#eraseacctyes").click(function() {
    $("#eraseacctyes").load('/?lid=1&eraseall=yes&tmpl=removeacct&hash='+$(this).attr("href").substr(1,50));
    $("#openeraseacct").hide();
    $("#eraseacct").hide();
    $("#eraseacctdone").fadeIn(4000); 
  })
  $("#eraseacctoops").click(function() {
    $("#openeraseacct").hide();
    $("#eraseacct").hide();
    $("#eraseacctcancelled").fadeIn(4000); 
  })

  $("#paypaldelaynotice").delay(4000).fadeOut(4000);

  $("#lefttosend").click(function() {
    $("#futurecredits").toggle(500);
    $("#arrowopen").toggle();
    $("#arrowclose").toggle();
  });
  $(".tabbed").tabs();
  
  $("#paywithpaypal").click(function() {
    $("#paymentform").attr('action', '/paypal.php');
    //var action=$("#paymentform").attr("action");
    $("#paymentform").submit();
    return false;
  })
  
  var choice = $('input:radio[name=amountSelect]:checked').val();
  $("#responsiblediscount").click(function() {
    $("#explaindiscount").toggle();
    return false;
  });

  $("#fidelity").click(function() {
    $("#explainfidelity").toggle();
    return false;
  });
  $("#topuptext").click(function() {
    $("#explaintopup").toggle();
    return false;
  });
  
  $("#explaintopup").click(function() {
    $("#explaintopup").toggle();
    return false;
  });
  $("#fidelitycost").click(function() {
    $("#fidelitycostexplain").toggle();
    return false;
  });
  $("#fidelitycost").blur(function() {
    $("#fidelitycostexplain").hide();
    return false;
  });
  $("#openMoreChoices").click( function() {
    $("#moreAmountChoices").show();
    $("#openMoreChoices").hide();
  })
  
	$('a.insidelink').bind('click',function (e) {
	    e.preventDefault();

	    var target = this.hash,
	    $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 900, 'swing', function () {
	        window.location.hash = target;
	    });
	});
	
	var bttoffset = 220;
    var bttduration = 500;
    $(window).scroll(function() {
        if ($(this).scrollTop() > bttoffset) {
            $('.back-to-top').fadeIn(bttduration);
        } else {
            $('.back-to-top').fadeOut(bttduration);
        }
    });
    
    $('.back-to-top').click(function(event) {
        event.preventDefault();
        $('html, body').animate({scrollTop: 0}, bttduration);
        return false;
    })
    
})
