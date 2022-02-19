const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const MAX_AMT_COLUMNS = 4;
const MAX_AMT_ROWS = 4;
const CARD_ROW_PADDING = 15;
const CARD_HEIGHT =
  (canvasHeight - CARD_ROW_PADDING * (MAX_AMT_ROWS + 1)) / MAX_AMT_ROWS;
const CARD_WIDTH = CARD_HEIGHT * 0.75;
const CARD_COLUMN_PADDING =
  (canvasWidth - CARD_WIDTH * MAX_AMT_COLUMNS) / (MAX_AMT_COLUMNS + 1);
const TRENDING_BG_SIZE = CARD_HEIGHT / 6;
const NUMBER_BG_SIZE = CARD_WIDTH / 7;

const numberToColor = {
  1: 'blue',
  2: 'green',
  3: 'orange',
  4: 'brown',
  5: 'red',
};

const pickRandomFromArr = (arr) =>
  arr.splice(Math.floor(Math.random() * arr.length), 1)[0];

let cards = [];
let numbers = [];
let trendingArr = [];
function init() {
  cards = [
    ['Government Presence', 'Rule of Law', 'Social Services'],
    ['Economic Strength', 'Wealth Distribution', 'Agriculture & Trade'],
    [
      'Race Relations',
      'Class Relations',
      'Gender Relations',
      'Sexual Orientation Relations',
    ],
    [
      'Military Influence',
      'Religious Influence',
      'Technology Influence',
      'Arts & Culture Influence',
    ],
  ];

  numbers = [1, 1, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5];

  // Construct trending array
  const amtTrending = 4;
  const amtNotTrending = 10;
  trendingArr = [];
  for (let i = 0; i < amtTrending + amtNotTrending; i++) {
    if (i < amtTrending) trendingArr.push(true);
    else trendingArr.push(false);
  }
}

function draw() {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  init();

  for (let column = 0; column < cards.length; column++) {
    const x = CARD_COLUMN_PADDING * (column + 1) + CARD_WIDTH * column;

    for (let row = 0; row < cards[column].length; row++) {
      const y = CARD_ROW_PADDING * (row + 1) + CARD_HEIGHT * row;

      drawCard(
        x,
        y,
        cards[column][row],
        pickRandomFromArr(numbers),
        pickRandomFromArr(trendingArr)
      );
    }
  }
}

function drawCard(x, y, text, number, isTrending) {
  // Draw text
  ctx.font = '20px sans-serif';
  ctx.fillStyle = 'black';
  const words = text.split(' ');
  words.forEach((word, i) => {
    const textSize = ctx.measureText(word);
    const wordPadding = i * 25;
    const heightOffset = words.length * -5 - TRENDING_BG_SIZE;
    const textX = x + CARD_WIDTH / 2 - textSize.width / 2 + NUMBER_BG_SIZE - 15;
    const textY = y + CARD_HEIGHT / 2 + wordPadding + heightOffset;
    ctx.fillText(word, textX, textY);
  });

  // Draw number
  ctx.fillStyle = numberToColor[number];
  ctx.fillRect(x, y, NUMBER_BG_SIZE, CARD_HEIGHT);
  ctx.fillStyle = 'white';
  ctx.fillText(number, x + 5, y + 25);

  // Draw trending
  if (isTrending) {
    ctx.fillStyle = 'gold';
    ctx.fillRect(
      x,
      y + CARD_HEIGHT - TRENDING_BG_SIZE,
      CARD_WIDTH,
      TRENDING_BG_SIZE
    );

    ctx.fillStyle = 'black';
    const textSize = ctx.measureText('Trending');
    ctx.fillText(
      'Trending',
      x + textSize.width / 2,
      y + CARD_HEIGHT - TRENDING_BG_SIZE / 2 + 5
    );
  }

  // Draw card border
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, CARD_WIDTH, CARD_HEIGHT);
}

document.querySelector('#randomBtn').onclick = draw;
draw();
