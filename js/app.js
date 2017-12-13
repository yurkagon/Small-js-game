$(window).ready(function(){
  var playerSpeed = 2;
  var playerSize = 100;
  var bulletSize = 30;
  var bulletTime = 200;

  var player = $('#player');
  var container = $('#cont');

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


  //shooting
  $('#cont').click(function(e){
    //center of player - start position
    var centerX = parseInt(player.css('left')) + playerSize/4;
    var centerY = parseInt(player.css('top')) + playerSize/4; 

    //target position
    var wrapper = $(this).parent();
    var parentOffset = wrapper.offset(); 
    var relX = e.pageX - parentOffset.left;
    var relY = e.pageY - parentOffset.top;

    //angle of bullet
    var dx = e.pageX - centerX;
    var dy = e.pageY - centerY;
    var angle = Math.atan2(dy, dx) * 180/Math.PI;

    //adding bullet
    var bullet = $('<img/>').addClass('bullet').css({
        width: bulletSize + 'px',
        height: bulletSize + 'px',
        left: centerX,
        top: centerY,
        transform: 'rotate(' + angle + 'deg)'
    });
    bullet.attr("src", "css/img/bullet.png");
    $(this).append(bullet);


    //bullet moving
    bullet.animate({
      left: relX,
      top: relY
    },bulletTime, function(){
       $(this).remove();
    });

    //explosion
    var explosion = $('<div/>').addClass('explosion').css({
      left: relX - 57,
      top: relY - 57
    });
    setTimeout(function() { //adding
      $('#cont').append(explosion);
    }, bulletTime);
    setTimeout(function() { //removing
      $(explosion).remove();
    }, bulletTime + 1200);

  });


  //enemy
  setInterval(function(){
    var enemy =  $('.enemy');
    var bullets = $('.bullet');
    //player position
    var centerX = parseInt(player.css('left')) + playerSize/4;
    var centerY = parseInt(player.css('top')) + playerSize/4; 

    enemy.clearQueue();
    enemy.animate({
      left: centerX,
      top: centerY,

    },400, "linear");

    //collision player
    enemy.each(function(){
       //collision(player,$(this));
       //lose or health -1
    });

    //collision bullets
     enemy.each(function(){
       var t = $(this);
       bullets.each(function(){
        if(collision(t,$(this))){
          $(this).remove();
          t.remove();
        };
       });
    });
  },10);

  //enemy spawner
  setTimeout(enemySpawner,3000);
  function enemySpawner(){
    var left, top;
    var side = Math.floor((Math.random()*4));

    console.log(side);

    switch (side) {
      case 0:
        left = 0;
        top = screen.height * Math.random();
      break;
      case 1:
        left = screen.width;
        top = screen.height * Math.random();
      break;
      case 2:
        left = screen.width * Math.random();
        top = 0;
      break;
      case 3:
        left = screen.width * Math.random();
        top = screen.height;
      break;

      default:
        console.log('nothing');
      break;
    }

    //console.log(left);

    container.append($('<div/>').addClass('enemy').css({
        left: left + 'px',
        top: top + 'px'
    }));

    var nextSpawningTime = 2 * Math.random() * 1000;
    setTimeout(enemySpawner, nextSpawningTime);
  }

});

function collision($div1, $div2) {
  var x1 = $div1.offset().left;
  var y1 = $div1.offset().top;
  var h1 = $div1.outerHeight(true);
  var w1 = $div1.outerWidth(true);
  var b1 = y1 + h1;
  var r1 = x1 + w1;
  var x2 = $div2.offset().left;
  var y2 = $div2.offset().top;
  var h2 = $div2.outerHeight(true);
  var w2 = $div2.outerWidth(true);
  var b2 = y2 + h2;
  var r2 = x2 + w2;

  return !(b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2);
}
///https://github.com/jriecken/sat-js

