const FILEINPUT = document.querySelector('.file-input');
const CANVAS = document.querySelector('.canvas');
// Variables for canvas function
let penStrokeWidth = document.querySelector('#pen_range');
let undoBtn = document.querySelector('.undo');
let clearBtn = document.querySelector('.clear');
let diceBtn = document.querySelector('.dice');
let themeBtn = document.querySelector('.theme');
let imageContainer = document.querySelector('.main__image--container');

const ctx = CANVAS.getContext('2d');

// listen to recalculate canvas size relative to image container 
// window.addEventListener('resize', () => {
//     let canvasWidth = imageContainer.offsetWidth;
//     let canvasHeight = imageContainer.offsetHeight;

//     CANVAS.width = canvasWidth;
//     CANVAS.height = canvasHeight;
// });

let canvasWidth = imageContainer.offsetWidth;
let canvasHeight = imageContainer.offsetHeight;

CANVAS.width = canvasWidth;
CANVAS.height = canvasHeight;


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


// here is a new code


