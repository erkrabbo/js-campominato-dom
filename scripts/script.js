const btnPlay = document.getElementById('btnPlay');
const finalmessage = document.querySelector('.finalmessage');

const gridSpaceContainer = document.body.querySelector('#gridSpaceContainer');
const difficultySelector = document.body.querySelector('#level');
let boxes = document.querySelectorAll('.box');

const bombsNumber = 16;
let stepsGoal;
let areThereElements = false;
let blockNumber = 0;

let bombs = [];
let safeSteps = [];

window.addEventListener('resize', squareBoxes)
window.addEventListener('load', createGrid)
btnPlay.addEventListener('click', createGrid);

function createGrid(){

    finalmessage.setAttribute('style','display: none');

    if(areThereElements){
        gridSpaceContainer.removeChild(document.body.querySelector('#gridSpace'));
    }
    
    switch (difficultySelector.value){
        case '0':
            blockNumber =100;
            break;
        case '1':
            blockNumber = 81;
            break;
        case '2':
            blockNumber = 49;
            break;
        default:
            blockNumber = 100;
    }
    
    stepsGoal = parseInt(blockNumber / 2);

    let gridSpace = document.createElement('div');

    gridSpace.setAttribute('id', 'gridSpace');
    gridSpace.style.minWidth = '280px';
    gridSpace.style.minHeight = '200px';
    gridSpace.setAttribute('class', 'col d-flex flex-wrap justify-content-center align-content-center');
    gridSpaceContainer.append(gridSpace);

    areThereElements = true;
    
    for(let i = 1; i <= blockNumber; i++){
        let block = document.createElement('div');
        block.classList.add('box');
        block.innerHTML = `<span>${i}</span>`

        gridSpace.append(block);
    }
    squareBoxes();

    placeBombs();
}

function squareBoxes(){
    const main = document.body.querySelector('main');
    // const maxHeight = main.clientHeight;

    const playGrid = document.querySelector('#gridSpace');
    boxes = document.querySelectorAll('.box');

    playGrid.style.height = `${playGrid.offsetWidth}px`;
    playGrid.style.maxHeight = `calc(${main.clientHeight}px - 20px)`;
    playGrid.style.maxWidth = `calc(${main.clientHeight}px - 20px)`;

    for (i=0; i<boxes.length; i++){
        boxes[i].style.width = `calc(100% / ${Math.sqrt(blockNumber)}`;
        boxes[i].style.height =`${boxes[i].style.width}`;
        boxes[i].setAttribute('cell-index', `${i + 1}`);

        boxes[i].addEventListener('click', stepOnIt);
        boxes[i].addEventListener('click', win);
    }
}

function stepOnIt(){
    let index = parseInt(this.getAttribute('cell-index'));
    if (bombs.includes(index)){
        lose();
    } else{
        this.classList.add('clicked');
        safeSteps.push(index);
    }

}

function placeBombs(){
    bombs = [];
    safeSteps = [];

    for (let i = 0; i < bombsNumber; i++){
        let bomb;
        do{
            bomb = Math.floor(Math.random() * blockNumber) + 1;
        } while (bombs.includes(bomb));

        bombs.push(bomb);
    }
}

function revealBombs(){

    for (let i = 0; i < blockNumber; i++){
        index = parseInt(boxes[i].getAttribute('cell-index'));

        boxes[i].removeEventListener('click', stepOnIt);

        if (bombs.includes(index)){
            boxes[i].classList.add('bomb');
        } else{
            boxes[i].classList.add('clicked');
        }
    }
}

function win(){
    if(safeSteps.length == stepsGoal){
        finalmessage.innerHTML = `<h1>YOU WIN<\h1><span>Safe steps: ${safeSteps.length}<\span>`
        finalmessage.classList.add('win');
        finalmessage.setAttribute('style','display: block');
        revealBombs();
    }
}

function lose(){
    finalmessage.innerHTML = `<h1>YOU LOSE<\h1><span>Safe steps: ${safeSteps.length}<\span>`
        finalmessage.classList.add('lose');
        finalmessage.setAttribute('style','display: block');
    revealBombs();
}
     