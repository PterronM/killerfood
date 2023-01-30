class toxico {
  constructor(posX) {
    this.x = posX;
    this.y = 0;
    this.w = 50;
    this.h = 70;
    this.speed = 2;
    this.image = new Image();
    this.image.src = "../img/muerte.png"
  }

  // metodos
  drawToxico = () => {
    ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
  };

  moveToxico = () => {
    this.y += this.speed;
  };

  
  }

  // metodos
  drawToxico = () => {
    ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
  };

  moveToxico = () => {
    this.y += this.speed;
  };

  

