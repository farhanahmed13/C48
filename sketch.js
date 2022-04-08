//increase game adpitivity
//put reset button
var bg, bgImg
var bottomGround
var topGround
var hero , myHero
var monstersGroup;
var monsterImage;
var monster;
var left,right,leftImage,RightImage;
var backgroundMusic;
var up,neon,upImage,neonImage;
var gamestate="play";
var score;
var reset,resetImage;

function preload(){
      citybg = loadImage("assets/citybg.png");
      hero = loadImage("assets/hero.png");
      monsterImage = loadImage("assets/monster.png");
      leftImage = loadImage("assets/left.png");
      rightImage = loadImage("assets/right.png");
      upImage = loadImage("assets/up.png");
      neonImage = loadImage("assets/neon.png");
      backgroundMusic = loadSound("assets/background_music.mp3")
      resetImage = loadImage("assets/reset.png")
}
function setup(){
          createCanvas(1500,800)
          backgroundMusic.play();
          backgroundMusic.setVolume(1);

          

          //creating top and bottom grounds
          bottomGround = createSprite(200,390,800,20);
          bottomGround.visible = false;

          topGround = createSprite(200,10,800,20);
          topGround.visible = false;
                
          //creating myHero      
          myHero   = createSprite(100,200,20,50);
          myHero .addImage(hero);
          myHero .scale = 0.2

          monstersGroup = createGroup();

          left = createSprite(200,600);
          left.addImage(leftImage);
          right = createSprite(400,600);
          right.addImage(rightImage);
          right.scale = 0.4
          left.scale = 0.4
          up = createSprite(300,500);
          up.addImage(upImage);
          neon = createSprite(300,700);
          neon.addImage(neonImage);
          neon.scale = 0.1
          up.scale = 0.1
          score = 0;
          reset = createSprite(900,100)
          reset.addImage(resetImage)
          reset.scale = 0.1
}

function draw() {

  background(citybg);
  textSize(50)
  fill("green")
  stroke("white")
  text("Score: "+ score, 500,90); 
 
  if(monstersGroup.isTouching(myHero)){
    gamestate = "end"
  }
  if(gamestate ==="end"){
     gameover();
  }         
           
             
  if(gamestate === "play"){

        score = score + Math.round(getFrameRate()/60);
        spawnMonsters();
        moveHero();
  }
  if(score >1000){
     textSize(100)
     fill("golden")
     stroke("white")
     text("YOU WON!",400,400)
     monstersGroup.destroyEach();
     myHero.remove();
   gamestate ="gamewon"
  }
  if(mousePressedOver(reset)) {
    reset();
}

   
 

    drawSprites();
}  

function spawnMonsters() {
  //write code here to spawn the monster
   if (frameCount % 60 === 0) {
        monster = createSprite(1450,-200,40,10);
        monster.y = Math.round(random(100,1000));
        monster.addImage(monsterImage);
        monster.scale = 0.1;
        monster.velocityX = -3;

    
     //assign lifetime to the variable
   
    
    //adjust the depth
    monster.depth = hero.depth;
    hero.depth = hero.depth + 1;
    
    //adding monster to the group
    monstersGroup.add(monster);

}
    if(score>500){
  monster.scale = 0.2;
  monster.velocityX = -8;
}
}
function moveHero(){
  
  
    if (mousePressedOver(right)) {
        myHero.x = myHero.x +5;
    }
    
    if (mousePressedOver(left))  {
        myHero.x = myHero.x -5;
    }
   
    if (mousePressedOver(up))    {
        myHero.y = myHero.y -5;
    }
       
    if (mousePressedOver(neon)) {
        myHero.y = myHero.y+5;
    }
     
    console.log("moveHero78")
  
}
  
function gameover(){
  
      
    textSize(100);
    fill("red");
    stroke("White");
    text("GAME OVER",400,400)
    monstersGroup.destroyEach();
    myHero.remove();
  
}
