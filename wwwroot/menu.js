"use strict";
const MR1 = document.getElementById("MR1");
const MR2 = document.getElementById("MR2");
const MR3 = document.getElementById("MR3");
const MR4 = document.getElementById("MR4");
const MR4s = 15;
const MR5 = document.getElementById("MR5");

MR1.onclick = () => { buttons("RM1", "canva") };
MR2.onclick = () => { buttons("RM2", "canva") };
MR3.onclick = () => { buttons("RM3", "canva") };
MR4.onclick = () => { buttons("RM4", "canva") };
MR5.onclick = () => { buttons("RM5", "canva") };

const ML1 = document.getElementById("ML1");
const ML1s = 5;
const ML2 = document.getElementById("ML2");
const ML2s = 5;
const ML3 = document.getElementById("ML3");
const ML3s = 5;
const ML4 = document.getElementById("ML4");

ML1.onclick = () => { buttons("LM1", "canva") };
ML2.onclick = () => { buttons("LM2", "canva") };
ML3.onclick = () => { buttons("LM3", "canva") };
ML4.onclick = () => { buttons("LM4", "canva") };

const cellsColors_past = ["hsl(240, 100%, 50%)", "hsl(60, 100%, 50%)"];
const colorPickerOptions = {roundCorners: false}
const colorPicker1 = new ColorPicker();
colorPicker1.setPlacement("up", "center");
colorPicker1.addEventListener("input", (e) => setNewColor(e, 1));
colorPicker1.addEventListener("canceled", (e) => cancelNewColor(1));
// colorPicker1.setStyle(colorPickerOptions);
const colorPicker2 = new ColorPicker();
colorPicker2.setPlacement("up", "center");
colorPicker2.addEventListener("input", (e) => setNewColor(e, 2));
colorPicker2.addEventListener("canceled", (e) => cancelNewColor(2));
// colorPicker2.setStyle(colorPickerOptions);

const hintDIV = document.getElementById("hint");
const buttonHint = document.getElementById("buttonHint");
buttonHint.onclick = () => { buttons("hintOpen") };
const buttonCloseHint = document.getElementById("closeHint");
buttonCloseHint.onclick = () => { buttons("hintClose") };


