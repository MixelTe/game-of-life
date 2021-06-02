"use strict";

const canva = document.getElementById("canva");
canva.addEventListener("fullscreenchange", fullScreenLogic);
const ctx = canva.getContext('2d');

const RMH1 = document.getElementById("RMH1");
const RMH5 = document.getElementById("RMH5");
const RMH2 = document.getElementById("RMH2");
const RMH4 = document.getElementById("RMH4");
const RM = document.getElementById("RM");
const LMH1 = document.getElementById("LMH1");
const LMH2 = document.getElementById("LMH2");
const LM = document.getElementById("LM");
elementPositions()


let cellScale = 10;
let cellSpeed = 100;
// const cellsColors = ["rgb(0, 0, 255)", "rgb(255, 255, 0)"];
const cellsColors = ["hsl(240, 100%, 50%)", "hsl(60, 100%, 50%)"];
const colors_readOnly = [0, 0, "current", 1, 0, 0, 0, 0, 0];

let Cells = [[], []];
let activeCellsIndex = 0;
let lineWidth;
// Cells[activeCellsIndex][x + w * y] = 0;
let CLL;

let switchRedrawing = 1;

let pastFrameTime = 0;
let switchDrawing = 0;
let switchDrawing2 = 0;


const WclearButton = document.getElementById("Wclear");
WclearButton.onclick = function() {buttons("Wclear")};

const WrecreateButton = document.getElementById("Wrecreate");
WrecreateButton.onclick = function() {buttons("Wrecreate")};


const chscInput = document.getElementById("chscaleInput");
chscInput.onchange = function() {buttons("Cscale")};
chscInput.value = cellScale;

const fullScreenButton = document.getElementById("fullScreenButton");
fullScreenButton.onclick = function() {buttons("fullScreen")};

const speedInput = document.getElementById("speedInput");
speedInput.value = cellSpeed;
speedInput.oninput = () => { buttons("speed") };

const dayTimeDIV = document.getElementById("dayTime");
const cellsCountDIV = document.getElementById("cellsCount");
let liveCellsCount = 0;
cellsCountDIV.innerText = liveCellsCount;
const allCellsCountDIV = document.getElementById("allCellsCount");
let liveCellsCountAllTime = [];

const Color1DIV = document.getElementById("Color1");
Color1DIV.onclick = () => { buttons("color1", Color1DIV) };
Color1DIV.style.backgroundColor = cellsColors[1];

const Color2DIV = document.getElementById("Color2");
Color2DIV.onclick = () => { buttons("color2", Color2DIV) };
Color2DIV.style.backgroundColor = cellsColors[0];

const RM1Input = document.getElementById("RMI1");
RM1Input.oninput = () => { buttons("RM1") };
const RM2Input = document.getElementById("RMI2");
RM2Input.oninput = () => { buttons("RM2") };
const RM3Input = document.getElementById("RMI3");
RM3Input.oninput = () => { buttons("RM3") };
const RM4Input = document.getElementById("RMI4");
RM4Input.oninput = () => { buttons("RM4") };
const RM5Input = document.getElementById("RMI5");
RM5Input.oninput = () => { buttons("RM5") };
let addingElement = 1;
let gliderDirection = 1;
let drawingWidth = 1;
let drawingHeight = 1;
let clearingWidth = 5;
let clearingHeight = 5;
let randomingWidth = 5;
let randomingHeight = 5;

const LM1Input = document.getElementById("LMI1");
LM1Input.oninput = () => { buttons("LM1") };
const LM2Input = document.getElementById("LMI2");
LM2Input.oninput = () => { buttons("LM2") };
const LM3Input = document.getElementById("LMI3");
LM3Input.oninput = () => { buttons("LM3") };
const LM4Input = document.getElementById("LMI4");
LM4Input.oninput = () => { buttons("LM4") };
let startPosition = 1;
let cellFrequency = 0.5;
let cellFrequencyInGroup = 0.5;
let spaceBetweenCellGroup = 4;


let canvaHeight = 500;
let canvaFullSreen = false;



onStart();
main()

function onStart(toFull)
{
    Cells = [[], []];
    liveCellsCountAllTime = [];
    if (toFull)
    {
        lineWidth = Math.ceil(screen.width / cellScale);
    }
    else
    {
        lineWidth = Math.ceil(canva.width / cellScale);
    }
    createCeils();
    CLL = Cells[activeCellsIndex].length;

    switch (startPosition) {
        case 1:
            start_ceilsCangeColor5();
            break;

        case 2:
            randomChengeColor2();
            break;

        default:
            // randomChengeColor();
            // randomChengeColor2();
            // start_ceilsCangeColor();
            // start_ceilsCangeColor2();
            // start_ceilsCangeColor3();
            // start_ceilsCangeColor4();
            break;
    }

    drawCells();
}

