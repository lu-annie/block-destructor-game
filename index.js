let player;
let block;
let block2;
let block3;
let block4;

var screen = 0
var score = 0;
var levels = 0;
var timer = 0;


function setup() {
  createCanvas(windowWidth, windowHeight);
  player = new Sprite();
  block = new Sprite();
  block2 = new Sprite();
  block3 = new Sprite();
  block4 = new Sprite();
  block.x=windowWidth
  block.y=100
  block2.x=windowWidth
  block2.y=250
  block3.x=0
  block3.y=325
  block4.x=0
  block4.y=400
  player.diameter = 50;
  player.y = 500;
}

// boundaries at left and right
// firebase

function draw() {
  if(screen == 0){
    startScreen()
    player.visible = false
    block.visible = false
    block2.visible = false
    block3.visible = false
    block4.visible = false
  }else if(screen == 1){
    gameOn()
    player.visible=true
    block.visible = true
    block2.visible = true
    block3.visible = true
    block4.visible = true
  }else if(screen==2){
  	gameOver()
    player.visible=false
  }
}

function startScreen(){
		background(150)
		fill(255)
		textAlign(CENTER);
    text('Block Destructor', width/2, 0.5*height/3)
		text('Instructions', width/2, height / 3)
        text('1. Use the UP, LEFT, and RIGHT arrows to move', width/2,1.25*height/3)
  text('2. Try to reach the end', width/2,1.5*height/3)
  text('3. Avoid the blocks - if you hit them you lose', width/2,1.75*height/3)
  text('Click anywhere to begin', width/2,2.25*height/3)
        textFont('Georgia')
        textSize(20)
        reset();
        resetScore();
}

function gameOn() {
  background(250)
  text('Score: '  + score, width/2, 20);
  text('Level: '  + levels, width/2, 40);
  text('Time Passed: '  + timer, width/2, 60);
  timer = timer + 1
  fill(0)
  block.direction = 180;
  block.speed = random(1, 10);
  block2.direction = 180;
  block2.speed = random(1, 10);
  block3.direction = 0;
  block3.speed = random(1, 10);
  block4.direction = 0;
  block4.speed = random(1, 10);
  if (block.x<0){
    block.x=windowWidth
  }
  if (block2.x<0) {
    block2.x=windowWidth
  }
  if (block3.x>windowWidth) {
    block3.x=0
  }
  if (block4.x>windowWidth) {
    block4.x=0
  }
  if (player.collides(block)) {
    block.visible=false
    screen=2
  }
  if (player.collides(block2)) {
    block2.visible=false
    screen=2
  }
  if (player.collides(block3)) {
    block3.visible=false
    screen=2
  }
  if (player.collides(block4)) {
    block4.visible=false
    screen=2
  }
  if (player.y<=0) {
    levels+=1;
    reset();
  }
}

function keyPressed() {
  if (kb.presses('left')) {
	//   (distance, direction, speed)
	player.move(50, 'left', 3);
} else if (kb.presses('right')) {
    player.move(50,'right', 3)
} else if (kb.presses('up')) {
    player.move(50, 'up', 3)
  score+=1;
}
}

function mousePressed(){
	if(screen==0){
  	screen=1
  } else if (screen==2) {
    screen=0
  }
}

function gameOver() {
  noLoop()
  background(150)
  textAlign(CENTER);
		text('GAME OVER', width / 2, height / 2)
        text('SCORE:' + score, width / 2, height / 2 + 25)
        text('LEVEL: ' + levels, width / 2, height / 2 + 50)
        text('TIME PASSED: ' + timer, width / 2, height / 2 + 75)
  fill(255)
  button = createButton('Restart');
  button.position(0,0);
  button.mousePressed(startLoop)

    window.sendScore(username)
    scoreSent = true

  let scores = window.getAllMessages()
  console.log(scores)
}

function startLoop() {
  screen=1
  resetScore()
  loop()
  reset()
}

function reset() {
  player.y = 500
  player.speed = 0
  player.x = windowWidth/2
  block.speed = random(1, 10)
  block.y = random(50, 400)
  block2.speed = random(1, 10)
  block2.y = random(50, 400)
  block3.speed = random(1, 10)
  block3.y = random(50, 400)
  block4.speed = random(1, 10)
  block4.y = random(50, 400)
}

function resetScore() {
  score = 0;
  levels = 0;
}