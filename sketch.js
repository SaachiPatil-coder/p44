var PLAY = 1;
var END = 0;
var gameState = PLAY;

var bg,bgI,ig;
var pit,pitI;
var maskI;
var chef,chefI;
var jumpSound,dieSound,checkpointSound;
var score;
var gameOver,restart,gameOverImage,restartImage;
var virus,virusI;

function preload(){
  bgI=loadImage("road.PNG");
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
  gameOverImage=loadImage("GO.png");
  restartImage=loadImage("restart1.png");
  chefI=loadImage("chef1.png");
  virusI = loadImage("virus.png")
  pitI = loadImage("pit.jpg")
  maskI = loadImage("mask.png")
}

function setup() {
 createCanvas(displayWidth-80,displayHeight-30);
  
bg=createSprite(0,0,0,0);
bg.velocityX = -3;
bg.x = bg.width /2;
bg.addImage("bgI",bgI);
bg.scale=1.4;

  
   chef=createSprite(300,420,600,10);
  chef.addAnimation("chefI",chefI);
  chef.scale=0.2;
 // chef.velocityX=2;
  chef.debug=false;
  chef.setCollider("rectangle",0,0,chef.width,chef.height)
  
  
 virus=createSprite(50,410,600,10);
 virus.addAnimation("virusI",virusI);
 virus.scale=0.2;
 virus.debug=false;
  
  ig=createSprite(300,470,600,10);
  ig.visible=false;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImage);
  
  restart = createSprite(300,180);
  restart.addImage(restartImage);
  
  //obstaclesGroup=new Group();
  
  score=0;
}

function draw() {
 backbg("black");
  
 // console.log(chef.y);
   //Gravity
chef.velocityY = chef.velocityY + 0.8;
chef.collide(ig); 
  
   //Gravity
virus.velocityY =virus.velocityY + 0.8;
virus.collide(ig); 
  
  
   if (gameState===PLAY){
    if (bg.x < 0){
      bg.x = bg.width/2;
    }
    gameOver.visible=false;
  restart.visible=false;
    // virus.y=chef.y;
   score = score + Math.round(getFrameRate()/60);
 
    spawnObstacles();
   if (pit.isTouching(virus)){
    virus.velocityY=-12;
   }
 bg.velocityX = -(4 + 3* score/100);
  
      if(chef.isTouching(mask)){
          score = score + 1000
          checkPointSound.play() 
      }

     if(score>0 && score%100 === 0){
       checkPointSound.play() 
    }
    
 if((keyDown("space")&& chef.y >= 220)) {
   chef.velocityY = -12;
    jumpSound.play();
  }  
  
  if (chef.isTouching(pit)){
    gameState=END;
     dieSound.play();
  }
  }
else if ( gameState===END) {
  gameOver.visible=true;
  restart.visible=true;
  bg.velocityX = 0;
     chef.velocityY = 0
  
    virus.x=chef.x;

      //set lifetime of the game objects so that they are never destroyed
    pit.setLifetime(-1);
   pit.setVelocityX(0);
  
    if(mousePressedOver(restart)) {
      reset();
    }
} 
  
 
  drawSprites();
  fill("lightpink");
  textSize(20);
   text("Score: "+ score, 500,50);
}

function reset(){
  gameState=PLAY;
gameOver.visible=false;
restart.visible=false;
chef.changeAnimation("girl_running",girl_running);
  pit.destroy();
  score=0;
 virus.x=50;
}

function spawnObstacles() {
   if (frameCount % 60 === 0){
   pit = createSprite(600,450,10,40);
   obstacle.velocityX = -6 ;//+ score/100);
   
    //generate random obstacles
   var rand = Math.round(random(1,6));
     pit.addImage(pitI);
  pit.scale=0.1;
    pit.debug=false;
pit.setCollider("circle",0,0,1);
   }
     
}

function spawnmasks() {
  if (frameCount % 1000 === 0){
  var mask = createSprite(600,200,10,40);
 mask.velocityX = -6 ;//+ score/100);
  
   //generate random masks
  var rand = Math.round(random(1,6));
    mask.addImage(maskI);
 mask.scale=0.1;
   mask.debug=false;
mask.setCollider("circle",0,0,1);
  }
    
}