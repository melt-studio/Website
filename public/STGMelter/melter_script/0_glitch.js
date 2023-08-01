class Glitch {
  constructor(ramp_, inp_){
    this.inp = inp_;

    // this.currentFont = tFont[int(random(4))];
    this.currentFont = currentFont;
    this.pgTextSize = 2;
    this.findTextSize();

    this.strokeOn = false;
    if(fillStyle == 1){
      this.strokeOn = true;
    } else if(fillStyle == 2 && random(10) < 5){
      this.strokeOn = true;
    }

    this.pgA;
    this.drawTextures();

    this.ticker = 0;

    this.ramp = ramp_;

    this.splitCount = 0;
    this.splitH = [];
    this.animXmax = [];
    this.animX = [];
  
    var culmH = 0;
    var culmX = 0;
    while(culmH < 1){
      // this.splitH[this.splitCount] = random(0.15);
      this.splitH[this.splitCount] = 0.08;
      this.animXmax[this.splitCount] = culmX;
      this.animX[this.splitCount] = 0;

      culmH += this.splitH[this.splitCount];

      var min = map(intensity, 0, 100, 0, this.splitCount * 2);
      var max = map(intensity, 0, 100, 0, this.splitCount * 16);
      culmX += random(min, max);

      this.splitCount ++;
    }

    var remainder = culmH - this.splitH[this.splitCount];
    this.splitH[this.splitCount] = 1 - remainder;

    this.thisXskew = 1.0;
    this.thisYskew = 1.0;
  }

  update(){
    this.ticker ++;

    var tk0 = map(this.ticker, 0, sceneLength, 0, 1);
    var tk1;

    for(var m = 0; m < this.splitCount; m++){
      let a, b;
      if(tk0 < 0.5){
        var tk0b = map(tk0, 0, 0.5, 0, 1);
        tk1 = easeOutExpo(tk0b);
        a = 0;
        b = this.animXmax[m]/2;
      } else {
        var tk0b = map(tk0, 0.5, 1, 0, 1);
        tk1 = easeInExpo(tk0b);
        a = this.animXmax[m]/2;
        b = this.animXmax[m];
      }
      this.animX[m] = map(tk1, 0, 1, a, b);
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
  }

  display(){
    background(bkgdColor);

    push();
      translate(width/2, height/2);

      scale(this.thisXskew, this.thisYskew);

      // scale(0.75);
      translate(-this.pgA.width/2, -this.pgA.height/2);

      translate(-this.animX[this.splitCount - 1]/2, 0);

      texture(this.pgA);
      // stroke(0,0,255);
      noStroke();

      var culmH = 0;
      for(var m = 0; m < this.splitCount; m++){
        var vTop = map(culmH, 0, this.pgA.height, 0, 1);
        var vBot = map(culmH + this.pgA.height * this.splitH[m], 0, this.pgA.height, 0, 1);

        push();
          translate(this.animX[m], culmH);
          beginShape(TRIANGLE_STRIP);
            vertex(0, 0, 0, vTop);
            vertex(this.animX[m] * 0.75, this.pgA.height * this.splitH[m], 0, vBot);
            vertex(this.pgA.width, 0, 1, vTop);
            vertex(this.pgA.width + this.animX[m] * 0.75, this.pgA.height * this.splitH[m], 1, vBot);
          endShape();
        pop();

        culmH += this.pgA.height * this.splitH[m];
        // rect(this.animX[m], 0, this.pgA.width, this.splitH[m] * this.pgA.height);
        // translate(0, this.splitH[m] * this.pgA.height);
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
