'use strict';

const circlePlay = document.querySelector('#circle-player');
const crossPlay = document.querySelector('#cross-player');
const buttons = document.querySelectorAll('.playfield__box');

// Funkce pro změnu ikony hráče v horní navigaci + vložení kolečka/křížku do hracího pole

buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    const buttonAfterClick = e.target;
    circlePlay.classList.toggle('circle-not-play');
    crossPlay.classList.toggle('cross-play');

    if (circlePlay.className === 'circle-play') {
      button.classList.toggle('playfield__box--content--cross');
      button.disabled = 'true';

      isWinningMove(buttonAfterClick);
      if (isWinningMove(buttonAfterClick) === true) {
        reloadPage('Vyhrál Nik. Udělat novej bordel?');
      }
    } else {
      button.classList.toggle('playfield__box--content--circle');
      button.disabled = 'true';

      isWinningMove(buttonAfterClick);
      if (isWinningMove(buttonAfterClick) === true) {
        reloadPage('Vyhrál Yzo. Udělat novej bordel?');
      }
    }
  });
});

// Znovunačtení stránky po potvrzení confirm

const reloadPage = (message) => {
  if (confirm(message) === true) {
    location.reload();
  }
};

// ------------------kontrola, kdo vyhrál-----------------------

// Funkce pro vrácení objektu s číslem řádku a sloupce

const boardSize = 10; // 10x10

const getPosition = (button) => {
  let buttonIndex = 0;
  while (buttonIndex < buttons.length) {
    if (button === buttons[buttonIndex]) {
      break;
    }
    buttonIndex++;
  }

  return {
    row: Math.floor(buttonIndex / boardSize),
    column: buttonIndex % boardSize,
  };
};

console.log(getPosition(buttons[99]));

// Funkce, která vrátí pro číslo řádku a sloupce prvek/element

const getField = (row, column) => buttons[row * boardSize + column];
console.log(getField(9, 9));

// Funkce, která vrací obsah pole (křížek, kolečko, prázdné)

const getSymbol = (button) => {
  if (button.classList.contains('playfield__box--content--cross')) {
    return 'cross';
  } else if (button.classList.contains('playfield__box--content--circle')) {
    return 'circle';
  }
};

console.log(getSymbol(buttons[99]));

// Funkce, která zjistí, jestli je v řádku nebo ve sloupci vedle sebe 5 stejných symbolů

const symbolsToWin = 5;
const isWinningMove = (button) => {
  const origin = getPosition(button);
  const symbol = getSymbol(button);

  let i;
  let a;

  let inRow = 1; // Jednička pro právě vybrané políčko
  // Koukni doleva
  i = origin.column;
  while (i > 0 && symbol === getSymbol(getField(origin.row, i - 1))) {
    inRow++;
    i--;
  }

  // Koukni doprava
  i = origin.column;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(origin.row, i + 1))
  ) {
    inRow++;
    i++;
  }

  if (inRow >= symbolsToWin) {
    return true;
  }

  let inColumn = 1;
  // Koukni nahoru
  i = origin.row;
  while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
    inColumn++;
    i--;
  }

  // Koukni dolu
  i = origin.row;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(i + 1, origin.column))
  ) {
    inColumn++;
    i++;
  }

  if (inColumn >= symbolsToWin) {
    return true;
  }

  //Výhra v diagonále
  //doleva nahoru
  let diagonalLeft = 1;
  a = origin.row;
  i = origin.column;

  while (a > 0 && i > 0 && symbol === getSymbol(getField(a - 1, i - 1))) {
    diagonalLeft++;
    a--;
    i--;
  }
  // doprava dolu
  a = origin.row;
  i = origin.column;

  while (
    a < boardSize - 1 &&
    i < boardSize - 1 &&
    symbol === getSymbol(getField(a + 1, i + 1))
  ) {
    diagonalLeft++;
    a++;
    i++;
  }
  if (diagonalLeft >= symbolsToWin) {
    return true;
  }

  // doprava nahoru
  let diagonalRight = 1;
  a = origin.row;
  i = origin.column;

  while (
    a > 0 &&
    i < boardSize - 1 &&
    symbol == getSymbol(getField(a - 1, i + 1))
  ) {
    diagonalRight++;
    a--;
    i++;
  }

  //doleva dolu
  a = origin.row;
  i = origin.column;

  while (
    a < boardSize - 1 &&
    i > 0 &&
    symbol === getSymbol(getField(a + 1, i - 1))
  ) {
    diagonalRight++;
    a++;
    i--;
  }
  if (diagonalRight >= symbolsToWin) {
    return true;
  }

  return false;
};
