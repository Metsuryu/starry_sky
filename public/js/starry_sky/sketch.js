const canvasX = window.innerWidth -5 || 600;
const canvasY = window.innerHeight -5 || 600;
const backgroundColor = 10;
const fr = 60;

function setup() {
	const canvas = createCanvas(canvasX, canvasY);
	canvas.parent("sketch-holder");
	background(backgroundColor);
	sky = new sky();
	frameRate(fr);
}

let shownOnce = false;
function draw() {
	if (!shownOnce) {
		sky.show();
		shownOnce = true;
	}
	sky.update();
}
