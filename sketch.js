/*(Professora, eu não consegui colocar texto. Até pesquisei para adicionar, por exemplo, a aleatoriedade
 do lugar em que os sprites são criados, porém, não consegui fazer o mesmo com texto) ~ PS: Wallace */



 
var path, boy, leftBoundary, rightBoundary;
var pathImg, boyImg;
var i;
var coin, bomb
var coinImg, bombImg
var coins, life

//life and coins value
coins = 0;
life = 5;

//preload function
function preload(){
//path and boy image
  pathImg = loadImage("path.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");

//powerup images
  coinImg = loadImage ("coin.png");
  bombImg = loadImage ("bomb.png");
}

//setup function
function setup(){
  createCanvas(400,400);
  
//Moving background
  path = createSprite(200,200);
  path.addImage(pathImg);
  path.velocityY = 4;
  path.scale = 1.2;

//creating boy running
  boy = createSprite(180,300,30,30);
  boy.scale = 0.08;
  boy.addAnimation("JakeRunning", boyImg);
  
//create left Boundary
  leftBoundary = createSprite(0,0,100,800);
  leftBoundary.visible = false;

//create right Boundary
  rightBoundary = createSprite(410, 0, 100, 800);
  rightBoundary.visible = false;

//create powerups
  coin = createSprite(random(75, 325), random(50, 100), 10, 10);
  coin.addAnimation("coinPowerup", coinImg);
  coin.velocityY = 4;
  coin.scale = 0.35;
  coins-1;

  bomb = createSprite(random(75, 325), random(0, 25), 10, 10);
  bomb.addAnimation("bomb", bombImg);
  bomb.velocityY = 4;
  bomb.scale = 0.1;
  life-1;
}

//function draw
function draw() {

//background
  background(0);

//path velocity
  path.velocityY = 4;
  
//boy moving on Xaxis with mouse
  boy.x = World.mouseX;
  
//boy collision
  edges = createEdgeSprites();
  boy.collide(edges[3]);
  boy.collide(leftBoundary);
  boy.collide(rightBoundary);

//code to reset the background
  if(path.y > 350){
    path.y = height/2;
  } 

  if(path.y > 350){
    path.y = width/2;
  } 

  if(coin.y > 450 ){
    coin.y = width/12;
  } 
  
  if(boy.isTouching(coin)){
    coin.remove();
    coins = coins+1;
    var newCoin = createSprite(random(75, 325), random(50, 100), 10, 10);
    newCoin.addAnimation("coinPowerup", coinImg);
    newCoin.velocityY = 4;
    newCoin.scale = 0.35;
    coin = newCoin;
  }

  if(boy.isTouching(bomb)){
    bomb.remove();
    life = life-1;
    var newBomb = createSprite(random(75, 325), random(0, 25), 10, 10);
    newBomb.addAnimation("bomb", bombImg);
    newBomb.velocityY = 4;
    newBomb.scale = 0.1;
    bomb = newBomb;
  }

  if(bomb.y >= 425){
    bomb.remove();
    var newBomb = createSprite(random(75, 325), random(0, 25), 10, 10);
    newBomb.addAnimation("bomb", bombImg);
    newBomb.velocityY = 4;
    newBomb.scale = 0.1;
    bomb = newBomb;
  }
  
  if(life <= 0){
    boy.remove();
    coin.remove();
    bomb.remove();
    path.velocityY = 0;
  }
  
  drawSprites();
}

