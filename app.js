document.addEventListener('DOMContentLoaded', () => {
    const bird = document.querySelector('.bird');
    const grid = document.querySelector('#grid');
    const points = document.querySelector('#score');

let position = 400;
let isGameOver = false;
let isUp = false;
let counter = 0;
let score = 0;
let gameovertest = false;


function Down(){
    position -= 5;
    position = position;
    bird.style.bottom = position + 'px';
};
function Up(){
    position += 10;
    position = position;
    bird.style.bottom = position + 'px';
};

function Control(event){
    if(event.keyCode === 32){
        isUp = true;
        let upinterval = setInterval(() => {
            Up();
            counter++;
            if(counter == 15){
                isUp = false;
                clearInterval(upinterval);
                counter = 0;
                if(isUp == false){
                    let downinterval = setInterval(() => {
                        Down();
                        if(isUp == true){
                            clearInterval(downinterval);
                        }
                    }, 20);
                }
            }
        },20);
    }
}

function generatePipes(){
    let time = 2000;
    let pipePos = 1500;
    let pipeHeight = 0;
    const pipeBot = document.createElement('div');
    const pipeTop = document.createElement('div');
    if(!isGameOver){
        pipeBot.classList.add('pipe');
        pipeTop.classList.add('pipe');
        grid.appendChild(pipeBot);
        grid.appendChild(pipeTop);
        
        do{
            pipeHeight = Math.random() * 580;
        }while (pipeHeight > 0.8 * 580 || pipeHeight < 0.2 * 580)
        pipeBot.style.height = pipeHeight + 'px';
        pipeTop.style.height = 540 - pipeHeight + 'px';
        pipeTop.style.top = 0;
        pipeTop.style.transform = 'rotate(180deg)';
        pipeTop.style.transform = 'scaleY(-1)';
    }

    let generate = setInterval(() => {
        pipePos -= 10;
        pipeBot.style.left = pipePos + 'px';
        pipeTop.style.left = pipePos + 'px';
        if(pipePos < 0){
            grid.removeChild(pipeBot);
            grid.removeChild(pipeTop);
            clearInterval(generate);
        }
        if(pipePos == 50){
            score++;
            points.innerHTML = score;
        }
    },30)
    if(gameovertest == false){
        gameovertest = true;
        let isDead = setInterval(() =>{
            console.log('asd');
            console.log();
            if(pipePos == 50 && (position < pipeHeight || position > 40 + pipeHeight) || parseFloat(bird.style.bottom) == 0){
                isGameOver = true;
                console.log(pipeHeight);
                console.log(540 - pipeHeight);
                console.log(position);
            }
            if(isGameOver){
                points.innerHTML = 'ded';
            }
        },20);
    }
    if(!isGameOver){setTimeout(generatePipes, time);}
};



generatePipes();
document.addEventListener('keyup', Control);

});

