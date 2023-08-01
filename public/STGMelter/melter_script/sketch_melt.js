var tFont = [];
var pgTextSize = 100;
var bkgdColor, foreColor;
var colorA = [];

var main;
var selector = 0;
var fullMainWidth;
var budgeCenter = 0;

var mainFlash;
// var sceneLength = 30;
var sceneLength = 45;

var starterText = "MELT\nWITH\nNETFLIX";

var rampCounter = 0;

var thisFont = 0;
var currentFont = 0;
var thisFontAdjust = 0.7;
var thisFontAdjustUp = -0.2;

var flashCount = 15;
var sceneOn = [];
var sceneCount = flashCount;

var selectedFont;

var widgetOn = true;

let encoder;

const frate = 30;
var numFrames = 100;
let recording = false;
let recordedFrames = 0;

let sceneRepeats = 2;
let thisDensity = 2;

let cwidth, cheight;
let saveMode = 0;

let coreCounter = 0;
let recMessageOn = false;
let colorSwapOn = true;

let sHold = 0;

let trackFactor = 0.06;

let intensity = 50;
let xSkewStart = 1.0;
let xSkew = 1.0;
let ySkewStart = 1.0;
let ySkew = 1.0;

let fillStyle = 0;
let textStrokeWeight = 3;

function preload(){
  tFont[0] = loadFont("resources/Archivo-Light.ttf");
  tFont[1] = loadFont("resources/Archivo-Regular.ttf");
  tFont[2] = loadFont("resources/Archivo-Medium.ttf");
  tFont[3] = loadFont("resources/Archivo-SemiBold.ttf");
  tFont[4] = loadFont("resources/Archivo-Bold.ttf");
  tFont[5] = loadFont("resources/Archivo-Black.ttf");

  currentFont = tFont[1];
  thisFontAdjust = 0.7;
  thisFontAdjustUp = 0;
}

function setup(){
  createCanvas(windowWidth,windowHeight,WEBGL);

  for(var n = 0; n < flashCount; n++){
    sceneOn[n] = true;
  }

  cwidth = width;
  cheight = height;

  thisDensity = pixelDensity();

  bkgdColor = color('#000000');
  foreColor = color('#ffffff');
  colorA[0] = color('#f25835');
  colorA[1] = color('#0487d9');
  colorA[2] = color('#014029');
  colorA[3] = color('#f2ae30');
  colorA[4] = color('#f2aec1');

  frameRate(frate);
  textureMode(NORMAL);

  document.getElementById("textArea").value = starterText;
  setText(starterText);
}

function draw(){
  background(bkgdColor);
  ortho(-width / 2, width / 2, -height / 2, height / 2, -10000, 10000);
  
  push();
    translate(-width/2, -height/2);

    mainFlash.update();
    mainFlash.display();
  pop();

  runRecording();

  if((coreCounter+1) % sceneLength == 0){
    pickScene();
  }

  coreCounter ++;
}

