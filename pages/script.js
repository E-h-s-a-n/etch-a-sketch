function getRandInt(min, max){
    // min, max should be integers
    if (!max) max=min,min=0;
    return Math.floor(Math.random()*(max-min+1)+min);
}

function getRandFloat(min, max, precision=2) {
    const i = Math.pow(10, precision);
    const value = Math.random()*(max-min)+min
    return Math.round(value * i) / i;
}

function createPanel(maxTile = 16){
    tileGrid.style.gridTemplateColumns = `repeat(${maxTile}, 1fr)`;
    tileGrid.style.gridAutoRows = `${700/maxTile}px`;
    panelSizeSpan.textContent = `${maxTile}x${maxTile}`;
}

const main = ()=>{
    createPanel(currentSize, true);
}

const tileGrid = document.querySelector('.container');
const panelSizeSpan = document.querySelector('h3 span');
const AliDivs = document.querySelectorAll('.ali');
const defaultSize = 24;
let currentSize = defaultSize;

window.addEventListener('load', main, false);

r = getRandInt

AliDivs.forEach((el, key)=>{
    el.style.backgroundColor=`hsl(${r(360)}deg, 80%, 50%)`;
    let i = getRandFloat(0.25, 0.65);
    el.style.animationDuration = `${i}s`;
});


setInterval(() => {
    AliDivs.forEach((el,key)=>{
        // el.textContent = key
        if (key%2==0) return;
        el.style.backgroundColor=`hsl(${r(360)}deg, 80%, 50%)`;
    });    
}, 500);


tileGrid.addEventListener('mousedown', e=>{
    e.preventDefault()
    return false
    if(e.buttons>1){
        e.target.classList.remove('ali');
        e.target.style = '';
    } else if(e.buttons>0){
        // console.log(e.target)
        e.target.classList.add('ali');
        e.target.style.backgroundColor = 'rgb(0,0,0)';

    }
})