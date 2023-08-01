class Shutters2 {
  constructor(ramp_, inp_){
    this.inp = inp_;

    this.track = -20;
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
    
    this.track = -this.pgTextSize * trackFactor;
    this.trackFix = -(this.inp.length - 1) * this.track/2;
    this.xSpots = [];
    this.findXpos();

    this.pg = [];
    this.makeTextures();

    this.ticker = 0;

    this.xAnim = [];

    this.shutterAnim = [];

    this.ramp = ramp_;

    this.pacer = (sceneLength/4)/this.inp.length;
  }

  update(){
    this.ticker ++;

    for(var n = 0; n < this.inp.length; n++){
      var tk00 = constrain(this.ticker - this.pacer*n, 0, sceneLength);
      var tk0 = map(tk00, 0, sceneLength, 0, 1.0);
      
      var tk1;
      var a0, b0;
      var a1, b1;
      if(tk0 < 0.5){
        var tk0b = map(tk0, 0, 0.5, 0, 1);
        tk1 = easeOutExpo(tk0b);
        a0 = 0;
        b0 = this.pg[n].width;
        a1 = width/2;
        b1 = this.xSpots[n];
      } else {
        var tk0b = map(tk0, 0.5, 1, 0, 1);
        tk1 = easeInExpo(tk0b);
        a0 = this.pg[n].width;
        b0 = 0;
        a1 = this.xSpots[n];
        b1 = this.xSpots[n];
      }

      this.shutterAnim[n] = map(tk1, 0, 1, a0, b0);
      this.xAnim[n] = map(tk1, 0, 1, a1, b1); 
    }
  }

  display(){
    background(bkgdColor);

    
    push();
      translate(0, height/2);
      translate(this.trackFix, -this.pg[0].height/2);

      for(var n = 0; n < this.inp.length; n++){
        push();
          translate(this.xAnim[n], 0);

          var uLeft = 0;
          var uRight = map(this.pg[n].width - this.shutterAnim[n], 0, this.pg[n].width, 1, 0);
          // var uRight =1;

          texture(this.pg[n]);
          noStroke();

          beginShape(TRIANGLE_STRIP);
            vertex(0, 0, uLeft, 0);
            vertex(0, this.pg[n].height, uLeft, 1);
            vertex(this.shutterAnim[n], 0, uRight, 0);
            vertex(this.shutterAnim[n], this.pg[n].height, uRight, 1);
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
        this.pg[n].strokeWeight(3);
        this.pg[n].noFill();
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
