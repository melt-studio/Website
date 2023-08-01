class Twist {
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

    this.yOutside = (height - this.pgA.height)/2;

    this.yMax = map(intensity, 0, 100, 0, height);

    this. d = 1;
    if(random(10) < 5){
      this.d = -1;
    }

    this.res = 200;
    this.tl = createVector(0, 0);
    this.bl = createVector(0, this.pgA.height);
    this.tml = createVector(this.pgA.width/3, 0);
    this.bml = createVector(this.pgA.width/3, this.pgA.height);
    this.tmr = createVector(this.pgA.width * 2/3, 0);
    this.bmr = createVector(this.pgA.width * 2/3, this.pgA.height);
    this.tr = createVector(this.pgA.width, 0);
    this.br = createVector(this.pgA.width, this.pgA.height);

    this.thisXskew = 1.0;
    this.thisYskew = 1.0;
  }

  update(){
    this.ticker ++;

    var tk0 = map(this.ticker, 0, sceneLength, 0, 1);
    var tk1;
    var a0, b0;
    var a1, b1;

    if(tk0 < 0.5){
      var tk0b = map(tk0, 0, 0.5, 0, 1);
      tk1 = easeOutExpo(tk0b);
      if(this.d == 1){
        a0 = 0;
        b0 = -this.yMax/2;
        a1 = this.pgA.height;
        b1 = this.pgA.height + this.yMax/2;
      } else {
        a0 = this.pgA.height;
        b0 = this.pgA.height + this.yMax/2;
        a1 = 0;
        b1 = (this.d * this.yMax)/2;
      }
    } else {
      var tk0b = map(tk0, 0.5, 1, 0, 1);
      tk1 = easeInExpo(tk0b);
      if(this.d == 1){
        a0 = -this.yMax/2;
        b0 = -this.yMax;
        a1 = this.pgA.height + this.yMax/2;
        b1 = this.pgA.height + this.yMax;
      } else {
        a0 = this.pgA.height + this.yMax/2;
        b0 = this.pgA.height + this.yMax;
        a1 = (this.d * this.yMax)/2;
        b1 = this.d * this.yMax;
      }
    }

    if(this.d == 1){
      this.tl.y = map(tk1, 0, 1, a0, b0);
      this.tml.y = this.tl.y;
      this.bmr.y = map(tk1, 0, 1, a1, b1);
      this.br.y = this.bmr.y;
    } else {
      this.bl.y = map(tk1, 0, 1, a0, b0);
      this.bml.y = this.bl.y;
      this.tmr.y = map(tk1, 0, 1, a1, b1);
      this.tr.y = this.tmr.y;
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

      translate(-this.pgA.width/2, -this.pgA.height/2);

      texture(this.pgA);
      noStroke();

      beginShape(TRIANGLE_STRIP);
        for(var n = 0; n <= this.res; n++){
          let t = n / this.res;

          let xTop = bezierPoint(this.tl.x, this.tml.x, this.tmr.x, this.tr.x, t);
          let yTop = bezierPoint(this.tl.y, this.tml.y, this.tmr.y, this.tr.y, t);

          let xBot = bezierPoint(this.bl.x, this.bml.x, this.bmr.x, this.br.x, t);
          let yBot = bezierPoint(this.bl.y, this.bml.y, this.bmr.y, this.br.y, t);

          var u = map(xTop, 0, this.pgA.width, 0, 1);

          vertex(xTop, yTop, u, 0);
          vertex(xBot, yBot, u, 1);
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
      print("stroke on?!")
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