const MRCells = [[],

[
    0, 0, 0, 0, 0,
    0, 1, 0, 1, 0,
    0, 0, 1, 1, 0,
    0, 0, 1, 0, 0,
    0, 0, 0, 0, 0,],
[
    0, 0, 0, 0, 0,
    0, 1, 0, 1, 0,
    0, 1, 1, 0, 0,
    0, 0, 1, 0, 0,
    0, 0, 0, 0, 0,],
[
    0, 0, 0, 0, 0,
    0, 0, 1, 0, 0,
    0, 0, 1, 1, 0,
    0, 1, 0, 1, 0,
    0, 0, 0, 0, 0,],
[
    0, 0, 0, 0, 0,
    0, 0, 1, 0, 0,
    0, 1, 1, 0, 0,
    0, 1, 0, 1, 0,
    0, 0, 0, 0, 0,],

[
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 1, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,],
[
    0, 0, 0, 1, 0, 0, 0,
    0, 0, 1, 1, 1, 0, 0,
    0, 1, 1, 0, 1, 1, 0,
    1, 1, 1, 0, 1, 1, 1,
    0, 1, 1, 0, 1, 1, 0,
    0, 0, 1, 1, 1, 0, 0,
    0, 0, 0, 1, 0, 0, 0,],
];
const MLCells = [[],[],[],

[
    1, 1, 0, 1, 1,
    1, 1, 0, 1, 1,
    0, 0, 0, 0, 0,
    1, 1, 0, 1, 1,
    1, 1, 0, 1, 1,],
[
    0, 0, 0, 1, 0, 0, 0,
    0, 0, 1, 1, 1, 0, 0,
    0, 1, 1, 0, 1, 1, 0,
    1, 1, 1, 0, 1, 1, 1,
    0, 1, 1, 0, 1, 1, 0,
    0, 0, 1, 1, 1, 0, 0,
    0, 0, 0, 1, 0, 0, 0,],
];
randomChangeColor(0, (MR4.width / MR4s) * (MR4.width / MR4s + 1), MRCells);
randomChangeColor2(0, (ML1.width / ML1s) * (ML1.width / ML1s + 1), Math.ceil(ML1.width / ML1s));
randomChangeColor3(1, (ML3.width / ML3s) * (ML3.width / ML3s + 1), MLCells);
reDrawRM();
reDrawLM();
function reDrawRM()
{
    drawCells2(MR1, 5, 25, MRCells);
    drawCells2(MR2, gliderDirection, 25, MRCells);
    drawCells2(MR3, 6, 18, MRCells);
    drawCells2(MR4, 0, MR4s, MRCells);
}
function reDrawLM()
{
    drawCells2(ML1, 0, ML1s, MLCells);
    drawCells2(ML2, 1, ML2s, MLCells);
    drawCells2(ML3, 2, 1, MLCells);
    drawCells2(ML4, 3, 25, MLCells);
}
function randomChangeColor(index, length, list)
{
    for (let i = 0; i < length; i++) {
        list[index][i] = randomNum(0, 2);
    }
}
function randomChangeColor2(index, length, lw)
{
    const a = spaceBetweenCellGroup - 0.5;
    for (let i = 0; i < length; i++)
    {
        MLCells[index][i] = 0;
        let toAlife = false;
        if (i % lw < lw/a && i < length/a)
        {
            toAlife = true;
        }
        if (i % lw > (lw/a)*(a-1) && i > (length/a)*(a-1))
        {
            toAlife = true;
        }
        if (i % lw < lw/a && i > (length/a)*(a-1))
        {
            toAlife = true;
        }
        if (i % lw > (lw/a)*(a-1) && i < length/a)
        {
            toAlife = true;
        }
        if (toAlife == true)
        {
            if (Math.random() <= cellFrequencyInGroup)
            {
                MLCells[index][i] = 1;
            }
        }
    }
}
function randomChangeColor3(index, length, list)
{
    for (let i = 0; i < length; i++)
    {
        if (Math.random() > cellFrequency)
        {
            list[index][i] = 0;
        }
        else
        {
            list[index][i] = 1;
        }
    }
}
function drawCells2(cv, index, cs, list)
{
    const lw = Math.ceil(cv.width / cs)
    const ct = cv.getContext('2d');
    ct.fillStyle = cellsColors[0];
    ct.fillRect(0, 0, cv.width, cv.height);
    for (let i = 0; i < list[index].length; i++)
    {
        const color = list[index][i];
        if (color)
        {
            ct.fillStyle = cellsColors[color];
            ct.fillRect((i % lw) * cs, (i - (i % lw)) / lw * cs, cs, cs);
        }
    }
}

const canvaDIV = document.getElementById("canvaDIV");

function setNewColor(e, input)
{
    switch (input) {
        case 1:
            cellsColors[1] = e.colorHSL;
            Color1DIV.style.backgroundColor = cellsColors[1];
            drawCells();
            reDrawRM();
            reDrawLM();
            break;

        case 2:
            cellsColors[0] = e.colorHSL;
            Color2DIV.style.backgroundColor = cellsColors[0];
            canvaDIV.style.backgroundColor = cellsColors[0];
            drawCells();
            reDrawRM();
            reDrawLM();
            break;

        default:
            break;
    }
}

function cancelNewColor(input)
{
    switch (input) {
        case 1:
            if (cellsColors[1] != cellsColors_past[1]) {
            cellsColors[1] = cellsColors_past[1];
            Color1DIV.style.backgroundColor = cellsColors[1];
            drawCells();
            reDrawRM();
            reDrawLM();
            }
            break;

        case 2:
            if (cellsColors[0] != cellsColors_past[0]) {
            cellsColors[0] = cellsColors_past[0];
            Color2DIV.style.backgroundColor = cellsColors[0];
            canvaDIV.style.backgroundColor = cellsColors[0];
            drawCells();
            reDrawRM();
            reDrawLM();
            }
            break;

        default:
            break;
    }
}