function main(time)
{
    if (switchRedrawing)
    {
        if (time - pastFrameTime > cellSpeed)
        {
            ceilsLogic();
            drawCells();
            dayTimeDIV.innerText = Math.floor(time - pastFrameTime) + "ms";
            pastFrameTime = time;
        }
    }
    else
    {
        dayTimeDIV.innerText = "stoped";
    }

    requestAnimationFrame(main);
}

function createCeils()
{
    for (let i = 0; i < Math.ceil(canva.height / cellScale); i++)
    {
        for (let j = 0; j < lineWidth; j++)
        {
            Cells[activeCellsIndex].push(0);
        }
    }
}

function drawCells()
{
    liveCellsCount = 0;
    ctx.fillStyle = cellsColors[0];
    ctx.fillRect(0, 0, canva.width, canva.height);
    for (let i = 0; i < Cells[activeCellsIndex].length; i++)
    {
        const color = Cells[activeCellsIndex][i];
        if (color)
        {
            ctx.fillStyle = cellsColors[color];
            ctx.fillRect((i % lineWidth) * cellScale, (i - (i % lineWidth)) / lineWidth * cellScale, cellScale, cellScale);
            liveCellsCount += 1;
        }
    }
    if (switchDrawing)
    {
        ctx.strokeStyle = "gray";
        for (let i = 0; i < lineWidth; i++)
        {
            ctx.moveTo(i * cellScale, 0);
            ctx.lineTo(i * cellScale, canva.height);
            ctx.stroke();
        }
        for (let i = 0; i < CLL / lineWidth; i++)
        {
            ctx.moveTo(0, i * cellScale);
            ctx.lineTo(canva.width, i * cellScale);
            ctx.stroke();
        }
    }
    cellsCountDIV.innerText = liveCellsCount;
    liveCellsCountAllTime[liveCellsCountAllTime.length] = liveCellsCount;
}

function ceilsLogic()
{
    for (let i = 0; i < Cells[activeCellsIndex].length; i++)
    {
        let alive = 0;
        const a = numToIF(i);
        for (let j = 0; j < a.length; j++)
        {
            if (Cells[activeCellsIndex][a[j]])
            {
                alive += 1;
            }
        }
        if (colors_readOnly[alive] != null)
        {
            if (alive == 2)
            {
                Cells[1 - activeCellsIndex][i] = Cells[activeCellsIndex][i];
            }
            else
            {
                Cells[1 - activeCellsIndex][i] = colors_readOnly[alive];
            }
        }
        else
        {
            console.error(ceilsLogic2, alive);
        }
    }
    activeCellsIndex = 1 - activeCellsIndex;
}

function numToIF(i)
{
    return [
        (CLL + (i + 1)) % CLL,
        (CLL + (i - 1)) % CLL,
        (CLL + (i + lineWidth)) % CLL,
        (CLL + (i - lineWidth)) % CLL,
        (CLL + (i + lineWidth + 1)) % CLL,
        (CLL + (i + lineWidth - 1)) % CLL,
        (CLL + (i - lineWidth + 1)) % CLL,
        (CLL + (i - lineWidth - 1)) % CLL
    ]
}


document.addEventListener("keypress", (event) => onKeyPress(event))
function onKeyPress(e)
{
    switch (e.code)
    {

        case "KeyQ":
            switchDrawing = 1 - switchDrawing;
            console.log("switchDrawing: ", switchDrawing);
            break;

        case "Space":
            e.preventDefault();
            switchRedrawing = 1 - switchRedrawing;
            // console.log("switchFunction: ", switchRedrawing);
            allCellsCountDIV.value = liveCellsCountAllTime;
            break;

        case "KeyE":
            switchDrawing2 = 1 - switchDrawing2;
            console.log("switchDrawing2: ", switchDrawing2);
            break;

        default:
            break;
    }
}

