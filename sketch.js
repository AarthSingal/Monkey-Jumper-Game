var Monkey , monkey_running , monkey_collided;
var bananaGroup , bananaImage;
var obstaclesGroup , obstacleImage;
var background_ , backgroundImage;
var score;
var ground;
var gameState,PLAY,END;
var restart , retartImage;

function preload(){
   monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_05.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  monkey_collided = loadImage("Monkey_01.png");
  
  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("stone.png");
  
  backgroundImage = loadImage("jungle.jpg");
  
  restartImage = loadImage("restart.png");
}


function setup() {
  createCanvas(400, 400);
  
  background_ = createSprite(200,200,1000,400);
  background_.addImage(backgroundImage);
  background_.velocityX = -3;
  background_.x = background_.width/2;
  
  Monkey = createSprite(100,325,10,10);
  Monkey.addAnimation("Monkey",monkey_running);
  Monkey.addImage("Monkey_collided",monkey_collided);
  Monkey.scale = 0.15;
 
  ground = createSprite(200,370,400,10);
  ground.visible = false;
  
  bananaGroup = new Group();
  obstaclesGroup = new Group();
  
  PLAY =1;
  END = 0;
  gameState = PLAY;
  
  score = 0;
  
  restart = createSprite(200,200,50,50);
  restart.addImage(restartImage);
  restart.scale = 0.5;
  restart.visible = false;
  
  // Setting the text qualities
  textSize(20);
  fill("black");
}
  


function draw() {
  background("white");
  
  drawSprites();
  
  if(gameState === PLAY){
     // Making the mokey jump when space pressed
    if(keyDown("space") && Monkey.y>314){
      Monkey.velocityY = -17;
    } 

    // Adding the gravity
      Monkey.velocityY = Monkey.velocityY + 0.8;
    
      // Creating the infinite game world
    if(background_.x<0){
      background_.x = background_.width/2;
    }
    // calling the functions
    spawnObstacles();
    spawnBananas();
    
    // Setting and dislaying the score
    if(bananaGroup.isTouching(Monkey)){
      score = score= score+1;
      bananaGroup.get(0).destroy();
    }else if(obstaclesGroup.isTouching(Monkey)){
      score = score - 1;
      obstaclesGroup.get(0).destroy();
    }
    
    // Moving the backGround
    background_.velocityX = -3;
    
    // Going to the end state
    if(score <= -1 ){
      gameState = END;
    }
  }else if(gameState === END){
    text("You Loose",150,150);
    bananaGroup.setLifetimeEach(-1);
    bananaGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityXEach(0);
    score = 0;                                                       
    restart.visible = true;
    background_.velocityX = 0;
    Monkey.velocityY = 0;
    Monkey.changeImage("Monkey_collided",monkey_collided);
    bananaGroup.setDepthEach(restart.depth-1);
  }
  
  if(mousePressedOver(restart) && gameState === END){
    restart_function();
  }
  
  // colliding the monkey with the ground
  Monkey.collide(ground);
  
  
  
  
  text("Score :  "+score,100,50);
}
function spawnBananas(){
  if(World.frameCount%80===0){
    var Banana = createSprite(410,random(190,220),10,10);
    Banana.velocityX = -2;
    Banana.addImage(bananaImage);
    Banana.scale = 0.05;
    Banana.lifetime = 210;
    bananaGroup.add(Banana);
  }
}
function spawnObstacles(){
  if(World.frameCount%300===0){
    var obstacle = createSprite(410,350,10,10);
    obstacle.velocityX = -5;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    obstacle.lifetime = 210;
    obstaclesGroup.add(obstacle);
  }
}
function restart_function(){
  Monkey.changeAnimation("Monkey",monkey_running);
  gameState = PLAY;
  obstaclesGroup.destroyEach();
  bananaGroup.destroyEach();
  restart.visible = false;
}