function buttons(btn, prm)
{
    switch (btn) {
        case "width":
            if (widthInput.value != "")
            {
                const newNumber = parseInt(widthInput.value);
                if ((newNumber ^ 0) === newNumber && newNumber >= 200 && newNumber <= 2000)
                {
                    canva.width = widthInput.value;
                    widthButton.blur();
                    onStart();
                }
                else
                {
                    alert("Min: 200, Max: 2000");
                }
            }
            break;

        case "fullScreen":
            fullScreenButton.blur();
            canva.requestFullscreen();
            canva.height = screen.height;
            elementPositions();
            onStart(true);
            break;

        case "Cscale":
            cellScale = chscInput.value;
            onStart();
            break;

        case "color1":
            {
                cellsColors_past[1] = cellsColors[1];
                const rect = prm.getBoundingClientRect();
                rect.x += window.pageXOffset;
                rect.y += window.pageYOffset;
                const h = parseInt(cellsColors[1].slice(cellsColors[1].indexOf("(") + 1, cellsColors[1].indexOf(",")));
                const s = parseInt(cellsColors[1].slice(cellsColors[1].indexOf(",") + 1, cellsColors[1].indexOf("%")));
                const l = parseInt(cellsColors[1].slice(cellsColors[1].lastIndexOf(",") + 1, cellsColors[1].lastIndexOf(")")-1));
                colorPicker1.setColorHSL(h, s, l);
                colorPicker1.openMenu(rect);
            }
            break;

        case "color2":
            {
                cellsColors_past[0] = cellsColors[0];
                const rect = prm.getBoundingClientRect();
                rect.x += window.pageXOffset;
                rect.y += window.pageYOffset;
                const h = parseInt(cellsColors[0].slice(cellsColors[0].indexOf("(") + 1, cellsColors[0].indexOf(",")));
                const s = parseInt(cellsColors[0].slice(cellsColors[0].indexOf(",") + 1, cellsColors[0].indexOf("%")));
                const l = parseInt(cellsColors[0].slice(cellsColors[0].lastIndexOf(",") + 1, cellsColors[0].lastIndexOf(")")-1));
                colorPicker2.setColorHSL(h, s, l);
                colorPicker2.openMenu(rect);
            }
            break;

        case "speed":
            cellSpeed = speedInput.value;
            break;

        case "RM1":
            if ((RM1Input.checked && prm != "canva") || prm == "canva")
            {
                RM1Input.checked = true;
                RM2Input.checked = false;
                RM3Input.checked = false;
                RM4Input.checked = false;
                RM5Input.checked = false;
                RMH1.style.display = "block";
                RMH5.style.display = "none";
                RMH2.style.display = "none";
                RMH4.style.display = "none";
                addingElement = 1;
                RM1Input.blur();
            }
            else
            {
                RMcheckfirst();
            }
            break;

        case "RM2":
            if ((RM2Input.checked && prm != "canva") || prm == "canva")
            {
                RM1Input.checked = false;
                RM2Input.checked = true;
                RM3Input.checked = false;
                RM4Input.checked = false;
                RM5Input.checked = false;
                RMH1.style.display = "none";
                RMH5.style.display = "none";
                RMH2.style.display = "block";
                RMH4.style.display = "none";
                addingElement = 2;
                RM2Input.blur();
            }
            else
            {
                RMcheckfirst();
            }
            break;

        case "RM3":
            if ((RM3Input.checked && prm != "canva") || prm == "canva")
            {
                RM1Input.checked = false;
                RM2Input.checked = false;
                RM3Input.checked = true;
                RM4Input.checked = false;
                RM5Input.checked = false;
                RMH1.style.display = "none";
                RMH5.style.display = "none";
                RMH2.style.display = "none";
                RMH4.style.display = "none";
                addingElement = 3;
                RM3Input.blur();
            }
            else
            {
                RMcheckfirst();
            }
            break;

        case "RM4":
            if ((RM4Input.checked && prm != "canva") || prm == "canva")
            {
                RM1Input.checked = false;
                RM2Input.checked = false;
                RM3Input.checked = false;
                RM4Input.checked = true;
                RM5Input.checked = false;
                RMH1.style.display = "none";
                RMH5.style.display = "none";
                RMH2.style.display = "none";
                RMH4.style.display = "block";
                addingElement = 4;
                RM4Input.blur();
            }
            else
            {
                RMcheckfirst();
            }
            break;

        case "RM5":
            if ((RM5Input.checked && prm != "canva") || prm == "canva")
            {
                RM1Input.checked = false;
                RM2Input.checked = false;
                RM3Input.checked = false;
                RM4Input.checked = false;
                RM5Input.checked = true;
                RMH1.style.display = "none";
                RMH5.style.display = "block";
                RMH2.style.display = "none";
                RMH4.style.display = "none";
                addingElement = -1;
                RM5Input.blur();
            }
            else
            {
                RMcheckfirst();
            }
            break;

        case "Wclear":
            WclearButton.blur();
            Cells = [[], []];
            createCeils();
            drawCells();
            break;

        case "Wrecreate":
            WrecreateButton.blur();
            onStart();
            break;



        case "LM1":
            if ((LM1Input.checked && prm != "canva") || prm == "canva")
            {
                LM1Input.checked = true;
                LM2Input.checked = false;
                LM3Input.checked = false;
                LM4Input.checked = false;
                LMH1.style.display = "block";
                LMH2.style.display = "none";
                startPosition = 1;
                LM1Input.blur();
            }
            else
            {
                LMcheckfirst();
            }
            break;

        case "LM2":
            if ((LM2Input.checked && prm != "canva") || prm == "canva")
            {
                LM1Input.checked = false;
                LM2Input.checked = true;
                LM3Input.checked = false;
                LM4Input.checked = false;
                LMH1.style.display = "none";
                LMH2.style.display = "block";
                startPosition = 2;
                LM2Input.blur();
            }
            else
            {
                LMcheckfirst();
            }
            break;

        case "LM3":
            if ((LM3Input.checked && prm != "canva") || prm == "canva")
            {
                LM1Input.checked = false;
                LM2Input.checked = false;
                LM3Input.checked = true;
                LM4Input.checked = false;
                LMH1.style.display = "none";
                LMH2.style.display = "none";
                startPosition = 3;
                LM3Input.blur();
            }
            else
            {
                LMcheckfirst();
            }
            break;

        case "LM4":
            if ((LM4Input.checked && prm != "canva") || prm == "canva")
            {
                LM1Input.checked = false;
                LM2Input.checked = false;
                LM3Input.checked = false;
                LM4Input.checked = true;
                startPosition = 4;
                LM4Input.blur();
            }
            else
            {
                LMcheckfirst();
            }
            break;

        case "hintOpen":
            hintDIV.style.display = "block";
            break;

        case "hintClose":
            hintDIV.style.display = "none";
            break;

        default:
            break;
    }
}
function RMcheckfirst()
{
    RM1Input.checked = true;
    RM2Input.checked = false;
    RM3Input.checked = false;
    RM4Input.checked = false;
    RM5Input.checked = false;
    RMH1.style.display = "block";
    RMH5.style.display = "none";
    RMH2.style.display = "none";
    RMH4.style.display = "none";
    addingElement = 1;
}
function LMcheckfirst()
{
    LM1Input.checked = true;
    LM2Input.checked = false;
    LM3Input.checked = false;
    LM4Input.checked = false;
    LMH1.style.display = "block";
    LMH2.style.display = "none";
    startPosition = 1;
}

