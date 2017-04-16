var canvas = document.createElement('canvas');
var ctx = canvas.getContext("2d");
document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var SPEED = 40;
var STAR_NUMBER = 250;
var StarStream = Rx.Observable.range(1, STAR_NUMBER)
	.map(function() {
	  return {
		x: parseInt(Math.random() * canvas.width),
		y: parseInt(Math.random() * canvas.height),
		size: Math.random() * 3 + 1
	  };
	})
	.toArray()
	.flatMap(function(starArray) {
	  return Rx.Observable.interval(SPEED).map(function() {
		starArray.forEach(function(star) {
		  if (star.y >= canvas.height) {
			star.y = 0;
		  }
		  star.y += star.size;
		});
		return starArray;
	  });
	})
	.subscribe(function(starArray) {
	  paintStars(starArray);
	});

function paintStars(stars) {
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#ffffff';
  stars.forEach(function(star) {
	ctx.fillRect(star.x, star.y, star.size, star.size);
  });
}

var HERO_Y = canvas.height - 30;
var mouseMove = Rx.observable.fromEvent(canvas, 'mousemove');
var SpaceShip = mouseMove
	.map(function(event) {
	  return {
		x: event.clientX,
		y: HERO_Y
	  };
	})
	.startWith({
	  x: canvas.width / 2,
	  y: HERO_Y
	});

function drawTriangle(x, y, width, color, direction) {
  cx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x - width, y);
  ctx.lineTo(x, direction === 'up' ? y - width : y + width);
  ctx.lineTo(x + width, y);
  ctx.lineTo(x - width, y);
  ctx.fill();
}

function paintSpaceShip(x, y) {
  drawTriangle(x, y, 20, '#ff0000', 'up');
}
