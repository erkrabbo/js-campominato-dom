const btnPlay = document.getElementById('btnPlay');

const gridSpaceContainer = document.body.querySelector('#gridSpaceContainer');
const difficultySelector = document.body.querySelector('#level');
let boxes = document.querySelectorAll('.box');

let areThereElements = false;
let blockNumber = 0;

window.addEventListener('resize', squareBoxes)
window.addEventListener('load', createGrid)
btnPlay.addEventListener('click', createGrid);

function createGrid(){

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
    
    let gridSpace = document.createElement('div');

    gridSpace.setAttribute('id', 'gridSpace');
    gridSpace.setAttribute('class', 'col d-flex flex-wrap justify-content-center align-content-center')
    gridSpaceContainer.append(gridSpace);

    areThereElements = true;
    
    for(let i = 1; i <= blockNumber; i++){
        let block = document.createElement('div');
        block.classList.add('box');
        block.innerHTML = `<span>${i}</span>`

        gridSpace.append(block);
    }

    

    squareBoxes();
}

function squareBoxes(){
    const playGrid = document.querySelector('#gridSpace');
    const boxes = document.querySelectorAll('.box');

    playGrid.style.height = `${playGrid.offsetWidth}px`;

    for (i=0; i<boxes.length; i++){
        boxes[i].style.width = `calc(100% / ${Math.sqrt(blockNumber)}`;
        boxes[i].style.height =`${boxes[i].style.width}`;
        console.log(boxes[i].style.width);
        boxes[i].addEventListener('click', stepOnIt);
    }
}

function stepOnIt(){
    this.classList.add('clicked');
}



     