const RMH2I1 = document.getElementById("RMH2I1");
RMH2I1.oninput = () => { buttons2("RMH2I1") };
const RMH2I2 = document.getElementById("RMH2I2");
RMH2I2.oninput = () => { buttons2("RMH2I2") };
const RMH2I3 = document.getElementById("RMH2I3");
RMH2I3.oninput = () => { buttons2("RMH2I3") };
const RMH2I4 = document.getElementById("RMH2I4");
RMH2I4.oninput = () => { buttons2("RMH2I4") };

const RMH1I1 = document.getElementById("RMH1I1");
RMH1I1.oninput = () => { buttons2("RMH1I1") };
const RMH1I2 = document.getElementById("RMH1I2");
RMH1I2.oninput = () => { buttons2("RMH1I2") };
document.getElementById("RMH1I3").oninput = () => { RMH1Equal = 1 - RMH1Equal };
const RMH1O1 = document.getElementById("RMH1O1");
const RMH1O2 = document.getElementById("RMH1O2");
RMH1I1.value = drawingWidth;
RMH1I2.value = drawingHeight;
let RMH1Equal = 1;

const RMH4I1 = document.getElementById("RMH4I1");
RMH4I1.oninput = () => { buttons2("RMH4I1") };
const RMH4I2 = document.getElementById("RMH4I2");
RMH4I2.oninput = () => { buttons2("RMH4I2") };
document.getElementById("RMH4I3").oninput = () => { RMH4Equal = 1 - RMH4Equal };
const RMH4O1 = document.getElementById("RMH4O1");
const RMH4O2 = document.getElementById("RMH4O2");
RMH4I1.value = randomingWidth;
RMH4I2.value = randomingHeight;
let RMH4Equal = 1;

