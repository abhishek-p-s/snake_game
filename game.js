const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");
const canvaSize=600;
canvas.height=canvaSize;
canvas.width=canvaSize;
 
const snakeBox=20;
const totalMoves=canvaSize/snakeBox;
const apple=new Image();
apple.src='images/apple.png';

let dead=new Audio();
let eat=new Audio();
let up=new Audio();
let down=new Audio();
let left=new Audio();
let right=new Audio();
dead.src='audio/dead.mp3'
eat.src='audio/eat.mp3'
up.src='audio/up.mp3'
down.src='audio/down.mp3'
left.src='audio/left.mp3'
right.src='audio/right.mp3'


//define snake

let snake=[];
snake[0]={
    x:9*snakeBox,
    y:10*snakeBox

}

//create food

let food={};
getFood();

//score

let score=0;

//snake direction

let dir="";
document.addEventListener("keydown",direction);

function direction(){
    let key=event.keyCode;
    if(key==37 && dir!=="right"){
        dir="left";
        left.play();
    }else if(key==38 && dir!=="down"){
        dir="up";
        up.play();

    }else if(key==39 && dir!=="left"){
        dir="right";
        right.play();

    }else if(key==40 && dir!=="up"){
        dir="down";
        down.play()
    }
}

function getFood(){
    food={
        x:Math.floor(Math.random()*(totalMoves-2-3)+3)*snakeBox,
        y:Math.floor(Math.random()*(totalMoves-2-3)+3)*snakeBox
    };
}

function collisionDetection(head,ar){
    for(i=0;i<ar.length;i++){
        if(ar[i].x==head.x && ar[i].y==head.y){
            return true;

        }
    }
    return false;
}
 
function render(){
    ctx.fillStyle="#dcdcdc";
    ctx.fillRect(0,0,canvaSize,canvaSize);
    
    for(let i=0;i<snake.length;++i){

        ctx.fillStyle= i==0?"#4CAF50":"white";
        ctx.fillRect(snake[i].x,snake[i].y,snakeBox,snakeBox);

        ctx.strokeStyle="#E91E63";
        ctx.strokeRect(snake[i].x,snake[i].y,snakeBox,snakeBox);
    }

    ctx.drawImage(apple,food.x,food.y,snakeBox,snakeBox);

    let snakeX=snake[0].x;
    let snakeY=snake[0].y;

    if(dir=="left") snakeX-=snakeBox;
    if(dir=="right") snakeX+=snakeBox;
    if(dir=="up") snakeY-=snakeBox;
    if(dir=="down") snakeY+=snakeBox


    //if snake eat food

    if(snakeX==food.x && snakeY==food.y){
        score++;
        eat.play();
        getFood();

    }else{
        snake.pop();
    }


    let newHead={
        x:snakeX,
        y:snakeY
    };

    if(snakeX<0 || snakeX>=canvaSize || snakeY<0 || snakeY >=canvaSize || collisionDetection(newHead,snake)){
        gameOver();
        return;
    }

    snake.unshift(newHead);

    ctx.fillStyle="black";
    ctx.font="40px tahoma";
    ctx.fillText(score,10,40);


    
}



var gm=setInterval(render,100);

function gameOver(){
    clearInterval(gm);
    dead.play();

    ctx.fillStyle="black";
    ctx.font="40px tahoma";
    ctx.fillText("Game Over",canvaSize/2-100,canvaSize/2);

}
