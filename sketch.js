var play=1;
var end=0;
var gameState = play;

var caveman,caveman_running,cavemanImage;
var bear1,bear1_running;
var bground,bgroundImage,invisibleGround;
var trap,trapImage,trapGroup;
var bush,bushImage,bushGroup;
var gameover,gameoverImage;
var win,winImage;
var score = 0;
var honey,honeyBee,honeyBeeImg ,honeyImg;

function preload(){
  caveman_running = loadAnimation("caveman1.png","caveman2.png","caveman3.png","caveman4.png");
  cavemanImage = loadAnimation("caveman_jump1.png","caveman_jump2.png","caveman_jump3.png","caveman_jump4.png");
  bear1_running = loadAnimation("bear1.png","bear2.png","bear3.png","bear4.png","bear5.png");
  bear1Image = loadAnimation("bear_jump1.png","bear_jump2.png","bear_jump3.png","bear_jump4.png","bear_jump5.png");
  bearDie = loadImage("bearDie.png");
  bgroundImage = loadImage("bgImg.jpeg");
  bushImage = loadImage("bush.png");
 // trapImage = loadImage("trap.png");
 // gameoverImage = loadImage("gameover.png");
 // winImage = loadImage("youwin.png");
  honeyBeeImg = loadAnimation("honeybee.gif");
  honeyImg = loadImage("honey.png");
}

function setup(){
  createCanvas(600,500);
  
  bground = createSprite(300,200,1200,500);
  bground.addImage(bgroundImage);
  bground.scale = 3;
  
  invisibleGround = createSprite(300,360,600,5);
  invisibleGround.shapeColor = "red";
  invisibleGround.visible = false;
  
  caveman = createSprite(100,340,50,50);
  caveman.addAnimation("running",caveman_running);
  caveman.addAnimation("rest",cavemanImage);
  caveman.scale = 0.3;
  
  bear1 = createSprite(250,340,50,50);
  bear1.addAnimation("running",bear1_running);
  bear1.addAnimation("rest",bear1Image);
  bear1.scale = 0.3;

  //for(var h = 0; h<5; h++){
   // honeyBee = createSprite(random(250,300),random(340,380),10,10);
    //honeyBee.addAnimation("honeyBee", honeyBeeImg);
 // }
  
  gameover = createSprite(300,100,50,50);
 // gameover.addImage(gameoverImage);
  gameover.visible = false;
  
  win = createSprite(300,100,50,50);
 // win.addImage(winImage);
  win.visible = false;
  
  bushGroup = new Group();
  trapGroup = new Group();
}
  
  
  
  

function draw(){
  background("white");
  
  
  
  
  //spawnbush();
  //spawntrap();
  
  
  
  if(gameState===play){
    bground.velocityX = -(5+0.5*score/100);
  
  if (bground.x < 0){
      bground.x = bground.width/2;
    }
  
 /* if(keyDown(UP_ARROW)&&caveman.y>320){
    caveman.velocityY = -(10+0.1*score/100);
  }
  if(caveman.y<320){
    caveman.changeAnimation("rest",cavemanImage);
  }
  else{
   caveman.changeAnimation("running",caveman_running);
  }*/


    score = score + Math.round(frameRate()/60);
    
    if(trapGroup.isTouching(bear1)){
      gameState = end;
    //  bear1.velocityY = bear1.velocityY-(1+0.4*score/100);
    }
    
    if(bushGroup.isTouching(bear1)){
      gameState = end;
     // bear1.velocityY = bear1.velocityY-(1+0.08*score/100);
    }
    
    if(trapGroup.isTouching(caveman)){
      caveman.velocityY = caveman.velocityY-(1+0.08*score/100);
      caveman.changeAnimation("rest",cavemanImage);
    }
    
    if(bushGroup.isTouching(caveman)){
      caveman.velocityY = caveman.velocityY-(1+0.08*score/100);
      
    }
    

  //bear1.velocityX = bear1.velocityX - 0.00001;
  }
  
      if(bear1.y<320){
    bear1.changeAnimation("rest",bear1Image);
  }
  else{
   bear1.changeAnimation("running",bear1_running);
  }
  
  caveman.velocityY = caveman.velocityY + 0.5+0.02*score/100;
    
  bear1.velocityY = bear1.velocityY + 0.5+0.05*score/100;
  
  
  caveman.collide(invisibleGround);
  
  bear1.collide(invisibleGround);
  
  if(gameState===end){
    score = 0;
    
    bushGroup.setLifetimeEach(-1);
    bushGroup.setVelocityXEach(0);
    
    trapGroup.setLifetimeEach(-1);
    trapGroup.setVelocityXEach(0);
    
    gameover.visible = true;

    bear1.velocityX = bear1.velocityX+0.2;
    
    
    bground.velocityX = 0;
    
  }
  
 /* if(caveman.isTouching(bear1)){
    win.visible = true;
    score = 0;
    bground.velocityX = 0;
    
    bear1.velocityX = 0;
    caveman.velocityX = 0;
    
    bushGroup.setLifetimeEach(-1);
    bushGroup.setVelocityXEach(0);
    
    trapGroup.setLifetimeEach(-1);
    trapGroup.setVelocityXEach(0);
    
    
  }*/
  
  bear1.debug = false;
  bear1.setCollider("rectangle",100,0,350,240);
  
  drawSprites();
  
  textSize(25);
  stroke("black");
  fill("black");
  //text("Score:"+score,420,50);
}

function spawnbush(){
  if (frameCount % 250===0){
    bush= createSprite(700,355,50,50);
    bush.addImage(bushImage);
    bush.velocityX = -(5+0.5*score/100);
    
    bush.scale = 0.2;
    bush.depth = caveman.depth;
    caveman.depth = caveman.depth+1;
    bush.depth = bear1.depth;
    bear1.depth = bear1.depth+1;
    
    bush.lifetime = 150;
    
    bushGroup.add(bush);

    trap = createSprite(700,330,50,50);
    trap.addImage(trapImage);
    trap.velocityX = -(5+0.5*score/100);
    
    trap.scale = 0.2;
    trap.depth = caveman.depth;
    caveman.depth = caveman.depth+1;
    trap.depth = bear1.depth;
    bear1.depth = bear1.depth+1;
    
    trap.lifetime = 150;

    
    trapGroup.add(trap);
  }
}
