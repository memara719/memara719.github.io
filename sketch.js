let pos = 25;

function draw() {
  background(237, 34, 93);
  fill(0);
  rect(25, pos, 50, 50);
  describe(`black 50-by-50 rect moves up and down with vertical scroll.
    fuchsia background`);
}

function mouseWheel(event) {
  print(event.delta);
  //move the square according to the vertical scroll amount
  pos += event.delta;
  //uncomment to block page scrolling
  //return false;
}