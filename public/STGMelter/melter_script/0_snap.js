class Snap {
  constructor(ramp_, inp_){
    this.inp = inp_;

    // this.currentFont = tFont[int(random(4))];
    this.currentFont = currentFont;
    this.pgTextSize = 2;
    this.findTextSize();
    
    this.xKern = [];
    this.xWidths = [];
    // this.xScaleMax = 0.2;
    this.xScaleMax = map(intensity, 0, 100, 1, 0.05);
    this.xScale = [];
    this.xShear = [];
    // this.xShearMax = -PI/8;
    this.xShearMax = map(intensity, 0, 100, 0, -PI/3);
    this.findSpacing();

    this.ticker = 0;

    this.ramp = ramp_;

    this.pacer = (sceneLength/8)/this.inp.length;

    this.thisXskew = 1.0;
    this.thisYskew = 1.0;
  }

  update(){
    this.ticker ++;

    for(var n = 0; n < this.inp.length; n++){
      var tk00 = constrain(this.ticker - n*this.pacer, 0, sceneLength);
      var tk0 = map(tk00, 0, sceneLength, 0, 1);
      var tk1;
      var a0, b0;
      var a1, b1;

      if(tk0 < 0.5){
        var tk0b = map(tk0, 0, 0.5, 0, 1);
        tk1 = easeOutExpo(tk0b);
        a0 = this.xScaleMax;
        b0 = (this.xScaleMax + 1)/2;
        a1 = this.xShearMax;
        b1 = this.xShearMax/2;
      } else {
        var tk0b = map(tk0, 0.5, 1, 0, 1);
        tk1 = easeInExpo(tk0b);
        a0 = (this.xScaleMax + 1)/2;
        b0 = 1;
        a1 = this.xShearMax/2;
        b1 = 0;
      }

      this.xScale[n] = map(tk1, 0, 1, a0, b0);
      this.xShear[n] = map(tk1, 0, 1, a1, b1);

      this.xWidths[n] = textWidth(this.inp.charAt(n)) * this.xScale[n];
    }

    var fullSize = 0;
    for(var n = 0; n < this.inp.length-1; n++){
      this.xKern[n] = this.xWidths[n]/2 + this.xWidths[n+1]/2;
      fullSize += this.xKern[n];
    }
    this.xKern[this.inp.length-1] = 0;

    this.xStart = -fullSize/2;

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
      translate(this.xStart, 0);
      translate(0, this.pgTextSize * thisFontAdjust/2);

      textFont(this.currentFont);
      textSize(this.pgTextSize);
      textAlign(CENTER);
      for(var n = 0; n < this.inp.length; n++){
        push();
          shearX(this.xShear[n]);
          scale(this.xScale[n], 1);
          scale(this.thisXskew, this.thisYskew);
          text(this.inp.charAt(n), 0, 0);
        pop();
        translate(this.xKern[n], 0);
      }
    pop();
  }

  findSpacing(){
    textFont(this.currentFont);
    textSize(this.pgTextSize);

    for(var n = 0; n < this.inp.length; n++){
      this.xWidths[n] = textWidth(this.inp.charAt(n));
    }
    var fullSize = 0;
    for(var n = 0; n < this.inp.length-1; n++){
      this.xKern[n] = this.xWidths[n]/2 + this.xWidths[n+1]/2;
      fullSize += this.xKern[n];
    }
    this.xKern[this.inp.length-1] = 0;

    this.xStart = -fullSize/2;
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

  removeGraphics(){

  }
}
