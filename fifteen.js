let currentRow = 4;
let currentColumn = 4;
let leftCell;
let rightCell;
let topCell;
let bottomCell;
let imageClassToSwap;
let homeRow;
let homeColumn;
let homeCell; // is used to represent the blank cell when shuffling
let cells = []; // this array holds all the table cells in correct order
let fifteenPuzzleRows = 4;
let fifteenPuzzleColumns = 4;
/* I use the backgroundAllocator variable to represent ascii code for the alphablets
the alphabets [a to o] are the classes and using ascii allows me to easily change them */
let backgroundImageAllocator = 64; 

for(let r=1; r<=fifteenPuzzleRows; r++){
    for(let c=1; c<=fifteenPuzzleColumns; c++){
        cells.push(document.querySelector(`.row${r}.col${c}`));
    }
}
for(let cell of cells){
    cell.addEventListener("click", movetoAdjacentBlankCell);
}
//this for loop set the images, and in the correct order.
for(let i=0; i<cells.length-1; i++){
    backgroundImageAllocator++
    //cell.style.backgroundImage = `url('number tiles/${backgroundImageAllocator}.png')`;
    cells[i].classList.add(`${String.fromCharCode(backgroundImageAllocator)}`);
}

/* For any click this function gets the row, column and image */
function extractCellData(clicked){
    console.log(clicked.getAttribute("class"));
    currentRow = clicked.getAttribute("class").slice(3,4);
    currentColumn = clicked.getAttribute("class").slice(8,9);
    imageClassToSwap = clicked.getAttribute("class").slice(10);
}


/* this function checks if a clicked cell has a blank cell to its left */
function blankOnLeft(){
    try{
        leftCell = document.querySelector(`.row${currentRow}.col${Number(currentColumn)+1}`);
        if(leftCell.getAttribute("class").slice(10) === ""){
            return true;
        }else {return false;}
    }
    catch{
        return false;
    }  
}


/* this function checks if a clicked cell has a blank cell to its right */
function blankOnRight(){
    try{
        rightCell = document.querySelector(`.row${currentRow}.col${Number(currentColumn)-1}`);
        if(rightCell.getAttribute("class").slice(10) === ""){
            return true;
        }else {return false;}
    }
    catch{
        return false
    }
    
}


/* this function checks if a clicked cell has a blank cell above it */
function blankOnTop(){
    try{
        topCell = document.querySelector(`.row${Number(currentRow)-1}.col${currentColumn}`);
        if(topCell.getAttribute("class").slice(10) === ""){
            return true;
        }else {return false;}
    }
    catch{
        return false;
    }
}


/* this function checks if a clicked cell has a blank cell below it*/
function blankOnBottom(){
    try{
        bottomCell = document.querySelector(`.row${Number(currentRow)+1}.col${currentColumn}`);
        if(bottomCell.getAttribute("class").slice(10) === ""){
            return true;
        }else {return false;}
    }
    catch{
        return false;
    }
}


/*  swap() "moves"  any clicked tile into the blank cell adjacent to it
    If a swap is successful an 'animation'/transition occurs
    it also monitors if the game's been won and displays some animation if it has.
*/
function swap(currentClick, adjacentCell){
    console.log("we can swap now!!");
    currentClick.classList.remove(`${imageClassToSwap}`);
    adjacentCell.classList.add(`${imageClassToSwap}`);

    //Animate every successful swap (transition with animation)
    adjacentCell.style.borderColor = "Gold";
    adjacentCell.style.transition = "0.5s";
    adjacentCell.style.boxShadow = "10px 20px 30px Gold";
    setInterval(function(){
        adjacentCell.style.borderColor = "black";
        adjacentCell.style.transition = "0";
        adjacentCell.style.boxShadow = "";
    }, 1000);

    //check if puzzle is solved and show win animation.
    let ascii = 65;
    let solved = 0;
    for(let i=0; i<cells.length-1; i++){
        if(cells[i].getAttribute("class").slice(10) === `${String.fromCharCode(ascii)}`){
            solved++;
        }
        ascii++;
    }
    if(solved === 15){
        document.querySelector("table").style.borderColor = "Gold";
        document.querySelector("table").style.transition = "1s";
        document.querySelector("table").style.boxShadow = "10px 20px 30px Gold";
        document.querySelector("table").style.borderRadius = "5%"
        document.querySelector("body").style.backgroundImage = "url('number tiles/celebration.webp')";
        buttonStop2;
    }
}


/* This is the button click event handler*/
function movetoAdjacentBlankCell(){
    extractCellData(this);
    if(blankOnLeft()){
        swap(this, leftCell);
    }else if(blankOnRight()){
        swap(this, rightCell);
    }else if(blankOnTop()){
        swap(this, topCell);
    }else if(blankOnBottom()){
        swap(this, bottomCell);
    }
}



