'use strict';

import Game from '../modules/Game.class.js';

const game = new Game();
const scoreEl = document.querySelector('.game-score');
const btn = document.querySelector('.button');
const cells = document.querySelectorAll('.field-cell');
const msgStart = document.querySelector('.message-start');
const msgWin = document.querySelector('.message-win');
const msgLose = document.querySelector('.message-lose');

function update() {
  const state = game.getState().flat();

  cells.forEach((cell, i) => {
    const val = state[i];

    cell.textContent = val || '';
    cell.className = `field-cell${val ? ` field-cell--${val}` : ''}`;
  });
  scoreEl.textContent = game.getScore();
  msgStart.classList.add('hidden');
  msgWin.classList.toggle('hidden', game.getStatus() !== 'win');
  msgLose.classList.toggle('hidden', game.getStatus() !== 'lose');
}

btn.addEventListener('click', () => {
  if (game.getStatus() === 'idle') {
    game.start();
    btn.textContent = 'Restart';
    btn.classList.replace('start', 'restart');
  } else {
    game.restart();
  }
  update();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    game.moveLeft();
  }

  if (e.key === 'ArrowRight') {
    game.moveRight();
  }

  if (e.key === 'ArrowUp') {
    game.moveUp();
  }

  if (e.key === 'ArrowDown') {
    game.moveDown();
  }
  update();
});
