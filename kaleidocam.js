/**
 * Yonas Gebregziabher
 * M9: Another Kind of CC
 * 12/12/2023
 * CSCI 3725
 */

MOUSE_X_THRESHOLD = 640;
MOUSE_Y_THRESHOLD = 480;
KALEIDOSCOPE_SIZE = 265;

let capture;
let angle = 0;
let isClicked = false;
let mouseXPosition, mouseYPosition;
let kaleidoscopeContainer = document.querySelector("#og-scope");
let segment;

/**
 * p5.js setup function that creates the canvas,
 * and creates the web camera capture object.
 */
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL, kaleidoscopeContainer);
  capture = createCapture(VIDEO);
  capture.hide();
  frameRate(11);
  noCursor();

  // default mouse pos config
  mouseXPosition = width / 2;
  mouseYPosition = height / 2;
}

/**
 * Adjusts the mouseX and mouseY coordinates to the difference
 * of the current mouse coordinate and the thresholds
 * @param {*} currPosX: mouse x coordinate
 * @param {*} currPosY: mouse y coordinate
 * @returns updated mouse coordinates
 */
function calcNewMousePos(currPosX, currPosY) {
  if (currPosX >= MOUSE_X_THRESHOLD) {
    currPosX = MOUSE_X_THRESHOLD - (currPosX - MOUSE_X_THRESHOLD);
  }

  if (currPosY >= MOUSE_Y_THRESHOLD) {
    currPosY = MOUSE_Y_THRESHOLD - (currPosY - MOUSE_Y_THRESHOLD);
  }

  return [currPosX, currPosY];
}

/**
 *
 * @param {*} segment: blank canvas p5.js graphics
 * @param {*} posX: segment x coordinate
 * @param {*} posY: segment y coordinate
 * @param {*} offset: mouse coordinate offset amount
 */
function drawKaleidoscope(segment, posX, posY, offset) {
  push();
  translate(posX, posY);
  segment.beginShape();
  // hexagon final shape
  for (let i = 0; i < TWO_PI; i += TWO_PI / 6) {
    let x = ((2 * KALEIDOSCOPE_SIZE) / 2) * cos(i);
    let y = ((2 * KALEIDOSCOPE_SIZE) / 2) * sin(i);
    segment.vertex(x, y);
  }
  segment.endShape(CLOSE);

  newMousePos = calcNewMousePos(
    mouseXPosition + offset,
    mouseYPosition + offset
  );
  mouseXPos = newMousePos[0];
  mouseYPos = newMousePos[1];
  let component = capture.get(
    mouseXPos,
    mouseYPos,
    KALEIDOSCOPE_SIZE,
    KALEIDOSCOPE_SIZE
  );

  component.mask(segment);
  translate(KALEIDOSCOPE_SIZE / 2, KALEIDOSCOPE_SIZE / 2);
  //rotate and horizontally flip components
  for (let k = 0; k <= 16; k++) {
    rotate(k * 1.05);
    image(component, 0, 0);
    scale(1, -1);
    image(component, 0, 0);
  }

  pop();
}

/**
 * p5.js draw function to create as many kaleidoscope
 * as the window width and height can fit as long as
 * user did not pause the screen.
 */
function draw() {
  if (!isClicked) {
    rotate(angle);
    rectMode(CENTER);
    translate(-width / 2, -height / 2);
    background("black");

    if (segment == undefined) {
      segment = createGraphics(500, 500);
    }
    let margin = 20;
    rdm_offset = Math.floor(Math.random() * 6);

    // calc width of kaleidoscope including margin
    let totalWidth =
      Math.floor(width / (KALEIDOSCOPE_SIZE + margin)) *
      (KALEIDOSCOPE_SIZE + margin);
    let additionalMargin = (width - totalWidth) / 2;

    for (
      let x = additionalMargin;
      x < width - KALEIDOSCOPE_SIZE;
      x += KALEIDOSCOPE_SIZE + margin
    ) {
      for (
        let y = margin;
        y < height - KALEIDOSCOPE_SIZE;
        y += KALEIDOSCOPE_SIZE + margin
      ) {
        drawKaleidoscope(segment, x, y, rdm_offset);
      }
    }
    angle = mouseYPosition * 0.00001;
  }
}

/**
 * Event trigger to updates the mouse's
 * x and y coordinates
 */
function mouseMoved() {
  mouseXPosition = mouseX;
  mouseYPosition = mouseY;
}

/**
 * Event trigger to toggle user click
 * anywhere on the webpage. Used for freezing
 * the state of kaleidoscope so that user can capture a photo.
 */
function mouseClicked() {
  isClicked = !isClicked;
}
