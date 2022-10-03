// https://stackoverflow.com/a/13542669/
const RGB_Linear_Shade=(p,c)=>{
    var i=parseInt,r=Math.round,
    [a,b,c,d]=c.split(","),
    P=p<0,
    t=P?0:(255*p),
    P=P?1+p:1-p;
    return "rgb"+
        (d?"a(":"(")+
        r(i(a[3]=="a"?a.slice(5):a.slice(4))*P+t)+
        ","+r(i(b)*P+t)+
        ","+r(i(c)*P+t)+
        (d?","+d:")");
}

const HSLtoRGB=(hsl)=>{
    return +hsl;
}

const HEXtoRGB=(hex)=>{
    return +hex;
}

function getRandomInt(min, max){
    // min, max should be integers
    if (!max) max=min,min=0;
    return Math.floor(Math.random()*(max-min+1)+min);
}

// modeBtn click function
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
        tile.classList.add('div-borders');
        tile.addEventListener('mouseenter', setTileColor, false);
        tileGrid.appendChild(tile);
    }
}

// tile mouseenter function
function setTileColor(ev){
    if (!ev.buttons>0) return;

    const r = getRandomInt;
    let color;
    if (colorMode == 'random') color = `hsl(${r(360)}deg, ${r(60, 70)}%, ${r(35, 75)}%)`;
    if (colorMode == 'single') color = singleColor;
    // const color = RGB_Linear_Shade(-0.1, this.style.backgroundColor)
    // this.style.backgroundColor = color;
    this.style.backgroundColor = color;
    
}

const colorWell = (e)=>{
    singleColor = e.target.value;
    console.log(`color change= ${singleColor}`)
}

function newPanel(){
    let n = prompt('max tile number', 16);
    n = (+n) ? +n : 16;
    n = n>90?90:n<2?2:n;
    console.log('new panel', n);
    tileGrid.replaceChildren()
    createPanel(n);
}


const tileGrid = document.querySelector('.container');
const modeBtn = document.querySelectorAll('button.mode');
const randomSelect = document.querySelector('#random');
const panelSizeSpan = document.querySelector('h3 span');

let colorMode = 'random';
let singleColor = 'rgb(150, 150, 150)'

document.querySelector('#colorWell').addEventListener('change', colorWell);
document.querySelector('.new').addEventListener('click', newPanel)

modeBtn.forEach((el,)=>{
    el.addEventListener('click', setActiveMode);
});

createPanel(16);