// https://stackoverflow.com/a/13542669/
const RGB_Linear_Shade=(p,c)=>{
    // c in rgb format
    if(c.length<9)return;
    var i=parseInt,r=Math.round,
    [a,b,c,d]=c.split(","),
    P=p<0,t=P?0:(255*p),P=P?1+p:1-p;
    return "rgb"+(d?"a(":"(")+
        r(i(a[3]=="a"?a.slice(5):a.slice(4))*P+t)+","+r(i(b)*P+t)+","+
        r(i(c)*P+t)+(d?","+d:")");
}

function getRandomInt(min, max){
    // min, max should be integers
    if (!max) max=min,min=0;
    return Math.floor(Math.random()*(max-min+1)+min);
}

function getRandomFloat(min, max, precision) {
    return
}

console.clear()

// Color modes button click event
function setActiveMode(){
    modeBtn.forEach((el)=>{
        el.classList.remove('active-mode');
    });
    this.classList.add('active-mode');
    colorMode = this.getAttribute('data-mode');
}

function createPanel(maxTile = 16){
    tileGrid.style.gridTemplateColumns = `repeat(${maxTile}, 1fr)`;
    tileGrid.style.gridAutoRows = `${700/maxTile}px`;
    panelSizeSpan.textContent = `${maxTile}x${maxTile}`;
    for (let i = 0; i < maxTile**2 + 0; i++) {
        const tile = document.createElement('div');
        // tile.classList.add('div-borders');
        tileGrid.appendChild(tile);
    }
}

// tileGrid mouse-over event
function setTileColor(ev){
    if (!ev.buttons>0) return;
    const r = getRandomInt;
    const preColor = ev.target.style.backgroundColor;
    let color;
    if (colorMode == 'random') color = `hsl(${r(359)}deg, ${r(60, 85)}%, ${r(45, 65)}%)`;
    else if (colorMode == 'single') color = singleColor;
    else if (colorMode == 'darken') color = RGB_Linear_Shade(-0.10, preColor);
    else if (colorMode == 'lighter') color = RGB_Linear_Shade(0.10, preColor);
    else if (colorMode == 'erase') color = currentBg;
    ev.target.style.backgroundColor = color;
    // console.log(ev);
}

// colorWell-input change event
const colorWell = (e) =>{
    singleColor = e.target.value;
}
// colorWellBg-input change event
const colorWellBg = (e)=>{
    currentBg = e.target.value;
    tileGrid.style.backgroundColor = currentBg;
}

// new button click event
function newPanel(){
    let n = prompt('Chose a size for the drawing pane:\n *A number between 2 and 100', defaultSize);
    if (n==null || n=="") return
    n = (+n)?(+n):defaultSize;
    n = n>99?99:n<2?2:n;
    currentSize = n;
    tileGrid.replaceChildren();
    createPanel(n);
}

// clear button click event
function clearPanel(){
    const c = confirm('Are you sure to Clear?');
    if(!c) return;
    tileGrid.replaceChildren();
    createPanel(currentSize);
}

function toggleBorders(ev){
    const border = "1px solid #C0C0C0";
    const cssStyle = document.styleSheets[0].cssRules[8].style;
    if (!borders) {
        cssStyle['border-right'] = border;
        cssStyle['border-bottom'] = border;
        borders = true;
        ev.target.textContent='borders On'
    } else {
        cssStyle['border-right'] = '';
        cssStyle['border-bottom'] = '';
        borders = false;
        ev.target.textContent='borders Off'
    }
}

const tileGrid = document.querySelector('.container');
const modeBtn = document.querySelectorAll('button.mode');
const randomSelect = document.querySelector('#random');
const panelSizeSpan = document.querySelector('h3 span');

const defaultSize = 24;
let currentSize = defaultSize;
let colorMode = 'random';
let singleColor = 'rgb(150, 150, 150)'
let currentBg = tileGrid.style.backgroundColor;
let borders = false

document.querySelector('#colorWell').addEventListener('change', colorWell);
document.querySelector('.new').addEventListener('click', newPanel);
document.querySelector('.clear').addEventListener('click', clearPanel);
document.querySelector('#colorWell-bg').addEventListener('change', colorWellBg);
document.querySelector('.borders').addEventListener('click', toggleBorders);

modeBtn.forEach((el,)=>{
    el.addEventListener('click', setActiveMode);
})

const main = ()=>{
    currentSize = 24;
    createPanel(currentSize);
    tileGrid.addEventListener('mouseover', setTileColor);
}

window.addEventListener('load', main, false);
window.addEventListener('keydown', e=>{
    if (!e.repeat&&e.code.startsWith('Digit')) {
        const button = modeBtn.item(e.code.slice(-1)-1);
        if(!button) return; // error
        const clickEv = new MouseEvent('click', {bubbles: true, cancelable: true});
        button.dispatchEvent(clickEv);
    }
})


