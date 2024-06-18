// Select The Start Game Button
document.querySelector(".control-buttons span").onclick = function() {
    // promote Window To Ask For Name
    let yourName = prompt("Whats Your Name ?")
    
    // If Name Is Empty
    if(yourName == null || yourName == "") {
        // Set Name To Unknown
        document.querySelector(".name span").innerHTML = "Unknown"
    }else {
        // Set Name To Your Name
        document.querySelector(".name span").innerHTML = yourName
    }
    // Remove Splash Screen
    document.querySelector(".control-buttons").remove()
}

// Effect Deuration
let duration = 1000

// Slecet Blocks Conatiner
let blocksContainer = document.querySelector(".memory-game-blocks") 

// Create Array From Game Blocks 
let blocks = Array.from(blocksContainer.children)

// Create Range Of Keys

// let orderRange = [...Array(blocks.length).keys()];
let orderRange = Array.from(Array(blocks.length).keys());
shuffle(orderRange)

// Add Order Css Property To Game Blocks
blocks.forEach((block, index) => {
    block.style.order = orderRange[index];

    // Add Click Event
    block.addEventListener('click', function () {

        // Trigger The Flip Block Function
        flipBlock(block) 
    })
});


// Flip Block Function 
function flipBlock(selectedBlock) {
    // Add Class Is-Flipped
    selectedBlock.classList.add("is-flipped")

    // Collect All Flipped Cards
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains("is-flipped"))

    // if There are Two Selected Blocks
    if (allFlippedBlocks.length === 2) {

    // Stop Clicking Function
    stopClicking();
    
    // Check Method Block Function 
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1])   
    }

}

// Stop Clicking Function
function stopClicking () {
    // Add Class No Clicking on Main Container
    blocksContainer.classList.add('no-clicking')

    setTimeout(() => {
        // Remove Class No Clicking After Duration
        blocksContainer.classList.remove('no-clicking')
    },duration)
}

// Check Method Block Function    
function checkMatchedBlocks(firstBlock, secondBlock) {

    let triesElement = document.querySelector(".tries span");

    if (firstBlock.dataset.soccer === secondBlock.dataset.soccer) {

        firstBlock.classList.remove("is-flipped")
        secondBlock.classList.remove("is-flipped")

        firstBlock.classList.add("has-match")
        secondBlock.classList.add("has-match")

        document.getElementById("success").play()

    } else {
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

        setTimeout(() => {

            firstBlock.classList.remove("is-flipped")
            secondBlock.classList.remove("is-flipped")

            document.getElementById("fail").play()

        } , duration)
    }
}

// Shuffle Function 

function shuffle(array) {
    // Setting Vars
    let current = array.length,
        temp,
        random;

    while (current > 0) {
        // Get Random Number
        random = Math.floor(Math.random() * current);

        // Decrease Length By One
        current--;

        // [1] Save Current Element in Stash
        temp = array[current];

        // [2] Current Element = Random Element
        array[current] = array[random];

        // [3] Random Element = Get Element from Stash
        array[random] = temp;
    }
    return array;
}