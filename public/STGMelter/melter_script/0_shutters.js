class Shutters {
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
    this.findXpos();

    this.strokeOn = false;
    if(fillStyle == 1){
      this.strokeOn = true;
    } else if(fillStyle == 2 && random(10) < 5){
      this.strokeOn = true;
    }

    this.pg = [];
    this.makeTextures();

    this.ticker = 0;

    this.shutterAnim = [];
    this.shutterAnimBot = [];
    this.shutterYanim = [];

    this.ramp = ramp_;

    this.pacer = (sceneLength/4)/this.inp.length;

    this.thisXskew = 1.0;
    this.thisYskew = 1.0;
  }

  update(){
    this.ticker ++;

    for(var n = 0; n < this.inp.length; n++){
      var tk00 = constrain(this.ticker - this.pacer*n, 0, sceneLength);
      var tk0 = map(tk00, 0, sceneLength, 0, 1.0);

      var tk1;
      var a0, b0;
      var a1, b1;
      var a2, b2;
      if(tk0 < 0.5){
        var tk0b = map(tk0, 0, 0.5, 0, 1);
        tk1 = easeOutExpo(tk0b);
        a0 = this.pg[n].height;
        b0 = 0;
        a1 = this.pg[n].height;
        b1 = this.pg[n].height;

        a2 = this.pg[0].height/2;
        b2 = 0;
      } else {
        var tk0b = map(tk0, 0.5, 1, 0, 1);
        tk1 = easeInExpo(tk0b);
        a0 = 0;
        b0 = 0;
        a1 = this.pg[n].height;
        b1 = 0;

        a2 = 0;
        b2 = -this.pg[0].height/2;
      }

      this.shutterAnim[n] = map(tk1, 0, 1, a0, b0);
      this.shutterAnimBot[n] = map(tk1, 0, 1, a1, b1);
      this.shutterYanim[n] = map(tk1, 0, 1, a2, b2);
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
      translate(0, height/2);
      translate(this.trackFix, -this.pg[0].height/2);

      for(var n = 0; n < this.inp.length; n++){
        push();
          translate(this.xSpots[n], this.shutterYanim[n], n);

          translate(this.pg[n].width/2, -(this.shutterAnim[n] - this.shutterAnimBot[n])/2);
          scale(this.thisXskew, this.thisYskew);
          translate(-this.pg[n].width/2, (this.shutterAnim[n] - this.shutterAnimBot[n])/2);

          texture(this.pg[n]);
          noStroke();

          var vTop = map(this.shutterAnimBot[n], 0, this.pg[n].height, 1, 0);
          var vBot = map(this.pg[n].height - this.shutterAnim[n], 0, this.pg[n].height, 0, 1);

          beginShape(TRIANGLE_STRIP);
            vertex(0, this.shutterAnim[n], 0, vTop);
            vertex(0, this.shutterAnimBot[n], 0, vBot);
            vertex(this.pg[n].width, this.shutterAnim[n], 1, vTop);
            vertex(this.pg[n].width, this.shutterAnimBot[n], 1, vBot);
          endShape();
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
      var thisLetterWidth = textWidth(this.inp.charAt(n));
      var upUntilWidth = textWidth(this.inp.slice(0,n+1));
      var difference = upUntilWidth - thisLetterWidth;
      this.xSpots[n] = xStart + difference + n * this.track;
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

  makeTextures(){
    textSize(this.pgTextSize);
    textFont(this.currentFont);

    for(var n = 0; n < this.inp.length; n++){

      var repeatSize = round(textWidth(this.inp.charAt(n)));
    
      this.pg[n] = createGraphics(repeatSize, this.pgTextSize * (thisFontAdjust + 0.05));
      // this.pg[n].background(bkgdColor);
    
      if(this.strokeOn){
        this.pg[n].stroke(foreColor);
        this.pg[n].strokeWeight(textStrokeWeight);
        this.pg[n].fill(bkgdColor);
      } else {
        this.pg[n].fill(foreColor);
        this.pg[n].noStroke();
      }
      this.pg[n].textSize(this.pgTextSize);
      this.pg[n].textAlign(CENTER);
      this.pg[n].textFont(this.currentFont);
      var thisAdjust = this.pg[n].height/2 + this.pgTextSize * thisFontAdjust/2 + this.pgTextSize * thisFontAdjustUp;
      this.pg[n].text(this.inp.charAt(n), this.pg[n].width/2, thisAdjust);
    }
  }

  removeGraphics(){
    for(var n = 0; n < this.inp.length; n++){
      this.pg[n].remove();
    }
  }
}
