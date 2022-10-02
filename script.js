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

function setActiveMode(ev){
    modeBtn.forEach((el)=>{
        el.classList.remove('active-mode');
    });
    this.classList.add('active-mode');
    // colorMode = this.

}

function newPanel(maxTile = 16){
    tileGrid.style.gridTemplateColumns = `repeat(${maxTile}, 1fr)`;
    tileGrid.style.gridAutoRows = `${700/maxTile}px`;
    panelSize.textContent = `${maxTile}x${maxTile}`
    for (let i = 0; i < maxTile**2 + 0; i++) {
        const tile = document.createElement('div');
        tile.addEventListener('mouseenter', setTileColor);
        tileGrid.appendChild(tile);
    }
}

const colorMode = 'random'
function setTileColor(ev){
    if (ev.buttons > 0){
        const r = getRandomInt
        let color
        if (colorMode == 'random') color = `hsl(${r(360)}deg, ${r(60, 70)}%, ${r(35, 75)}%)`;
        if (colorMode == 'single') color = 'rgb(100, 100, 100)'
        // const color = RGB_Linear_Shade(-0.1, this.style.backgroundColor)
        // this.style.backgroundColor = color;
        this.style.backgroundColor = color;
    }
}

function getRandomInt(min, max){
    // min, max should be integers
    if (!max) max=min,min=0;
    return Math.floor(Math.random()*(max-min+1)+min);
}


const tileGrid = document.querySelector('.container');
const modeBtn = document.querySelectorAll('button.mode');
const randomSelect = document.querySelector('#random');
const panelSize = document.querySelector('h3 span');


modeBtn.forEach((el,)=>{
    console.log('done');
    el.addEventListener('click', setActiveMode);
});

newPanel(8);