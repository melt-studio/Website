class Scan {
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

    this.res = 200;
    this.ySpace = this.pgA.height/this.res;
    
    this.xAnim = [];
    this.xAnimMax = [];

    this.stackCount = floor(height/this.pgA.height) + 2;

    var noiseMax = map(intensity, 0, 100, 0, 600);
    var noiseRes = map(intensity, 0, 100, 0.001, 0.08);

    for(var p = 0; p < this.stackCount; p++){
      this.xAnim[p] = [];
      this.xAnimMax[p] = [];
      for(var m = 0; m < this.res; m++){
        this.xAnim[p][m] = 0;
  
        var noiseCone = 0;
        if(m < this.res/2){
          var tk0 = map(m, 0, this.res/2, 0, 1);
          noiseCone = map(easeInOutQuad(tk0), 0, 1, 0, -noiseMax);
        } else {
          var tk0 = map(m, this.res/2, this.res, 0, 1);
          noiseCone = map(easeInOutQuad(tk0), 0, 1, -noiseMax, 0);
        }
  
        noiseDetail(2, 0.1);
        this.xAnimMax[p][m] = map(noise((m + p * this.res) * noiseRes), 0, 1, -noiseCone, noiseCone);
      }
    }

    this.thisXskew = 1.0;
    this.thisYskew = 1.0;
  }

  update(){
    this.ticker ++;

    var tk0 = map(this.ticker, 0, sceneLength, 0, 1);
    var tk1;
    if(tk0 < 0.5){
      var tk0b = map(tk0, 0, 0.5, 0, 1);
      tk1 = easeOutExpo(tk0b);
      for(var p = 0; p < this.stackCount; p++){
        for(var m = 0; m < this.res; m++){
          this.xAnim[p][m] = map(tk1, 0, 1, 0, this.xAnimMax[p][m]/2);
        }
      }
    } else {
      var tk0b = map(tk0, 0.5, 1, 0, 1);
      tk1 = easeInExpo(tk0b);
      for(var p = 0; p < this.stackCount; p++){
        for(var m = 0; m < this.res; m++){
          this.xAnim[p][m] = map(tk1, 0, 1, this.xAnimMax[p][m]/2, this.xAnimMax[p][m]);
        }
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
  }

  display(){
    background(bkgdColor);

    push();
      translate(width/2, height/2);

      scale(this.thisXskew, this.thisYskew);

      translate(-this.pgA.width/2, -this.pgA.height/2);

      noStroke();
      texture(this.pgA);

      for(var m = 0; m < this.stackCount; m++){
        push();
          translate(0, -this.pgA.height * this.stackCount/2);
          translate(0, this.pgA.height * m);
          beginShape(TRIANGLE_STRIP);
            for(var n = 0; n <= this.res; n++){
              var xL = 0;
              var xR = this.pgA.width;
              var y = n * this.ySpace;

              var v = map(n, 0, this.res, 0, 1);

              vertex(xL + this.xAnim[m][n], y, 0, v);
              vertex(xR + this.xAnim[m][n], y, 1, v);
            }
          endShape();
        pop();
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
  
    this.pgA = createGraphics(repeatSize, this.pgTextSize * (thisFontAdjust + 0.02));
    // this.pgA.background(bkgdColor);
    
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
