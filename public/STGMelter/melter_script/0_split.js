class Split {
  constructor(ramp_, inp_){
    this.inp = inp_;

    this.strokeOn = false;
    if(fillStyle == 1){
      this.strokeOn = true;
    } else if(fillStyle == 2 && random(10) < 5){
      this.strokeOn = true;
    }

    // this.currentFont = tFont[int(random(4))];
    this.currentFont = currentFont;
    this.pgTextSize = 2;
    this.findTextSize();

    this.pgA;
    this.drawTextures();

    this.direction = 1;
    if(random(10) < 5){
      this.direction = -1;
    }

    this.ticker = 0;

    this.ramp = ramp_;

    this.glassFactor = 0;
    this.glassFactorMax = this.direction * map(intensity, 0, 100, 0, 50);

    this.hFactor = [];
    this.splitR = [];
    this.hFactor[0] = 0.25;
    this.hFactor[1] = 0.5;
    this.hFactor[2] = 1;

    for(var m = 0; m < 3; m ++){
      this.splitR[m] = this.hFactor[m] * this.pgA.height;
    }

    this.yFactor = [];
    var warpCount = 40;
    for(var m = 0; m < warpCount-1; m++){
      this.yFactor[m] = easeInOutExpo(m/warpCount);
    }

    this.xCenter = 0;
    this.xCenterMax = this.glassFactorMax * this.yFactor.length/4;

    this.thisXskew = 1.0;
    this.thisYskew = 1.0;
  }

  update(){
    this.ticker ++;

    var tk0 = map(this.ticker, 0, sceneLength, 0, 1);
    var tk1;

    let a, b;
    if(tk0 < 0.5){
      var tk0b = map(tk0, 0, 0.5, 0, 1);
      tk1 = easeOutExpo(tk0b);
      a = 0;
      b = this.glassFactorMax/2;
      this.xCenter = map(tk1, 0, 1, 0, this.xCenterMax);
    } else {
      var tk0b = map(tk0, 0.5, 1, 0, 1);
      tk1 = easeInExpo(tk0b);
      a = this.glassFactorMax/2;
      b = this.glassFactorMax;
      this.xCenter = map(tk1, 0, 1, this.xCenterMax, this.xCenterMax*2);
    }

    if(tk0 < 0.5){
      var tk0b = map(tk0, 0, 0.5, 0, 1);
      var tk1 = easeOutExpo(tk0b);
      this.thisXskew = map(tk1, 0, 1, xSkewStart, (xSkewStart + xSkew)/2);
      this.thisYskew = map(tk1, 0, 1, ySkewStart, (ySkewStart + ySkew)/2);
    } else {
      var tk0b = map(tk0, 0.5, 1, 0, 1);
      var tk1 = easeInExpo(tk0b);
      this.thisXskew = map(tk1, 0, 1, (xSkewStart + xSkew)/2, xSkew);
      this.thisYskew = map(tk1, 0, 1, (ySkewStart + ySkew)/2, ySkew);
    }

    this.glassFactor = map(tk1, 0, 1, a, b);
  }

  display(){
    background(bkgdColor);

    push();
      translate(width/2, height/2);

      scale(0.9);

      scale(this.thisXskew, this.thisYskew);

      translate(-this.pgA.width/2, -this.pgA.height/2);
      translate(0, -this.splitR[0] - this.splitR[1]/8); /////// ????
      texture(this.pgA);
      translate(-this.xCenter, 0);

      // stroke(foreColor);
      noStroke();

      for(var m = 0; m < 3; m++){
        beginShape(TRIANGLE_STRIP);

        var vTop = 0;
        var vBot = 0;
        if(m == 0){
          vTop = 0;
          vBot = this.hFactor[0];
        } else {
          vTop = this.hFactor[m - 1];
          vBot = this.hFactor[m];
        }

        for(var n = 0; n < this.yFactor.length; n++){

          var v = map(this.yFactor[n], 0, 1, vTop, vBot);

          vertex(n * this.glassFactor, this.splitR[m] * this.yFactor[n], 0, v);
          vertex(n * this.glassFactor + this.pgA.width, this.splitR[m] * this.yFactor[n], 1, v);
        }
        
        endShape();

        translate(0, this.splitR[m]);
      }
    pop();

  }

  findTextSize(){
    var measured = 0;
    while(measured < width){
      textSize(this.pgTextSize)
      textFont(this.currentFont);
      measured = textWidth(this.inp);

      this.pgTextSize += 2;
    }

    if(this.pgTextSize * thisFontAdjust > height * 7/8){
      this.pgTextSize = (height * 7/8)/thisFontAdjust;
    }
  }

  drawTextures(){
    textSize(this.pgTextSize);
    textFont(this.currentFont);
    var repeatSize = round(textWidth(this.inp));
  
    this.pgA = createGraphics(repeatSize, this.pgTextSize * (thisFontAdjust));
    this.pgA.background(bkgdColor);
  
    if(this.strokeOn){
      this.pgA.stroke(foreColor);
      this.pgA.strokeWeight(textStrokeWeight);
      this.pgA.noFill();
    } else {
      this.pgA.fill(foreColor);
      this.pgA.noStroke();
    }
    this.pgA.textSize(this.pgTextSize);
    this.pgA.textAlign(CENTER);
    this.pgA.textFont(this.currentFont);
    var thisAdjust = this.pgA.height/2 + this.pgTextSize * thisFontAdjust/2 + this.pgTextSize * thisFontAdjustUp;
    this.pgA.text(this.inp, this.pgA.width/2, thisAdjust);
  }

  removeGraphics(){
    this.pgA.remove();
  }
}