function pickScene(){
  if(mainFlash != null){
    mainFlash.removeGraphics();
  }

  if(selector == keyArray.length){
    selector = 0;
  }

  var currentText = keyArray[selector];
  if(sceneCount == 0){
    mainFlash = new Blank(rampCounter%2, currentText);
  } else {
    var sceneSelecting = true;
    var rs0 = random(flashCount * 10);

    while(sceneSelecting){
      if(rs0 < 10 && sceneOn[0]){
        mainFlash = new Arcer(rampCounter%2, currentText);
        sceneSelecting = false;
      } else if(rs0 > 10 && rs0 < 20 && sceneOn[1]){
        mainFlash = new Bend(rampCounter%2, currentText);
        sceneSelecting = false;
      } else if(rs0 > 20 && rs0 < 30 && sceneOn[2]) {
        mainFlash = new BugEyes(rampCounter%2, currentText);
        sceneSelecting = false;
      } else if(rs0 > 30 && rs0 < 40 && sceneOn[3]){
        mainFlash = new Shutters(rampCounter%2, currentText);
        sceneSelecting = false;
      // } else if(rs0 > 40 && rs0 < 50 && sceneOn[4]){
      //   mainFlash = new Shutters2(rampCounter%2, currentText);
      //   sceneSelecting = false;
      } else if(rs0 > 40 && rs0 < 50 && sceneOn[4]){
        mainFlash = new SlotMachine(rampCounter%2, currentText);
        sceneSelecting = false;
      } else if(rs0 > 50 && rs0 < 60 && sceneOn[5]){
        mainFlash = new Snap(rampCounter%2, currentText);
        sceneSelecting = false;
      } else if(rs0 > 60 && rs0 <= 70 && sceneOn[6]) {
        mainFlash = new Twist(rampCounter%2, currentText);
        sceneSelecting = false;
      } else if(rs0 > 70 && rs0 < 80 && sceneOn[7]){
        mainFlash = new Split(rampCounter%2, currentText);
        sceneSelecting = false;
      } else if(rs0 > 80 && rs0 <= 90 && sceneOn[8]) {
        mainFlash = new Droop(rampCounter%2, currentText);
        sceneSelecting = false;
      } else if(rs0 > 90 && rs0 <= 100 && sceneOn[9]) {
        mainFlash = new Glitch(rampCounter%2, currentText);
        sceneSelecting = false;
      } else if(rs0 > 100 && rs0 <= 110 && sceneOn[10]) {
        mainFlash = new Scatter(rampCounter%2, currentText);
        sceneSelecting = false;
      } else if(rs0 > 110 && rs0 <= 120 && sceneOn[11]) {
        mainFlash = new Scan(rampCounter%2, currentText);
        sceneSelecting = false;
      // } else if(rs0 > 130 && rs0 <= 140 && sceneOn[13]) {
      //   mainFlash = new OddOne(rampCounter%2, currentText);
      //   sceneSelecting = false;
      } else if(rs0 > 120 && rs0 <= 130 && sceneOn[12]) {
        mainFlash = new SlitScan(rampCounter%2, currentText);
        sceneSelecting = false;
      } else {
        rs0 = random(flashCount * 10);
      }
    }
  }

  rampCounter ++;
  selector ++;
}

function checkTime(i){
  if (i < 10) {i = "0" + i};
  return i;
}

function rgbToHex(r, g, b) {
  return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}

function windowResized(){
  resizeForPreview();
}

function resizeForSave(){
  if(saveMode == 0){
    resizeCanvas(windowWidth, windowHeight,WEBGL);
  } else if(saveMode == 1){
    resizeCanvas(1080, 1920, WEBGL);
  } else if(saveMode == 2){
    resizeCanvas(1080, 1080, WEBGL);
  } else if(saveMode == 3){
    resizeCanvas(1920, 1080, WEBGL);
  }
}

function resizeForPreview(){
  var tempWidth, tempHeight;

  if(saveMode == 0){
    resizeCanvas(windowWidth, windowHeight,WEBGL);
  } else if(saveMode == 1){
    if(windowWidth > windowHeight * 9/16){
      tempHeight = windowHeight;
      tempWidth = windowHeight * 9/16;
    } else {
      tempWidth = windowWidth;
      tempHeight = windowWidth * 16/9;
    }
    resizeCanvas(tempWidth, tempHeight, WEBGL);
  } else if(saveMode == 2){
    if(windowWidth < windowHeight){
      tempWidth = windowWidth;
      tempHeight = windowWidth;
    } else {
      tempHeight = windowHeight;
      tempWidth = windowHeight;
    }
    resizeCanvas(tempWidth, tempHeight, WEBGL);
  } else if(saveMode == 3){
    if(windowWidth > windowHeight * 16/9){
      tempHeight = windowHeight;
      tempWidth = windowHeight * 16/9;
    } else {
      tempWidth = windowWidth;
      tempHeight = windowWidth * 9/16;
    }
    resizeCanvas(tempWidth, tempHeight, WEBGL);
  }

  cwidth = width;
  cheight = height;
}