const RMH5I1 = document.getElementById("RMH5I1");
RMH5I1.oninput = () => { buttons2("RMH5I1") };
const RMH5I2 = document.getElementById("RMH5I2");
RMH5I2.oninput = () => { buttons2("RMH5I2") };
document.getElementById("RMH5I3").oninput = () => { RMH5Equal = 1 - RMH5Equal };
const RMH5O1 = document.getElementById("RMH5O1");
const RMH5O2 = document.getElementById("RMH5O2");
RMH5I1.value = clearingWidth;
RMH5I2.value = clearingHeight;
let RMH5Equal = 1;


const LMH1I1 = document.getElementById("LMH1I1");
LMH1I1.oninput = () => { buttons2("LMH1I1") };
const LMH1I2 = document.getElementById("LMH1I2");
LMH1I2.oninput = () => { buttons2("LMH1I2") };
const LMH1O1 = document.getElementById("LMH1O1");
const LMH1O2 = document.getElementById("LMH1O2");
LMH1I1.value = spaceBetweenCellGroup;
LMH1I2.value = cellFrequencyInGroup;
LMH1O1.innerText = LMH1I1.value;
LMH1O2.innerText = LMH1I2.value;

const LMH2I1 = document.getElementById("LMH2I1");
LMH2I1.oninput = () => { buttons2("LMH2I1") };
const LMH2O1 = document.getElementById("LMH2O1");
LMH2I1.value = cellFrequencyInGroup;
LMH2O1.innerText = LMH2I1.value;


