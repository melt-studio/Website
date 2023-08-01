class Arcer {
  constructor(ramp_, inp_){
    this.inp = inp_;

    this.track = -20;
    // this.currentFont = tFont[int(random(4))];
    this.currentFont = currentFont;
    this.pgTextSize = 2;
    this.findTextSize();
    
    this.track = -this.pgTextSize * trackFactor;
    this.trackFix = -(this.inp.length - 1) * this.track/2;
    this.xSpots = [];
    this.wids = [];
    this.findXpos();

    this.yAnim = [];
    this.yTarget = [];
    this.yStart = 0;
    this.yMin = map(intensity, 0, 100, 0, height);
    this.yMax = -this.yMin;

    this.rAnim = [];
    this.rTarget = [];
    this.rTargetMax = map(intensity, 0, 100, 0, PI/2);
    this.setTargets();

    this.ticker = 0;

    this.blPadding = 25;
    this.blSpacing = (width - 2*this.blPadding)/(keyArray.length - 1);

    this.thisXskew = 1.0;
    this.thisYskew = 1.0;

    this.ramp = ramp_;
  }

  update(){
    this.ticker ++;

    var tk0 = map(this.ticker, 0, sceneLength, 0, 1);
    for(var n = 0; n < this.inp.length; n++){
      var tk1, a, b;
      
      if(tk0 < 0.5){
        var tk0b = map(tk0, 0, 0.5, 0, 1);
        tk1 = easeOutExpo(tk0b);
        a = this.yStart;
        b = this.yTarget[n]/2;
        this.rAnim[n] = map(tk1, 0, 1, 0, this.rTarget[n]/2);
      } else {
        var tk0b = map(tk0, 0.5, 1, 0, 1);
        tk1 = easeInExpo(tk0b);
        a = this.yTarget[n]/2;
        b = this.yTarget[n];
        this.rAnim[n] = map(tk1, 0, 1, this.rTarget[n]/2, this.rTarget[n]);
      }
      this.yAnim[n] = map(tk1, 0, 1, a, b);
    }
      
    if(tk0 < 0.5){
      var tk0b = map(tk0, 0, 0.5, 0, 1);
      tk1 = easeOutExpo(tk0b);
      this.thisXskew = map(tk1, 0, 1, xSkewStart, (xSkewStart + xSkew)/2);
      this.thisYskew = map(tk1, 0, 1, ySkewStart, (ySkewStart + ySkew)/2);
    } else {
      var tk0b = map(tk0, 0.5, 1, 0, 1);
      tk1 = easeInExpo(tk0b);
      this.thisXskew = map(tk1, 0, 1, (xSkewStart + xSkew)/2, xSkew);
      this.thisYskew = map(tk1, 0, 1, (ySkewStart + ySkew)/2, ySkew);
    }
  }

  display(){
    background(bkgdColor);
    push();
      translate(this.trackFix, 0);

      // translate(width/2, height/2);
      // scale(xSkew, ySkew);
      // translate(-width/2, height/2);

      // scale(0.9);
      textSize(this.pgTextSize);
      textAlign(LEFT);

      // fill(foreColor);
      // noStroke();

      // translate(this.wids[0]/4, 0);
      for(var n = 0; n < this.inp.length; n++){
        push();
          translate(this.xSpots[n], height/2);
          translate(this.wids[n]/2, this.yAnim[n]);
          rotate(this.rAnim[n]);
          // scale(xSkew, ySkew);
          scale(this.thisXskew, this.thisYskew);

          text(this.inp.charAt(n), -this.wids[n]/2, this.pgTextSize*0.7/2);
        pop();
      }
    pop();
  }

  findXpos(){
    textFont(this.currentFont);
    textSize(this.pgTextSize);
    var fullSize = textWidth(this.inp);
    var xStart = width/2 - fullSize/2;

    for(var n = 0; n < this.inp.length; n++){
      this.wids[n] = textWidth(this.inp.charAt(n));
      var upUntilWidth = textWidth(this.inp.slice(0,n+1));
      var difference = upUntilWidth - this.wids[n];
      this.xSpots[n] = xStart + difference + n * this.track;
    }
  }

  setTargets(){
    for(var n = 0; n < this.inp.length; n++){
      this.yAnim[n] = this.yMin;
      
      var tk0 = map(n, 0, this.inp.length - 1, 0, 2*PI);
      this.yTarget[n] = map(cos(tk0), 1, -1, this.yMin, this.yMax);

      if(tk0 <= PI){
        this.rTarget[n] = map(cos(tk0), 1, 0, -this.rTargetMax, 0);
      } else {
        this.rTarget[n] = map(cos(tk0), 1, 0, 0, this.rTargetMax);
      }
    }
  }

  findTextSize(){
    var measured = 0;
    while(measured < (width - (this.inp.length - 1) * this.track)){
      textSize(this.pgTextSize)
      textFont(this.currentFont);
      measured = textWidth(this.inp);

      this.pgTextSize += 2;
    }

    if(this.pgTextSize * thisFontAdjust > height * 7/8){
      this.pgTextSize = (height * 7/8)/thisFontAdjust;
    }
  }

  removeGraphics(){
  }
}
