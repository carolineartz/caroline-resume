//Drawing with text. Skills section of digital resume

// Adapted from Generative Design book - http://www.generative-gestaltung.de - Original licence: http://www.apache.org/licenses/LICENSE-2.0

// Application variables
// var position = {x: 0, y: window.innerHeight/2};
var position = {x: 0, y: 0};
var counter = 0;
var minFontSize = 10;
var angleDistortion = 0;
var letters = "JavaScript  CSS  Agile  Ruby  Rails  Object Oriented Design  Rspec  Git  HTML5  CSS3  Sass Behavioral Driven Development   JavaScript  CSS  Agile  Ruby  Rails  Object Oriented Design  Rspec  Git  HTML5  CSS3  Sass Behavioral Driven Development  JavaScript  CSS  Agile  Ruby  Rails  Object Oriented Design  Rspec  Git  HTML5  CSS3  Sass Behavioral Driven Development  JavaScript  CSS  Agile  Ruby  Rails  Object Oriented Design  Rspec  Git  HTML5  CSS3  Sass Behavioral Driven Development  JavaScript  CSS  Agile  Ruby  Rails  Object Oriented Design  Rspec  Git  HTML5  CSS3  Sass Behavioral Driven Development  JavaScript  CSS  Agile  Ruby  Rails  Object Oriented Design  Rspec  Git  HTML5  CSS3  Sass Behavioral Driven Development  JavaScript  CSS  Agile  Ruby  Rails  Object Oriented Design  Rspec  Git  HTML5  CSS3  Sass Behavioral Driven Development  Behavioral Driven Development";

// Drawing variables
var canvas;
var context;
var mouse = {x: 0, y: 0, down: false};


function init() {
  canvas = document.getElementById( 'my-canvas' );
  context = canvas.getContext( '2d' );
  canvas.width = window.innerWidth/1.8;
  canvas.height = window.innerHeight/1.5;

  canvas.addEventListener('mousemove', mouseMove, false);
  canvas.addEventListener('mousedown', mouseDown, false);
  canvas.addEventListener('mouseup',   mouseUp,   false);
  canvas.addEventListener('mouseout',  mouseUp,  false);
  canvas.addEventListener('dblclick', doubleClick, false);

  // window.onresize = function(event) {
  //   canvas.width = window.innerWidth;
  //   canvas.height = window.innerHeight;
  // };
}


function draw() {
 if ( mouse.down ) {
    var d = distance( position, mouse );
    var fontSize = minFontSize + d/0.8;
    var letter = letters[counter];
    var stepSize = textWidth( letter, fontSize );
    var gradient = context.createLinearGradient(0,0,canvas.width,0);
    var colors = "rgb(20, 200, " + (Math.floor(Math.random() * 30) * 10) + ")";


    if (d > stepSize) {
      var angle = Math.atan2(mouse.y-position.y, mouse.x-position.x);

      gradient.addColorStop("0", colors);
      gradient.addColorStop("0.2",colors);

      context.font = fontSize + "px 'Source Code Pro'";
      context.fillStyle = gradient;

      context.save();
      context.translate( position.x, position.y);
      context.rotate( angle );
      context.fillText(letter, 0,0, 100);
      context.restore();

      counter++;
      if (counter > letters.length-1) {
        counter = 0;
      }

      position.x = position.x + Math.cos(angle) * stepSize;
      position.y = position.y + Math.sin(angle) * stepSize;

      }
  }
}


function mouseMove ( event ){
  var x;
  var y;
  if (event.offsetX !== undefined && event.offsetY !== undefined) {
    mouse.x = event.offsetX;
    mouse.y = event.offsetY;
  } else {
    mouse.x = event.layerX;
    mouse.y = event.layerY;
  }

  draw();
}

function mouseDown( event ){
  mouse.down = true;
  var x;
  var y;


  if (event.offsetX !== undefined && event.offsetY !== undefined) {
    position.x = event.offsetX;
    position.y = event.offsetY;
  } else {
    position.x = event.layerX;
    position.y = event.layerY;
  }
}


function distance( pt, pt2 ){

  var xs = 0;
  var ys = 0;

  xs = pt2.x - pt.x;
  xs = xs * xs;

  ys = pt2.y - pt.y;
  ys = ys * ys;

  return Math.sqrt( xs + ys );
}



function mouseUp( event ){
    mouse.down = false;
}

function doubleClick( event ) {
  canvas.width = canvas.width;
}

function textWidth( string, size ) {
  context.font = size + "px 'Source Code Pro'";

  if ( context.fillText ) {
    return context.measureText( string ).width;
  } else if ( context.mozDrawText) {
    return context.mozMeasureText( string );
  }

 }

// init();
window.onload = init;