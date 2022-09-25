var START = 1
var PLAY = 2;
var END = 0;
var gameState = START;

var monkey , monkey_running,ground,groundI,mpS,meS, invisibleGround,goS,go,goI,h,hI,e,eI,r,rI,q,qI,qS,qic,qicI;
var banana ,bananaImage, obstacle, obstacleImage,bg,bgI,bird,birdI,jS,md;
var FoodGroup, obstaclesGroup,bGroup;
var score,survival,bgS,bk,play,bkI,playI;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png","sprite_9.png","sprite_10.png","sprite_11.png","sprite_12.png","sprite_13.png");
  
  birdI = loadAnimation("b1.png","b2.png","b3.png","b4.png","b5.png","b6.png","b7.png","b8.png","b9.png","b10.png","b11.png","b12.png","b13.png","b14.png","b15.png")
  
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundI = loadImage("grnd.png");
  bgI = loadImage("bg2.png");
  bgS = loadSound("Banana Kong.mp3")
  mpS = loadSound("monkey.mp3");
  meS = loadSound("yummy.mpeg");
  jS  = loadSound("bubble_mail.mp3")
  bkI = loadImage("bk logo.png");
  playI = loadImage("play icon.png");
  goS = loadSound("GOS.wav");
  goI = loadImage("go.png");
  md = loadAnimation("md.png");
  eI = loadImage("e.png");
  rI = loadImage("r.png");
  
}

function setup() {
  createCanvas(650,300);
  
  bg = createSprite(300,150);
  bg.addImage("bg",bgI);
  bg.scale = 0.8;
  
  invisibleGround = createSprite(200,315,650,110);
  invisibleGround.visible = false;
  
  monkey = createSprite(80,240,20,20);
  monkey.addAnimation("monkey",monkey_running);
  monkey.addAnimation("m",md);
  monkey.scale = 0.3;
  monkey.frameDelay = 1;
  
  ground = createSprite(350,287,700,20);
  ground.addImage("g",groundI);
  ground.scale =1;
  
  bk = createSprite(325,130)
  bk.addImage("b",bkI);
  bk.scale= 0.70
  
  play = createSprite(325,250);
  play.addImage("p",playI);
  
  obstaclesGroup = createGroup();
  FoodGroup = createGroup();
  bGroup = createGroup();
  
  go = createSprite(325,150);
  go.addImage("g",goI);
  
  e = createSprite(270,250,40,40);
  e.addImage("e",eI)
  e.scale = 0.88
  
  r = createSprite(380,250,40,40);
  r.addImage("r",rI)
  r.scale = 0.88
  
  score = 0;
  survival =30;
  
  monkey.setCollider("circle",0,0,85);
  monkey.debug = false;
}


function draw() {
  background("white");

  if(gameState === START){
  if(mousePressedOver(play)){
    start();
    bgS.loop();
  bgS.setVolume(0.21);
}  
    FoodGroup.destroyEach();
  obstaclesGroup.destroyEach();
  bGroup.destroyEach();
  monkey.changeAnimation("monkey",monkey_running);
  monkey.frameDelay = 1;
   play.visible = true; 
  bk.visible = true; 
   go.visible=false;
   e .visible=false;
   r.visible=false;
  score = 0;
  survival = 30;
}
  
 else if(gameState === PLAY){
  bg.velocityX = -(4+score/100);
  ground.velocityX = -(6+ 3* score/100);
  
   go.visible=false; 
   play.visible = false; 
  bk.visible = false; 
  
  score = score + Math.round(getFrameRate()/60); 
  
 if(frameCount % 60== 0 && survival > 0) {
 survival --;
  }
  
  if (bg.x < -200){
      bg.x = bg.width/3;
    }

 if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  
   monkey.velocityY =  monkey.velocityY + 1

 if(keyDown("space")&& monkey.y >=230){
    monkey.velocityY = -15  ;  
    jS.play();
  }
  
 if (monkey.isTouching(FoodGroup)){
    FoodGroup[0].destroy();
    score = score + 2
    survival = survival +1
    meS.play();
  }
  
 if (monkey.isTouching(obstaclesGroup)){
  monkey.velocityY = -12 ;
   survival = survival-5
      
   obstaclesGroup[0].destroy();
    
    mpS.play();
  }

 if (monkey.isTouching(bGroup)){
   survival = survival-4
    bGroup[0].destroy();
    mpS.play();
  }
    
  if (score>250){ 
  Sbird(); 
  }
    
  if (survival <1){
    gameState = END;
    goS.play();
  }
  Cobstacles();
  Cbanana();
  }
  else if (gameState === END){
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    bGroup.setLifetimeEach(-1);
    FoodGroup.setVelocityXEach(0); 
    bGroup.setVelocityXEach(0); 
    obstaclesGroup.setVelocityXEach(0); 
    monkey.frameDelay = 2.11;
    bGroup.frameDelay = 2.11
    bgS.stop();
    monkey.scale = 0.5
    monkey.y = 200;
    bg.velocityX= 0
    ground.velocityX= 0
    monkey.velocityY= 0
    go.visible=true;
    monkey.changeAnimation("m",md);
    e .visible=true;
    r.visible=true;
    
    
    if(mousePressedOver(e)){
      reset();
    }
    
     if(mousePressedOver(r)){
      again();
    }
  }

 
 
  monkey.collide(invisibleGround);
  
  drawSprites();
  
  fill ("yellow");
  stroke("orange");
  textFont("Copperplate")
  strokeWeight(3)
  textSize(15)
  text ("SURVIVAL :"+ survival,500,30 ); 
  text ("SCORE :"+ score, 100,30);  
  

}  

function Cbanana(){
  if (frameCount % 70 === 0) {
     banana = createSprite(680,100,40,10);
    banana.y = Math.round(random(80 ,150));
    banana.addImage("banana",bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -7;
    banana.lifetime =  250;
    FoodGroup.add(banana);
    
   
   }
}

function Sbird(){
  if (frameCount %150 === 0) {
     bird = createSprite(680,100,40,10);
    bird.y = Math.round(random(80 ,250));
    bird.addAnimation("bird",birdI);
    bird.scale = 0.5;
    bird.frameDelay = 1;
    bird.velocityX = -13;
    bird.lifetime =  250;
    
   bGroup.add(bird);
   }
}


function Cobstacles(){
  if (frameCount % 200 === 0) {
     obstacle = createSprite(680,250,40,10);
   
    obstacle.addImage("obtacle",obstacleImage);
    obstacle.scale = 0.11;
    obstacle.velocityX = -(7 + score/100);
    obstacle.lifetime =  250;
    
    obstaclesGroup.add(obstacle);
   }

}

function start(){
  gameState = PLAY;
  play.visible = false; 
  bk.visible = false; 

}

function reset(){
  
  gameState = START;
   monkey.scale = 0.3;
  
}

function again(){
  
  gameState = PLAY;
   FoodGroup.destroyEach();
  obstaclesGroup.destroyEach();
  bGroup.destroyEach();
  monkey.changeAnimation("monkey",monkey_running);
  monkey.frameDelay = 1;
   play.visible = false; 
  bk.visible = false; 
   go.visible=false;
   e .visible=false;
   r.visible=false;
  score = 0;
  survival = 30;
  bgS.loop();
  monkey.scale = 0.3;
  
}