window.addEventListener("resize", () => { elementPositions(); drawCells(); });
function elementPositions()
{
    RMH1.style.left = `${Math.max(window.innerWidth - RM.offsetWidth - 217, RM.offsetLeft - 200)}px`;
    RMH1.style.top = `${RM.offsetTop + 40}px`;

    RMH5.style.left = `${Math.max(window.innerWidth - RM.offsetWidth - 217, RM.offsetLeft - 200)}px`;
    RMH5.style.top = `${RM.offsetTop + 145}px`;

    RMH4.style.left = `${Math.max(window.innerWidth - RM.offsetWidth - 222, RM.offsetLeft - 200)}px`;
    RMH4.style.top = `${RM.offsetTop + 535}px`;

    RMH2.style.left = `${Math.max(window.innerWidth - RM.offsetWidth - 235, RM.offsetLeft - 220)}px`;
    RMH2.style.top = `${RM.offsetTop + 249}px`;


    LMH1.style.left = `${LM.offsetWidth}px`;
    LMH1.style.top = `${LM.offsetTop + 100}px`;

    LMH2.style.left = `${LM.offsetWidth}px`;
    LMH2.style.top = `${LM.offsetTop + 250}px`;

    canva.width = window.innerWidth - 20;
}


function randomChengeColor()
{
    for (let i = 0; i < Cells[activeCellsIndex].length; i++) {
        Cells[activeCellsIndex][i] = randomNum(0, 2);
    }
}
function randomChengeColor2()
{
    for (let i = 0; i < Cells[activeCellsIndex].length; i++)
    {
        if (Math.random() > cellFrequency)
        {
            Cells[activeCellsIndex][i] = 0;
        }
        else
        {
            Cells[activeCellsIndex][i] = 1;
        }
    }
}

function start_ceilsCangeColor()
{
    for (let i = 0; i < Cells[activeCellsIndex].length; i++)
    {
        if (i == 2 + lineWidth || i == 4 + lineWidth || i == 3 + lineWidth * 2 || i == 4 + lineWidth * 2 || i == 3 + lineWidth * 3)
        {
            Cells[activeCellsIndex][i] = 1;
        }
    }
}
function start_ceilsCangeColor2()
{
    for (let i = 0; i < Cells[activeCellsIndex].length; i++)
    {
        if (i % lineWidth < lineWidth/2 && i < CLL/2)
        {
            Cells[activeCellsIndex][i] = 1;
        }
        if (i % lineWidth >= lineWidth/2 && i > CLL/2)
        {
            Cells[activeCellsIndex][i] = 1;
        }
    }
}
function start_ceilsCangeColor3()
{
    for (let i = 0; i < Cells[activeCellsIndex].length; i++)
    {
        if (i % lineWidth < lineWidth/3 && i < CLL/3)
        {
            Cells[activeCellsIndex][i] = randomNum(0, 2);
        }
    }
}
function start_ceilsCangeColor4()
{
    const x = 10;
    const y = 10;
    for (let i = 0; i < Cells[activeCellsIndex].length; i++)
    {
        if (i == x + lineWidth * (y - 3) ||
            i == x - 1 + lineWidth * (y - 2) ||
            i == x + lineWidth * (y - 2) ||
            i == x + 1 + lineWidth * (y - 2) ||
            i == x - 2 + lineWidth * (y - 1) ||
            i == x - 1 + lineWidth * (y - 1) ||
            i == x + 1 + lineWidth * (y - 1) ||
            i == x + 2 + lineWidth * (y - 1) ||
            i == x - 3 + lineWidth * y ||
            i == x - 2 + lineWidth * y ||
            i == x - 1 + lineWidth * y ||
            i == x + 1 + lineWidth * y ||
            i == x + 2 + lineWidth * y ||
            i == x + 3 + lineWidth * y ||
            i == x - 2 + lineWidth * (y + 1) ||
            i == x - 1 + lineWidth * (y + 1) ||
            i == x + 1 + lineWidth * (y + 1) ||
            i == x + 2 + lineWidth * (y + 1) ||
            i == x - 1 + lineWidth * (y + 2) ||
            i == x + lineWidth * (y + 2) ||
            i == x + 1 + lineWidth * (y + 2) ||
            i == x + lineWidth * (y + 3))
        {
            Cells[activeCellsIndex][i] = 1;
        }
    }
}
function start_ceilsCangeColor5()
{
    const a = spaceBetweenCellGroup;
    for (let i = 0; i < Cells[activeCellsIndex].length; i++)
    {
        let toAlife = false;
        if (i % lineWidth < lineWidth/a && i < CLL/a)
        {
            toAlife = true;
        }
        if (i % lineWidth > (lineWidth/a)*(a-1) && i > (CLL/a)*(a-1))
        {
            toAlife = true;
        }
        if (i % lineWidth < lineWidth/a && i > (CLL/a)*(a-1))
        {
            toAlife = true;
        }
        if (i % lineWidth > (lineWidth/a)*(a-1) && i < CLL/a)
        {
            toAlife = true;
        }
        if (toAlife == true)
        {
            if (Math.random() > cellFrequencyInGroup)
            {
                Cells[activeCellsIndex][i] = 0;
            }
            else
            {
                Cells[activeCellsIndex][i] = 1;
            }
        }
    }
}
function randomNum(min, max)
{
    return min + Math.floor((max - min) * Math.random());
}


