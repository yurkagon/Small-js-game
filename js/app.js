$(window).ready(function(){
  var playerSpeed = 2;
  var playerSize = 100;

  var player = $('#player');

  //setting player size
  player.css('height', playerSize + 'px');
  player.css('width', playerSize + 'px');
  //setting the player on the center of the page
  player.css('top', (screen.height/2 - playerSize) + 'px');
  player.css('left', (screen.width/2 - playerSize) + 'px');



  //control
  var toUp, toDown, toLeft, toRight;
  toUp=toDown=toLeft=toRight = false;

  $('body').keydown(function (e) {
    if (e.keyCode == 37 || e.keyCode == 65 ) toLeft = true;
    if (e.keyCode == 39 || e.keyCode == 68 ) toRight = true;
    if (e.keyCode == 38 || e.keyCode == 87 ) toUp = true;
    if (e.keyCode == 40 || e.keyCode == 83 ) toDown = true; 
    console.log(e.keyCode);
  });
  $('body').keyup(function (e) {
    if (e.keyCode == 37 || e.keyCode == 65 ) toLeft = false;
    if (e.keyCode == 39 || e.keyCode == 68 ) toRight = false;
    if (e.keyCode == 38 || e.keyCode == 87 ) toUp = false;
    if (e.keyCode == 40 || e.keyCode == 83 ) toDown = false; 
  });

  //movement
  setInterval(function () {

    //left
    if( parseInt(player.css('left')) > 0 ){ //limit left
        if (toLeft) {
          player.css('left', (parseInt(player.css('left')) - playerSpeed) + 'px');
        }
    }
   
    //right
    if( parseInt(player.css('left')) < screen.width - 2*playerSize ){  //limit right
     if (toRight) {
          player.css('left', (parseInt(player.css('left')) + playerSpeed) + 'px');
      }
    }

    //up
    if( parseInt(player.css('top')) > 0 ){ //limit top
      if (toUp) {
        player.css('top', (parseInt(player.css('top')) - playerSpeed) + 'px');
      }
    }
    
    //down
    if( parseInt(player.css('top')) < screen.height - 2*playerSize ){ //limit bottom
      if (toDown) {
        player.css('top', (parseInt(player.css('top')) + playerSpeed) + 'px');
      }
    }
  },10);


  //rotation
  var mouseX,mouseY;
  $('#cont').mousemove(function(e){
    mouseX = e.pageX;
    mouseY = e.pageY;
  });
  setInterval(function () {

    //center of player
    var centerX = parseInt(player.css('left')) + playerSize/2;
    var centerY = parseInt(player.css('top')) + playerSize/2; 

    var dx = mouseX - centerX;
    var dy = mouseY - centerY;

    //Math.atan2(dy, dx) returns Radians, 180/Math.PI makes it as Degree
    var degree = Math.atan2(dy, dx) * 180/Math.PI;

    player.css('transform', 'rotate(' + degree + 'deg)');
  },10);

});


