// File input variables
const FILEINPUT = document.querySelector('.file-input');

// Variables for canvas function
const CANVAS = document.querySelector('.canvas');
let penStrokeWidth = document.querySelector('#pen_range');
let undoBtn = document.querySelector('.undo');
let clearBtn = document.querySelector('.clear');
let diceBtn = document.querySelector('.dice');
let themeBtn = document.querySelector('.theme');
let imageContainer = document.querySelector('.main__image--container');

const ctx = CANVAS.getContext('2d');

// listen to recalculate canvas size relative to image container 
// window.addEventListener('resize', calcWindowSize);

// function calcWindowSize() {

//     imageContainer.offsetHeight;

//     imageContainer.offsetWidth;
// }


let canvasWidth = imageContainer.offsetWidth;
let canvasHeight = imageContainer.offsetHeight;

CANVAS.width = canvasWidth;
CANVAS.height = canvasHeight;
// console.log(calcWindowSize())

// Draw on the canvas
// Calculate the mouse posiiton relative to canvas
function colorChange (data) {
    color = data;
}

window.addEventListener('load', () => {

    let isPainting = false;
    let restore = [];
    let i = -1;

    function startPosition(e) {
        isPainting = true;
        paint(e);
    }

    function endPosition() {
        isPainting = false;
        ctx.beginPath();
        if (!isPainting) {
            restore.push(ctx.getImageData(0,0,canvasWidth,canvasHeight));
            i++;
        }
    }

    function paint(e) {
        if (!isPainting) return;
        

        let mousePositionCalc = CANVAS.getBoundingClientRect();
        let offsetX = mousePositionCalc.left;
        let offsetY = mousePositionCalc.top;

        let mouseX = parseInt(e.clientX - offsetX);
        let mouseY = parseInt(e.clientY- offsetY);

        ctx.lineWidth = penStrokeWidth.value / 2;
        ctx.lineCap = 'round';
        ctx.strokeStyle = color;

        ctx.lineTo(mouseX, mouseY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(mouseX, mouseY);
    }

    function clear() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        restore.length = 0;
        i = -1;
    }

    function undo() {
        if(i <= 0) {
            clear();
        } else {
            i--;
            restore.pop();
            ctx.putImageData(restore[i], 0,0)
        }
    }


    CANVAS.addEventListener('mousedown', startPosition);
    CANVAS.addEventListener('mouseup', endPosition);
    CANVAS.addEventListener('mousemove', paint);
    CANVAS.addEventListener('mouseout', endPosition);

    clearBtn.addEventListener('click', clear);
    undoBtn.addEventListener('click', undo);
});

// Upload and read the image
let uploadedImg = '';

FILEINPUT.addEventListener('change', function () {
    const READER = new FileReader();
    READER.addEventListener('load', () => {
        uploadedImg = READER.result;
        document.querySelector('.main__image--container').style.backgroundImage = `url(${uploadedImg})`
    });
    READER.readAsDataURL(this.files[0]);
});


// DICE FUNCTION
// Dice variables 
let closeBtn = document.querySelector('.dice__close--btn');
let rollBtn = document.querySelector('.dice__roll--btn');
let diceContainer = document.querySelector('.dice__container');
let diceImg = document.querySelector('.dice__img');
let isDiceOpen = false;
// opens the dice interface
diceBtn.addEventListener('click', () => {

    if(!diceContainer.classList.contains('dice-show')) {
        diceContainer.classList.add('dice-show');
        isDiceOpen = true;
    } else if (diceContainer.classList.contains('dice-show')) {
        diceContainer.classList.remove('dice-show');
        isDiceOpen = false;
    }
})

closeBtn.addEventListener('click', () => {
    if(!isDiceOpen) {
        return;
    } else if (isDiceOpen = true) {
        diceContainer.classList.remove('dice-show');
        isDiceOpen = false;
    }
})

// ROLLS THE DICE
rollBtn.addEventListener('click', ()=> {
   
    audio.play()
    let dice = new Audio('../sounds/dice-sound.mp3');
    dice.playbackRate = 2.5;
    dice.play();

    setTimeout(() => {
        randomNumber();
    }, 100);
    setTimeout(() => {
        randomNumber();
    }, 250);
    setTimeout(() => {
        randomNumber();
    }, 350);
    setTimeout(() => {
        randomNumber();
    }, 450);
    setTimeout(() => {
        randomNumber();
    }, 550);
    setTimeout(() => {
        randomNumber();
    }, 650);
    setTimeout(() => {
        randomNumber();
    }, 750);
    setTimeout(() => {
        randomNumber();
    }, 850);
    setTimeout(() => {
        randomNumber();
    }, 950);

})

// Generate a random number and change the images relative the number
function randomNumber () {
 
    let randomNum = Math.floor((Math.random() * 6) + 1) ;

    let randomDiceImg = `dice${randomNum}.png`
    
    let randomImgSource = `./src/images/${randomDiceImg}`

    return diceImg.setAttribute("src", randomImgSource);
}

// LOCAL STORAGE AND DARK MODE
let darkMode = localStorage.getItem('darkMode');
let colorWhiteBtn = document.querySelector('.clr__white--btn');

const enableDarkMode = () => {
    document.body.classList.add('dark-mode');
    colorWhiteBtn.classList.add('clr__white--btn-darkMode');
    localStorage.setItem('darkMode', 'enabled');
}

const disableDarkMode = () => {
    document.body.classList.remove('dark-mode');
    colorWhiteBtn.classList.remove('clr__white--btn-darkMode');
    localStorage.setItem('darkMode', null);
}

if(darkMode === 'enabled') {
    enableDarkMode();
}

themeBtn.addEventListener('click', () => {
    darkMode = localStorage.getItem('darkMode');
    if(darkMode !== 'enabled') {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
})