function buttons2(btn)
{
    switch (btn) {
        case "RMH2I1":
            if (RMH2I1.checked)
            {
                RMH2I2.checked = false;
                RMH2I3.checked = false;
                RMH2I4.checked = false;
                gliderDirection = 1;
                RMH2I1.blur();
                reDrawRM();
            }
            else
            {
                RMH1checkfirst();
            }
            break;

        case "RMH2I2":
            if (RMH2I2.checked)
            {
                RMH2I1.checked = false;
                RMH2I3.checked = false;
                RMH2I4.checked = false;
                gliderDirection = 2;
                RMH2I2.blur();
                reDrawRM();
            }
            else
            {
                RMH1checkfirst();
            }
            break;

        case "RMH2I3":
            if (RMH2I3.checked)
            {
                RMH2I2.checked = false;
                RMH2I1.checked = false;
                RMH2I4.checked = false;
                gliderDirection = 3;
                RMH2I3.blur();
                reDrawRM();
            }
            else
            {
                RMH1checkfirst();
            }
            break;

        case "RMH2I4":
            if (RMH2I4.checked)
            {
                RMH2I2.checked = false;
                RMH2I3.checked = false;
                RMH2I1.checked = false;
                gliderDirection = 4;
                RMH2I4.blur();
                reDrawRM();
            }
            else
            {
                RMH1checkfirst();
            }
            break;




        case "RMH1I1":
            drawingWidth = parseInt(RMH1I1.value);
            RMH1O1.innerText = RMH1I1.value;
            if (RMH1Equal)
            {
                RMH1I2.value = RMH1I1.value;
                RMH1O2.innerText = RMH1I1.value;
                drawingHeight = parseInt(RMH1I1.value);
            }
            break;

        case "RMH1I2":
            drawingHeight = parseInt(RMH1I2.value);
            RMH1O2.innerText = RMH1I2.value;
            if (RMH1Equal)
            {
                RMH1I1.value = RMH1I2.value;
                RMH1O1.innerText = RMH1I2.value;
                drawingWidth = parseInt(RMH1I2.value);
            }
            break;



        case "RMH5I1":
            clearingWidth = parseInt(RMH5I1.value);
            RMH5O1.innerText = RMH5I1.value;
            if (RMH5Equal)
            {
                RMH5I2.value = RMH5I1.value;
                RMH5O2.innerText = RMH5I1.value;
                clearingHeight = parseInt(RMH5I1.value);
            }
            break;

        case "RMH5I2":
            clearingHeight = parseInt(RMH5I2.value);
            RMH5O2.innerText = RMH5I2.value;
            if (RMH5Equal)
            {
                RMH5I1.value = RMH5I2.value;
                RMH5O1.innerText = RMH5I2.value;
                clearingWidth = parseInt(RMH5I2.value);
            }
            break;




        case "RMH4I1":
            randomingWidth = parseInt(RMH4I1.value);
            RMH4O1.innerText = RMH4I1.value;
            if (RMH4Equal)
            {
                RMH4I2.value = RMH4I1.value;
                RMH4O2.innerText = RMH4I1.value;
                randomingHeight = parseInt(RMH4I1.value);
            }
            break;

        case "RMH4I2":
            randomingHeight = parseInt(RMH4I2.value);
            RMH4O2.innerText = RMH4I2.value;
            if (RMH4Equal)
            {
                RMH4I1.value = RMH4I2.value;
                RMH4O1.innerText = RMH4I2.value;
                randomingWidth = parseInt(RMH4I2.value);
            }
            break;



        case "LMH1I1":
            spaceBetweenCellGroup = parseFloat(LMH1I1.value);
            LMH1O1.innerText = LMH1I1.value;
            randomChangeColor2(0, (ML1.width / ML1s) * (ML1.width / ML1s + 1), Math.ceil(ML1.width / ML1s));
            reDrawLM();
            break;

        case "LMH1I2":
            cellFrequencyInGroup = parseFloat(LMH1I2.value);
            LMH1O2.innerText = LMH1I2.value;
            randomChangeColor2(0, (ML1.width / ML1s) * (ML1.width / ML1s + 1), Math.ceil(ML1.width / ML1s));
            reDrawLM();
            break;

        case "LMH2I1":
            cellFrequency = parseFloat(LMH2I1.value);
            LMH2O1.innerText = LMH2I1.value;
            randomChangeColor3(1, (ML3.width / ML3s) * (ML3.width / ML3s + 1), MLCells);
            reDrawLM();
            break;

        default:
            break;
    }
}

function RMH1checkfirst()
{
    RMH2I1.checked = true;
    RMH2I2.checked = false;
    RMH2I3.checked = false;
    RMH2I4.checked = false;
    gliderDirection = 1;
}


let sp_moving = false;
const splitter = document.getElementById("splitter");
splitter.addEventListener("mousedown", () => { sp_moving = true; });
document.addEventListener("mousemove", splMove);
splitter.style.top = canva.height + "px";
function splMove(e)
{
    if (sp_moving)
    {
        const y = e.pageY;
        const y_ = e.clientY;
        const dy = y - y_;
        const newY = Math.min(Math.max(y, dy + 10), window.innerHeight + dy - 10);
        splitter.style.top = newY + "px";
        canva.height = newY;
        elementPositions();
        drawCells();
        console.log(y, y_, dy);
    }
}
function splUp()
{
    if (sp_moving)
    {
        onStart();
    }
    sp_moving = false;
}