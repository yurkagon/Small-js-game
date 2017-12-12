var playerSpeed = 25;
var playerSize = 100;

var player = document.querySelector('#player');

//setting player size
player.style.height = playerSize + 'px';
player.style.width = playerSize + 'px';
//setting the player on the center of page
player.style.top = (screen.height/2 - playerSize) + 'px';
player.style.left = (screen.width/2 - playerSize) + 'px';



//control
document.body.onkeydown = function (e) {

  //left
  if( parseInt(player.style.left) > 0 ){ //limit left
      if (e.keyCode == 37 || e.keyCode == 65 ) {
        player.style.left = (parseInt(player.style.left) - playerSpeed) + 'px';
      }
  }
 
  //right
  if( parseInt(player.style.left) < screen.width - 2*playerSize ){  //limit right
   if (e.keyCode == 39 || e.keyCode == 68 ) {
        player.style.left = (parseInt(player.style.left) + playerSpeed) + 'px';
    }
  }

  //up
  if( parseInt(player.style.top) > 0 ){ //limit top
    if (e.keyCode == 38 || e.keyCode == 87 ) {
      player.style.top = (parseInt(player.style.top) - playerSpeed) + 'px';
    }
  }
  
  //down
  if( parseInt(player.style.top) < screen.height - 2*playerSize ){ //limit bottom
    if (e.keyCode == 40 || e.keyCode == 83 ) {
      player.style.top = (parseInt(player.style.top) + playerSpeed) + 'px';
    }
  }
}


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
  console.log(degree);
}



