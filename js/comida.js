class comida {
    constructor(posX, whatFood){
        this.x = posX;
        this.y = -10;
        this.w = 50;
        this.h = 55;
        this.speed = 2;
        this.valor = 10;
        this.image = new Image();
        // this.image.src ="/img/platano.png"
        if(whatFood === true){
            this.image.src = "../img/platano.png"
        }else if(whatFood === false){
            this.image.src = "../img/manzana.png"
        }

    }

    // metodos
    drawComida = ()=>{
        ctx.drawImage(
            this.image, 
            this.x, 
            this.y, 
            this.w,
            this.h);
    }

    moveComida = ()=>{
        this.y += this.speed;
    }
}