/* 
SwapTop(), swapBottom(), swapLeft(), and swapRight() are used for the shuffle process
They allow a player to move one step upwards, downwards, left or right respectively
By only moving a neighboring piece we can have a solvable puzzle.
*/
function swapTop(){
    homeCell = document.querySelector(`.row${homeRow}.col${homeColumn}`);
    topCell = document.querySelector(`.row${homeRow-1}.col${homeColumn}`);
    imageClassToSwap = topCell.getAttribute("class").slice(10);
    homeCell.classList.add(`${imageClassToSwap}`);
    topCell.classList.remove(`${imageClassToSwap}`);
    homeRow = homeRow-1; 
}
function swapBottom(){
    homeCell = document.querySelector(`.row${homeRow}.col${homeColumn}`);
    bottomCell = document.querySelector(`.row${homeRow+1}.col${homeColumn}`);
    imageClassToSwap = bottomCell.getAttribute("class").slice(10);
    homeCell.classList.add(`${imageClassToSwap}`);
    bottomCell.classList.remove(`${imageClassToSwap}`);
    homeRow = homeRow+1;
}
function swapLeft(){
    homeCell = document.querySelector(`.row${homeRow}.col${homeColumn}`);
    leftCell = document.querySelector(`.row${homeRow}.col${homeColumn-1}`);
    imageClassToSwap = leftCell.getAttribute("class").slice(10);
    homeCell.classList.add(`${imageClassToSwap}`);
    leftCell.classList.remove(`${imageClassToSwap}`);
    homeColumn = homeColumn-1;
}
function swapRight(){
    homeCell = document.querySelector(`.row${homeRow}.col${homeColumn}`);
    rightCell = document.querySelector(`.row${homeRow}.col${homeColumn+1}`);
    imageClassToSwap = rightCell.getAttribute("class").slice(10);
    homeCell.classList.add(`${imageClassToSwap}`);
    rightCell.classList.remove(`${imageClassToSwap}`);
    homeColumn = homeColumn+1;
}



// this function would shuffle the images 
function scramble(){
    let imageClassArray = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o",];
    let oldImageClass;
    for(let i=0; i<cells.length-1; i++){
        try{
            oldImageClass = cells[i].getAttribute("class").slice(10);
            cells[i].classList.remove(`${oldImageClass}`);
            cells[i].classList.add(`${imageClassArray[i]}`);
        }catch{
            cells[i].classList.add(`${imageClassArray[i]}`);
        }      
    }
    homeCell = document.querySelector(".row4.col4");
    if(homeCell.getAttribute("class") === "row4 col4"){
        console.log("ready");
    }else{
        oldImageClass = homeCell.getAttribute("class").slice(10);
        homeCell.classList.remove(`${oldImageClass}`);
    }
    homeRow = 4;
    homeColumn = 4;
    let numberOfSwaps = 0;
    let direction;
    while(numberOfSwaps<100){
        //the direction variable helps to randomly move pieces
        direction = Math.floor(Math.random()*4); 
        if(direction === 0){
            try{
                swapTop();
            }catch{
                swapBottom();
            }
        }else if(direction === 1){
            try{
                swapBottom();
            }catch{
                swapTop();
            }
        }else if(direction === 2){
            try{
                swapLeft();
            }catch{
                swapRight();
            }
        }else if(direction === 3){
            try{
                swapRight();
            }catch{
                swapLeft();
            }
        }
        numberOfSwaps++
    }
 
}

//this adds the event listener to the shuffle button.
let jumbleButton = document.querySelector("#shuffle");
jumbleButton.addEventListener("click", scramble);

// stop watch 
window.onload = function () {
  
    var seconds = 00; 
    var tens = 00; 
    var appendTens = document.getElementById("tens")
    var appendSeconds = document.getElementById("seconds")
    var buttonStart = document.getElementById('button-start');
    var buttonStop = document.getElementById('button-stop');
    var buttonReset = document.getElementById('button-reset');
    var Interval ;
    var buttonStop2 = clearInterval(Interval);
  
    buttonStart.onclick = function() {
      
      clearInterval(Interval);
       Interval = setInterval(startTimer, 10);
    }
    
      buttonStop.onclick = function() {
         clearInterval(Interval);
    }
    
  
    buttonReset.onclick = function() {
       clearInterval(Interval);
      tens = "00";
        seconds = "00";
      appendTens.innerHTML = tens;
        appendSeconds.innerHTML = seconds;
    }
    
     
    
    function startTimer () {
      tens++; 
      
      if(tens <= 9){
        appendTens.innerHTML = "0" + tens;
      }
      
      if (tens > 9){
        appendTens.innerHTML = tens;
        
      } 
      
      if (tens > 99) {
        console.log("seconds");
        seconds++;
        appendSeconds.innerHTML = "0" + seconds;
        tens = 0;
        appendTens.innerHTML = "0" + 0;
      }
      
      if (seconds > 9){
        appendSeconds.innerHTML = seconds;
      }
    
    }
    
  
  }