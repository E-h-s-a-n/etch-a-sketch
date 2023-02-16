/* eslint-disable no-alert */

const tileGrid = document.querySelector('.container');
const modeBtn = document.querySelectorAll('button.mode');
const panelSizeSpan = document.querySelector('h3 span');
const borderBtn = document.querySelector('.borders');
const clearBtn = document.querySelector('.clear');

const defaultSize = 24;
let currentSize = defaultSize;
let singleColor = 'rgb(150, 150, 150)';
let color;
let preColor = '';
let currentBg = tileGrid.style.backgroundColor;
let borders = false;

function rgbLinearShade(p, c) {
  // https://stackoverflow.com/a/13542669/
  if (c.length < 9) return;
  const r = Math.round;
  const i = parseInt;
  const [a, b, , d] = c.split(',');
  let P = p < 0;
  const t = P ? 0 : (255 * p);
  P = P ? 1 + p : 1 - p;
  const shadedColor = `rgb${d ? 'a(' : '('}${r(i(a[3] === 'a' ? a.slice(5) : a.slice(4)) * P + t)},${r(i(b) * P + t)},${r(i(c) * P + t)}${d ? `,${d}` : ')'}`;
  // eslint-disable-next-line consistent-return
  return shadedColor;
}

function getRandomInt(_min, _max) {
  // min, max should be integers
  let min = _min;
  let max = _max;
  if (!_max) {
    max = _min;
    min = 0;
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const colorSingle = () => singleColor;

function colorRandom() {
  const r = getRandomInt;
  return `hsl(${r(0, 359)}deg, ${r(60, 85)}%, ${r(45, 65)}%)`;
}

const colorErase = () => '';

const colorDarken = (percentage = -0.1) => {
  console.log('darkening');
  const c = rgbLinearShade(percentage, preColor);
  return c;
};

const colorLighter = (percentage = 0.1) => {
  console.log('lightning');
  const c = rgbLinearShade(percentage, preColor);
  return c;
};

function createPanel(maxTile = 16) {
  tileGrid.style.gridTemplateColumns = `repeat(${maxTile}, 1fr)`;
  tileGrid.style.gridAutoRows = `${700 / maxTile}px`;
  panelSizeSpan.textContent = `${maxTile}x${maxTile}`;
  for (let i = 0; i < maxTile ** 2 + 0; i += 1) {
    const tile = document.createElement('div');
    tileGrid.appendChild(tile);
  }
}
// Color modes button click event
function setActiveMode() {
  modeBtn.forEach((el) => {
    el.classList.remove('active-mode');
  });
  this.classList.add('active-mode');
  const colorMode = this.getAttribute('data-mode');

  if (colorMode === 'random') color = colorRandom;
  else if (colorMode === 'single') color = colorSingle;
  else if (colorMode === 'darken') color = colorDarken;
  else if (colorMode === 'lighter') color = colorLighter;
  else if (colorMode === 'erase') color = colorErase;
  else color = colorRandom;
}
// tileGrid mouse-over event
function setTileColor(ev) {
  if (!ev.buttons > 0) return;
  preColor = ev.target.style.backgroundColor;
  // eslint-disable-next-line no-param-reassign
  ev.target.style.backgroundColor = color();
}
// colorWell-input change event
const colorWell = (e) => {
  singleColor = e.target.value;
};
// colorWellBg-input change event
const colorWellBg = (e) => {
  currentBg = e.target.value;
  tileGrid.style.backgroundColor = currentBg;
};
// new button click event
function newPanel() {
  let n = prompt('Chose a size for the drawing pane:\n *A number between 2 and 100', defaultSize);
  if (n == null || n === '') return;
  n = (+n) ? (+n) : defaultSize;
  if (n > 99) {
    n = 99;
  } else if (n < 2) {
    n = 2;
  }
  currentSize = n;
  tileGrid.replaceChildren();
  createPanel(n);
}
// clear button click event
function clearPanel() {
  // eslint-disable-next-line no-restricted-globals
  const c = confirm('Are you sure to Clear?');
  if (!c) return;
  tileGrid.replaceChildren();
  createPanel(currentSize);
}
// border on/off click event
function toggleBorders(ev) {
  const border = '1px solid #C0C0C0';
  const cssStyle = document.styleSheets[0].cssRules[8].style;
  if (!borders) {
    cssStyle['border-right'] = border;
    cssStyle['border-bottom'] = border;
    borders = true;
    // eslint-disable-next-line no-param-reassign
    ev.target.textContent = 'borders On';
  } else {
    cssStyle['border-right'] = '';
    cssStyle['border-bottom'] = '';
    borders = false;
    // eslint-disable-next-line no-param-reassign
    ev.target.textContent = 'borders Off';
  }
}

document.querySelector('#colorWell').addEventListener('change', colorWell);
document.querySelector('.new').addEventListener('click', newPanel);
document.querySelector('#colorWell-bg').addEventListener('change', colorWellBg);

clearBtn.addEventListener('click', clearPanel);
borderBtn.addEventListener('click', toggleBorders);
modeBtn.forEach((el) => {
  el.addEventListener('click', setActiveMode);
});

const main = () => {
  currentSize = defaultSize;
  createPanel(currentSize);
  color = colorRandom;
  tileGrid.addEventListener('mouseover', setTileColor);
};

window.addEventListener('load', main, false);

window.addEventListener('keydown', (e) => {
  if (!e.repeat) {
    // console.log(e);
    const clickEv = new MouseEvent('click', { bubbles: true, cancelable: true });
    if (e.code.startsWith('Digit')) {
      const button = modeBtn.item(e.code.slice(-1) - 1);
      if (!button) return; // error
      button.dispatchEvent(clickEv);
    } else if (e.code === 'KeyB') borderBtn.dispatchEvent(clickEv);
    else if (e.code === 'KeyC') clearBtn.dispatchEvent(clickEv);
  }
});