canva.addEventListener("mousedown", (e) => { nowDrawing = true; if(e.which == 3) {rightClick = true} canvaMouseDraw(e, true); });
document.addEventListener("mouseup", () => { nowDrawing = false; rightClick = false; splUp(); });
canva.addEventListener("mousemove", (e) => canvaMouseDraw(e));
canva.addEventListener("contextmenu", (e) => { e.preventDefault() })
let nowDrawing = false;
let rightClick = false;
function canvaMouseDraw(e, mousedown)
{
    if (nowDrawing)
    {
        const x = Math.floor(e.pageX / cellScale);
        const y = Math.floor(e.pageY / cellScale);
        if (rightClick)
        {
            switch (addingElement)
            {
                case -1:
                    for (let i = -Math.floor(drawingHeight / 2); i < Math.ceil(drawingHeight / 2); i++)
                    {
                        for (let o = -Math.floor(drawingWidth / 2); o < Math.ceil(drawingWidth / 2); o++)
                        {
                            Cells[activeCellsIndex][(CLL + (x + o) + (y + i) * lineWidth) % CLL] = 1;
                        }
                    }
                    break;
                default:
                    for (let i = -Math.floor(clearingHeight / 2); i < Math.ceil(clearingHeight / 2); i++)
                    {
                        for (let o = -Math.floor(clearingWidth / 2); o < Math.ceil(clearingWidth / 2); o++)
                        {
                            Cells[activeCellsIndex][(CLL + (x + o) + (y + i) * lineWidth) % CLL] = 0;
                        }
                    }
                    break;
            }
        }
        else
        {
            switch (addingElement) {
                case 1:
                    for (let i = -Math.floor(drawingHeight/2); i < Math.ceil(drawingHeight/2); i++)
                    {
                        for (let o = -Math.floor(drawingWidth/2); o < Math.ceil(drawingWidth/2); o++) {
                            Cells[activeCellsIndex][(CLL + (x+o) + (y+i) * lineWidth) % CLL] = 1;
                        }
                    }
                    break;

                case -1:
                    for (let i = -Math.floor(clearingHeight/2); i < Math.ceil(clearingHeight/2); i++)
                    {
                        for (let o = -Math.floor(clearingWidth/2); o < Math.ceil(clearingWidth/2); o++) {
                            Cells[activeCellsIndex][(CLL + (x+o) + (y+i) * lineWidth) % CLL] = 0;
                        }
                    }
                    break;

                case 2:
                    if (mousedown)
                    {
                        switch (gliderDirection) {
                            case 1:
                                Cells[activeCellsIndex][(CLL + (x - 1) + (y - 1) * lineWidth) % CLL] = 1;
                                Cells[activeCellsIndex][(CLL + (x + 1) + (y - 1) * lineWidth) % CLL] = 1;
                                Cells[activeCellsIndex][(CLL + (x + 0) + (y + 0) * lineWidth) % CLL] = 1;
                                Cells[activeCellsIndex][(CLL + (x + 1) + (y + 0) * lineWidth) % CLL] = 1;
                                Cells[activeCellsIndex][(CLL + (x + 0) + (y + 1) * lineWidth) % CLL] = 1;
                                break;

                            case 2:
                                Cells[activeCellsIndex][(CLL + (x - 1) + (y - 1) * lineWidth) % CLL] = 1;
                                Cells[activeCellsIndex][(CLL + (x + 1) + (y - 1) * lineWidth) % CLL] = 1;
                                Cells[activeCellsIndex][(CLL + (x + 0) + (y + 0) * lineWidth) % CLL] = 1;
                                Cells[activeCellsIndex][(CLL + (x - 1) + (y + 0) * lineWidth) % CLL] = 1;
                                Cells[activeCellsIndex][(CLL + (x + 0) + (y + 1) * lineWidth) % CLL] = 1;
                                break;

                            case 3:
                                Cells[activeCellsIndex][(CLL + (x + 0) + (y - 1) * lineWidth) % CLL] = 1;
                                Cells[activeCellsIndex][(CLL + (x + 0) + (y + 0) * lineWidth) % CLL] = 1;
                                Cells[activeCellsIndex][(CLL + (x + 1) + (y + 0) * lineWidth) % CLL] = 1;
                                Cells[activeCellsIndex][(CLL + (x - 1) + (y + 1) * lineWidth) % CLL] = 1;
                                Cells[activeCellsIndex][(CLL + (x + 1) + (y + 1) * lineWidth) % CLL] = 1;
                                break;

                            case 4:
                                Cells[activeCellsIndex][(CLL + (x + 0) + (y - 1) * lineWidth) % CLL] = 1;
                                Cells[activeCellsIndex][(CLL + (x + 0) + (y + 0) * lineWidth) % CLL] = 1;
                                Cells[activeCellsIndex][(CLL + (x - 1) + (y + 0) * lineWidth) % CLL] = 1;
                                Cells[activeCellsIndex][(CLL + (x - 1) + (y + 1) * lineWidth) % CLL] = 1;
                                Cells[activeCellsIndex][(CLL + (x + 1) + (y + 1) * lineWidth) % CLL] = 1;
                                break;

                            default:
                                break;
                        }
                    }
                    break;

                case 3:
                    if (mousedown)
                    {
                        Cells[activeCellsIndex][(CLL + (x + 0) + (y + 3) * lineWidth) % CLL] = 1;
                        Cells[activeCellsIndex][(CLL + (x - 1) + (y + 2) * lineWidth) % CLL] = 1;
                        Cells[activeCellsIndex][(CLL + (x + 0) + (y + 2) * lineWidth) % CLL] = 1;
                        Cells[activeCellsIndex][(CLL + (x + 1) + (y + 2) * lineWidth) % CLL] = 1;
                        Cells[activeCellsIndex][(CLL + (x - 2) + (y + 1) * lineWidth) % CLL] = 1;
                        Cells[activeCellsIndex][(CLL + (x - 1) + (y + 1) * lineWidth) % CLL] = 1;
                        Cells[activeCellsIndex][(CLL + (x + 1) + (y + 1) * lineWidth) % CLL] = 1;
                        Cells[activeCellsIndex][(CLL + (x + 2) + (y + 1) * lineWidth) % CLL] = 1;
                        Cells[activeCellsIndex][(CLL + (x - 3) + (y + 0) * lineWidth) % CLL] = 1;
                        Cells[activeCellsIndex][(CLL + (x - 2) + (y + 0) * lineWidth) % CLL] = 1;
                        Cells[activeCellsIndex][(CLL + (x - 1) + (y + 0) * lineWidth) % CLL] = 1;
                        Cells[activeCellsIndex][(CLL + (x + 1) + (y + 0) * lineWidth) % CLL] = 1;
                        Cells[activeCellsIndex][(CLL + (x + 2) + (y + 0) * lineWidth) % CLL] = 1;
                        Cells[activeCellsIndex][(CLL + (x + 3) + (y + 0) * lineWidth) % CLL] = 1;
                        Cells[activeCellsIndex][(CLL + (x - 2) + (y - 1) * lineWidth) % CLL] = 1;
                        Cells[activeCellsIndex][(CLL + (x - 1) + (y - 1) * lineWidth) % CLL] = 1;
                        Cells[activeCellsIndex][(CLL + (x + 1) + (y - 1) * lineWidth) % CLL] = 1;
                        Cells[activeCellsIndex][(CLL + (x + 2) + (y - 1) * lineWidth) % CLL] = 1;
                        Cells[activeCellsIndex][(CLL + (x - 1) + (y - 2) * lineWidth) % CLL] = 1;
                        Cells[activeCellsIndex][(CLL + (x + 0) + (y - 2) * lineWidth) % CLL] = 1;
                        Cells[activeCellsIndex][(CLL + (x + 1) + (y - 2) * lineWidth) % CLL] = 1;
                        Cells[activeCellsIndex][(CLL + (x + 0) + (y - 3) * lineWidth) % CLL] = 1;

                    }
                    break;

                case 4:
                    for (let i = -Math.floor(randomingHeight); i < Math.ceil(randomingHeight); i++)
                    {
                        for (let o = -Math.floor(randomingWidth); o < Math.ceil(randomingWidth); o++) {
                            Cells[activeCellsIndex][(CLL + (x+o) + (y+i) * lineWidth) % CLL] = randomNum(0, 2);
                        }
                    }
                    break;

                default:
                    break;
            }
        }
        drawCells();
        // console.log(x, y);
    }
}

function fullScreenLogic()
{
    if (canvaFullSreen)
    {
        canva.height = canvaHeight;
        canvaFullSreen = false;
        splitter.style.top = canva.height + "px";
        elementPositions();
        onStart();
    }
    else
    {
        canvaFullSreen = true;
    }
}
