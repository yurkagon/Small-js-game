var playerSpeed = 2;
var playerSize = 100;

var player = document.querySelector('#player');

//setting player size
player.style.height = playerSize + 'px';
player.style.width = playerSize + 'px';
//setting the player on the center of page
player.style.top = (screen.height/2 - playerSize) + 'px';
player.style.left = (screen.width/2 - playerSize) + 'px';



//control
var toUp, toDown, toLeft, toRight;
toUp=toDown=toLeft=toRight = false;

document.body.onkeydown = function (e) {
  if (e.keyCode == 37 || e.keyCode == 65 ) toLeft = true;
  if (e.keyCode == 39 || e.keyCode == 68 ) toRight = true;
  if (e.keyCode == 38 || e.keyCode == 87 ) toUp = true;
  if (e.keyCode == 40 || e.keyCode == 83 ) toDown = true; 
  console.log(e.keyCode);
}
document.body.onkeyup = function (e) {
  if (e.keyCode == 37 || e.keyCode == 65 ) toLeft = false;
  if (e.keyCode == 39 || e.keyCode == 68 ) toRight = false;
  if (e.keyCode == 38 || e.keyCode == 87 ) toUp = false;
  if (e.keyCode == 40 || e.keyCode == 83 ) toDown = false; 
}

setInterval(function () {

  //left
  if( parseInt(player.style.left) > 0 ){ //limit left
      if (toLeft) {
        player.style.left = (parseInt(player.style.left) - playerSpeed) + 'px';
      }
  }
 
  //right
  if( parseInt(player.style.left) < screen.width - 2*playerSize ){  //limit right
   if (toRight) {
        player.style.left = (parseInt(player.style.left) + playerSpeed) + 'px';
    }
  }

  //up
  if( parseInt(player.style.top) > 0 ){ //limit top
    if (toUp) {
      player.style.top = (parseInt(player.style.top) - playerSpeed) + 'px';
    }
  }
  
  //down
  if( parseInt(player.style.top) < screen.height - 2*playerSize ){ //limit bottom
    if (toDown) {
      player.style.top = (parseInt(player.style.top) + playerSpeed) + 'px';
    }
  }
},10);


//rotation
document.getElementById('cont').onmousemove = function (e) {

  //center of player
  var centerX = parseInt(player.style.left) + playerSize/2;
  var centerY = parseInt(player.style.top) + playerSize/2; 

  
  var dx = e.pageX - centerX;
  var dy = e.pageY - centerY;

  //Math.atan2(dy, dx) returns Radians, 180/Math.PI makes it as Degree
  var degree = Math.atan2(dy, dx) * 180/Math.PI;

  player.style.transform = 'rotate(' + degree + 'deg)';
}



