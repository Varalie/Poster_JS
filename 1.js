$(window).load(function() {
  //Enable mobile support
  var supportTouch = $.support.touch,
    scrollEvent = "touchmove scroll",
    touchStartEvent = supportTouch ? "touchstart" : "mousedown",
    touchStopEvent = supportTouch ? "touchend" : "mouseup",
    touchMoveEvent = supportTouch ? "touchmove" : "mousemove";
 
  //Initialitzate the puzzle
  setTimeout(function() {
    randomizer();
  }, 1000);
  
  //Initialitzate the puzzle
  var settings = {
      size: 200,
      margin: 0,
      perspective: 450
    },
    hexaFlip = [];
  
  //Generate the 9 cubes.
  for (var i = 1; i < 10; ++i) {
    if(i==5){
      hexaFlip[i] = new HexaFlip('#hexaflip-container-' + i + '', {
        set1: ['./img/cat_'+i+'.jpg','./img/rabbit_'+i+'.jpg','./img/koala_'+i+'.jpg','./img/logo.jpg' ]
      }, settings);
    }else{
      hexaFlip[i] = new HexaFlip('#hexaflip-container-' + i + '', {
        set1: ['./img/cat_'+i+'.jpg','./img/rabbit_'+i+'.jpg','./img/koala_'+i+'.jpg','./img/ph.jpg' ]
      }, settings);
    }  
  }
  

  $("#button").click(function(){
    $('.popup').show().transit({
            opacity: 1
          });
          $('#popup .image-wrapper').addClass('animate');
          setTimeout(function() {
            $('#popup .copy-wrapper').addClass('animate');
          }, 600);
  })


 //Re-initalize the puzzle when it's done
 $('#play').bind('click', function() {
   $('#popup').transit({
      opacity: 0,
      delay: 100
    }, function() {
      $(this).hide();
      randomizer();
    });
 });
  
  //Randomize the number of flips when initialize the puzzle
  var randomizer = function() {
    for (var j = 1; j < 10; j++) {
      var random = Math.floor(Math.random() * 6) + 2;
      for (var i = 1; i < random; i++) {
        hexaFlip[j].flip();
      }
    }
  };
  
  //When transition ends, check if the cube is completed.
  $('.hexaflip-cube').bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(event) {
    var passcode = [];
    for (var i = 0; i < 9; ++i) {
      passcode[i] = String(hexaFlip[i + 1].getValue());
      if (passcode.length === 9) {
        var r = passcode.allValuesSame();
        if (r === true) {
          
        }
      }
    }
  });
  
  //Function to compare if all the vallues are the same.
  Array.prototype.allValuesSame = function() {
    for (var i = 1; i < this.length; i++) {
      if (this[i] !== this[0])
        return false;
    }
    return true;
  }

});