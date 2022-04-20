const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight; 
const totalParticles = [];

window.addEventListener("resize",function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight; 
})

const circleProperty = {
    x:undefined,
    y:undefined
}

class Particles{
    constructor(){
        // this.x = circleProperty.x;
        // this.y = circleProperty.y;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 20 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.a = Math.random()*255+1;
        this.b = Math.random()*255+1;
        this.c = Math.random()*255+1;
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x+this.size>canvas.width||this.x-this.size<0){
            this.speedX*=-1;
        }
        if (this.y+this.size>canvas.height||this.y-this.size<0){
            this.speedY*=-1;
        }
    }

    draw(){
        
        ctx.beginPath();
        ctx.fillStyle = `rgb(${this.a},${this.b},${this.c})`;
        ctx.arc(this.x,this.y,this.size,0,Math.PI * 2);
        ctx.fill();
    }
}

function initialise(){
    for (let i=0; i<150;i++){
        totalParticles.push(new Particles);
    }
}

initialise();

function moveParticle(){
    totalParticles.forEach(particle => {
        particle.update();
        particle.draw();
    });
}

canvas.addEventListener("mousemove",function(e){
    circleProperty.x=e.x;
    circleProperty.y=e.y;
    
})

function animation(){
      ctx.clearRect(0,0,canvas.width,canvas.height)
      moveParticle();
      requestAnimationFrame(animation)
}
animation();
