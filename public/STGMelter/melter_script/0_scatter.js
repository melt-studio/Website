class Scatter {
  constructor(ramp_, inp_){
    this.inp = inp_;

    // this.currentFont = tFont[int(random(4))];
    this.currentFont = currentFont;
    this.pgTextSize = 2;
    this.findTextSize();
    
    this.xSpots = [];
    this.findXpos();

    this.posAnim = [];
    this.posTarget = [];
    this.posFall = [];
    this.rotAnim = [];
    this.rotTarget = [];

    this.xMin = map(intensity, 0, 100, 0, -2);
    this.xMax = map(intensity, 0, 100, 0, 2);
    this.yMin = map(intensity, 0, 100, 0, height/8);
    this.yMax = map(intensity, 0, 100, 0, height/2);

    this.rMax = map(intensity, 0, 100, 0, PI/4);
    // var x = random(-textWidth(this.inp.charAt(n))/2, textWidth(this.inp.charAt(n))/2);
    // var y = random(pgTextSize/8, pgTextSize * 1.5);

    this.setTargets();

    this.origin = createVector(0,0);

    this.ticker = 0;

    this.ramp = ramp_;

    this.pacer = (sceneLength/6)/this.inp.length;

    this.thisXskew = 1.0;
    this.thisYskew = 1.0;
  }

  update(){
    this.ticker ++;

    for(var n = 0; n < this.inp.length; n++){
      var tk00 = constrain(this.ticker - n*this.pacer, 0, sceneLength);
      var tk0 = map(tk00, 0, sceneLength, 0, 1);
      
      if(tk0 < 0.5){
        var tk0b = map(tk0, 0, 0.5, 0, 1);
        var tk1 = easeOutExpo(tk0b);

        this.posAnim[n] = p5.Vector.lerp(this.origin, this.posTarget[n], tk1);
        this.rotAnim[n] = map(tk1, 0, 1, 0, this.rotTarget[n]);
      } else {
        var tk0b = map(tk0, 0.5, 1, 0, 1);
        var tk1 = easeInExpo(tk0b);
        this.posAnim[n] = p5.Vector.lerp(this.posTarget[n], this.posFall[n], tk1);
        this.rotAnim[n] = map(tk1, 0, 1, this.rotTarget[n], this.rotTarget[n] * 2);
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
      translate(0, (this.pgTextSize * thisFontAdjust)/2);
      textSize(this.pgTextSize);
      textAlign(CENTER);

      fill(foreColor);
      noStroke();

      for(var n = 0; n < this.inp.length; n++){
        push();
          translate(this.xSpots[n], height/2);
          translate(this.posAnim[n].x, this.posAnim[n].y);

          translate(0, -this.pgTextSize * 0.7/2);
          rotate(this.rotAnim[n]);

          scale(this.thisXskew, this.thisYskew);

          text(this.inp.charAt(n), 0, this.pgTextSize * 0.7/2);
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
      var difference = upUntilWidth - thisLetterWidth/2;
      this.xSpots[n] = xStart + difference;
    }
  }

  setTargets(){
    for(var n = 0; n < this.inp.length; n++){
      var x = random(-textWidth(this.inp.charAt(n)) * this.xMin, textWidth(this.inp.charAt(n)) * this.xMax);
      if(n == 0 || n - this.inp.length - 1){
        x = 0;
      }
      var y = random(this.yMin, this.yMax);

      if(n%2 == 0){
        y *= -1;
      }

      this.posTarget[n] = createVector(x,y);
      this.posFall[n] = createVector(this.posTarget[n].x, this.posTarget[n].y + random(height/8, 2 *height));
      this.rotTarget[n] = random(-this.rMax, this.rMax);
    }
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
