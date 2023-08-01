class SlitScan {
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
  
    this.ticker = 0;

    this.ramp = ramp_;

    this.res = 200;

    this.ySpaceMin = this.pgA.height/this.res;
    this.ySpaceMax = height/this.res;
    this.ySpace = 0;

    this.vSpace = [];
    this.vSpaceMin = [];
    this.vSpaceMax = [];

    this.vSpaceMaxFactor = map(intensity, 0, 100, 0.001, 2);

    for(var m = 0; m < this.res; m++){
      this.vSpaceMin[m] = map(m, 0, this.res, 0, 1);
      // this.vSpaceMax[m] = this.vSpaceMin[m] + map(noise(m * 0.5), 0, 1, -0.1, 0.1);
      var taper0 = map(m, 0, this.res, 0, TWO_PI);
      var taper1 = map(cos(taper0), 1, -1, 0, 1);
      this.vSpaceMax[m] = this.vSpaceMin[m] + map(noise(m * 0.05), 0, 1, -this.vSpaceMin[m] * this.vSpaceMaxFactor * taper1, (1 - this.vSpaceMin[m]) * this.vSpaceMaxFactor * taper1);
    }

    this.thisXskew = 1.0;
    this.thisYskew = 1.0;
  }

  update(){
    this.ticker ++;

    var tk0 = map(this.ticker, 0, sceneLength, 0, 1);
    var tk1;
    var a0, a1;

    if(tk0 < 0.5){
      var tk0b = map(tk0, 0, 0.5, 0, 1);
      tk1 = easeOutExpo(tk0b);

      a0 = this.ySpaceMin;
      a1 = this.ySpaceMax;

      for(var m = 0; m < this.res; m++){
        var taper0 = map(m, 0, this.res, 0, TWO_PI);
        var taper1 = map(cos(taper0), 1, -1, 0, 1);
        this.vSpaceMax[m] = this.vSpaceMin[m] + map(noise((m + frameCount) * 0.02), 0, 1, -this.vSpaceMin[m] * this.vSpaceMaxFactor * taper1, (1 - this.vSpaceMin[m]) * this.vSpaceMaxFactor * taper1);

        this.vSpace[m] = map(tk1, 0, 1, this.vSpaceMin[m], this.vSpaceMax[m]);
      }
    } else {
      var tk0b = map(tk0, 0.5, 1, 0, 1);
      tk1 = easeInExpo(tk0b);

      a0 = this.ySpaceMax;
      a1 = this.ySpaceMin;

      for(var m = 0; m < this.res; m++){
        var taper0 = map(m, 0, this.res, 0, TWO_PI);
        var taper1 = map(cos(taper0), 1, -1, 0, 1);
        this.vSpaceMax[m] = this.vSpaceMin[m] + map(noise((m + frameCount) * 0.02), 0, 1, -this.vSpaceMin[m] * this.vSpaceMaxFactor * taper1, (1 - this.vSpaceMin[m]) * this.vSpaceMaxFactor * taper1);

        this.vSpace[m] = map(tk1, 0, 1, this.vSpaceMax[m], this.vSpaceMin[m]);
      }
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

    this.ySpace = map(tk1, 0, 1, a0, a1);
  }

  display(){
    background(bkgdColor);

    push();
      translate(width/2, height/2);
      
      scale(this.thisXskew, this.thisYskew);

      translate(-this.pgA.width/2, -(this.res * this.ySpace)/2);

      texture(this.pgA);
      // stroke(125);
      noStroke();

      beginShape(TRIANGLE_STRIP);
        for(var n = 0; n < this.res; n++){
          var y = n * this.ySpace;

          // var v = map(n, 0, this.res, 0, 1)
          var v = this.vSpace[n];

          vertex(0, y, 0, v);
          vertex(width, y, 1, v);
        }
      endShape();
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
  
    this.pgA = createGraphics(repeatSize, this.pgTextSize * (thisFontAdjust + 0.05));
    this.pgA.background(bkgdColor);
  
    if(this.strokeOn){
      this.pgA.stroke(foreColor);
      this.pgA.strokeWeight(textStrokeWeight);
      this.pgA.fill(bkgdColor);
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
