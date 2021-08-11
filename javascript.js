let cntrlBtn = document.querySelector(".control-btns");
let cntrlBtnSpan = document.querySelector(".control-btns span");
// duration of flipping the card
let duration = 1000;
// The container of the blocks
let blocksContainer = document.querySelector(".memory-game-blocks");
// Each block on his own
let blocks = Array.from(blocksContainer.children);
// order of the blocks (random)
let orderRange = [...Array(blocks.length).keys()]; // === Array.from(Array(blocks.length).keys())
// to make the cards flipped from the beggining for some mins
blocks.forEach((block ) => {
    block.classList.add("is-flipped");
});

// Create Countdown
var seconds = 180;     // number of seconds
var countDiv = document.getElementById("timer");
var secondPass,
    countDown; 

function secondPass(){
    
    var mins = Math.floor(seconds / 60);
    
    var remSeconds = seconds % 60;


    if(remSeconds < 10){
        remSeconds = "0" + remSeconds ;
        console.log(remSeconds)
        
    }

    countDiv.innerHTML = `${mins} : ${remSeconds}`;
    
    if(seconds > 0){
        seconds--;
    }else {
        clearInterval(countDown) // stop countdown timer
        countDiv.innerHTML = "Time is out";
        // freeze the blocks
        blocksContainer.classList.add("no-clicking");
        document.getElementById("time-is-out").play();
        
    }

}




cntrlBtnSpan.onclick = function(){
   let yourName = prompt("Enter Your Name : ");

   if(yourName == null || yourName == ""){
    document.querySelector(".name span").innerHTML = "Unknown";
   } else {
    document.querySelector(".name span").innerHTML = yourName;
   }

   cntrlBtn.remove();

   setTimeout(() => {
    blocks.forEach((block ) => {
        block.classList.remove("is-flipped");
    });
   }, 1000);


   countDown = setInterval(()=>{
    secondPass();
},1000);



}






shuffle(orderRange);
// Add order css property to blocks
blocks.forEach((block , index) => {
    block.style.order = orderRange[index];
    // add click event
    block.addEventListener("click",function(){
        flipBlock(block);
    })
});

function flipBlock(selected){
    // add flip class
    selected.classList.add("is-flipped");
    // collect all flipped cards
    let allFlippedBlocks = blocks.filter(flipped => flipped.classList.contains("is-flipped"));

    //check if it is 2 or more
    if(allFlippedBlocks.length === 2){
        
        // stop clicking
        stopClick();

        // check matching
        matchedElements(allFlippedBlocks[0],allFlippedBlocks[1]);
    }

}

function stopClick(){
    blocksContainer.classList.add("no-clicking");
    setTimeout(()=>{
        // remove the class after duration
        blocksContainer.classList.remove("no-clicking");
    },duration)
}

function matchedElements(firstB,secondB){
    
    let tries = document.querySelector(".tries span");
    if(firstB.dataset.tech === secondB.dataset.tech){
        
        firstB.classList.remove("is-flipped");
        secondB.classList.remove("is-flipped");

        firstB.classList.add("has-matched");
        secondB.classList.add("has-matched");

        document.getElementById("success").play();

    } else {
        document.getElementById("fail").play();
        tries.innerHTML = parseInt(tries.textContent) + 1;
        setTimeout(()=>{
            firstB.classList.remove("is-flipped");
            secondB.classList.remove("is-flipped");
        },duration)
    }

}


// create shuffle function 
function shuffle(array){
    // select the last item
    let current = array.length,
        temp,
        random;

    while(current > 0){
        // get random element
        random = Math.floor(Math.random() * current);
    
        // decrease length by 1
        current--;

        temp = array[current];

        array[current] = array[random];

        array[random] = temp;
    }    

    return array

}





