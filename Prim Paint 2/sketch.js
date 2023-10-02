// Primitive Paint
// Mustafa Emara  
// September 28 2023
//
// Extra for Experts:
// Added triangle and oval. added the preview of the shape
let extraCanvas;// This is the second canvas that stores the drawn shapes
let CircleSize=200; // This is the initial size of the circle of the autonomous art, that always changes its size
let ShapeSize = 50;// This shape size is the initial side length of the shapes printed
let SelectedShape = "triangle"; // we start with a triangle as the first shape
let FillColour;// varaible that stores the random color of the shapes we print

function setup() {
  createCanvas(windowWidth, windowHeight);// first canvas which shows the preview of the shapes, and the autonomous art
  background(255);// white background
  extraCanvas = createGraphics(windowWidth,windowHeight);// second canvas has same width and height as original
  extraCanvas.background(255);// also white background
  FillColour = color(random(255), random(255),  random(255));// sets the fill color to be any random color
  textFont("Calibri");// text font is calibri
  textSize(50);// text size set to 50
  textAlign(CENTER);// we put text in center 
}

function draw() {
 
  image(extraCanvas,0,0);// draws the second canvas
  stroke(0);// outline of shapes is black
  strokeWeight(1.5);// thickness of outlines 
  fill(FillColour);// color of shapes is fillColor
  PreviewShapes();// Draws shapes which are the preview on the first canvas
  AutonomousArt();// The 2 circles, Drawn on the first canvas
  fill(0);// for my name, color is black
  text("Mustafa Emara", width/2, height-80);// writes my name at bottom center of page
}

function keyPressed(){// function that is checked everytime a key is pressed
  if(key === "a") { // if a is pressed draw rectangle
    SelectedShape = "rectangle" ;
  }
  else if (key === "s") {// if s is pressed draw circle
    SelectedShape = "circle";
  }
  else if (key === "d") {// if d is pressed draw square
    SelectedShape = "square";
  }
  else if (key === "f") {// if f is pressed draw triangle
    SelectedShape = "triangle";
  }
  else if (key === "g") {// if g is pressed draw oval
    SelectedShape = "oval";
  }
}

function PreviewShapes(){// function which centers the mouse on the shapes, using some geometry
  if (SelectedShape === "circle"){// for circle
    circle(mouseX, mouseY, ShapeSize);
  }
  else if (SelectedShape === "triangle"){// for the triangle(requires some trig to find coordinates relative to center)
    triangle(mouseX-ShapeSize/5, mouseY-(ShapeSize*Math.sin(60))/2, mouseX, mouseY+(ShapeSize* Math.sin(60))/2, mouseX+ShapeSize/5, mouseY- ShapeSize* Math.sin(60)/2);

  }
  else if (SelectedShape === "square") {// for square, half hiegt, half width
    square(mouseX-ShapeSize/2,mouseY-ShapeSize/2,ShapeSize);
  }
  else if (SelectedShape === "rectangle"){// for rectangle
    rect(mouseX-ShapeSize,mouseY-ShapeSize/2, 2*ShapeSize, ShapeSize);
  }
  else if (SelectedShape === "oval"){// for ellipse
    ellipse(mouseX-ShapeSize/20,mouseY-ShapeSize/20, 2*ShapeSize, ShapeSize);
  }
 
}

function mousePressed(){// function that gets checked everytime mouse is clicked
  extraCanvas.noStroke();// drawn shapes have no outline
  extraCanvas.fill(FillColour);// drawn shapes have the same fill color as in preview
 // the following is the shapes previously previewed being drawn onto the second canvas
  if (SelectedShape === "rectangle") {
    extraCanvas.rect(mouseX- ShapeSize, mouseY - ShapeSize/2, 2*ShapeSize^2, ShapeSize);
  }

  if (SelectedShape === "triangle") {
    extraCanvas.triangle(mouseX-ShapeSize/5, mouseY-(ShapeSize*Math.sin(60))/2, mouseX, mouseY+(ShapeSize* Math.sin(60))/2, mouseX+ShapeSize/5, mouseY- ShapeSize* Math.sin(60)/2);
  }
  else if (SelectedShape === "circle") {
    extraCanvas.circle(mouseX, mouseY, ShapeSize);
  }
  else if (SelectedShape ==="square") {
    extraCanvas.square(mouseX - ShapeSize/2,mouseY-ShapeSize/2, ShapeSize);
  }
  else if (SelectedShape ==="oval") {
    extraCanvas.ellipse(mouseX-ShapeSize/20,mouseY-ShapeSize/20, 2*ShapeSize, ShapeSize);
  
  }
  FillColour = color(random(255), random(255),  random(255));
//everytime mouse is clicked, new random color is filled

  
}
    

function mouseWheel(event) {
  //this function controls the shapes size using the mouse scroll wheel
  if (ShapeSize+event.delta <0){// if scrolling will make shapesize negative
    if (ShapeSize>15){// to make sure shapeSize doesnt get smaller than this
      ShapeSize-=10;// the minimum shapeSize is set to 5, 15-10=5
    }
  }
  else{
    ShapeSize+=event.delta;// otherwise ShapeSize is changed based on event.delta
  }

}

// This is the Autonomous art, one circle is stationary, the other is getting smaller until it reaches a limit
function AutonomousArt(){// doesn't get erased since its on primary canvas
  fill("red");// color for stationary circle
  circle(200,200,200);// stationary circle coordinates+size
  fill("green");// color for shrinking circle
  circle(200,200,CircleSize);// coordinates+size of shrinking circle
  CircleSize -= 2;// rate it shrinks
  if (CircleSize < 1){// limit on how much it gets smaller, then returns to original size
    CircleSize += 200;
  }
}

function keyTyped() {// this is the function that clears everything with a key. 
  if (key === " ") {// in this case its spacebar
    // clears the canvas
    extraCanvas.background(255);
  } 
}
