let sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
const startBoard = 5;
const endboard = 24;
const gridSize = endboard - startBoard;
let snake = [[6, 6], [6, 7]];
let food;
let score = 0;

function initializeGame() {
  sheet.clear();
  sheet.setRowHeights(startBoard, gridSize + 1, 30);
  sheet.setColumnWidths(startBoard, gridSize + 1, 30);
  const range = sheet.getRange(startBoard, startBoard, gridSize + 1, gridSize + 1);
  range.setBorder(true, true, true, true, true, true, "black", SpreadsheetApp.BorderStyle.SOLID);

  food = getRandomCoordinate(gridSize);
  while (snake.some(p => p[0] === food[0] && p[1] === food[1])) {
    food = getRandomCoordinate(gridSize);
  }

  sheet.getRange("Y4").setValue("Score: " + score).setFontSize(24);
  const props = PropertiesService.getScriptProperties();
  const topScore = parseInt(props.getProperty("top_score") || "0", 10);
  const topPlayer = props.getProperty("top_player") || "No one yet";
  sheet.getRange("Y5").setValue(`Top Score: ${topScore} by ${topPlayer}`).setFontSize(20).setFontWeight("bold");

  snake.forEach(part => sheet.getRange(part[0], part[1]).setBackground("green"));
  sheet.getRange(food[0], food[1]).setBackground("red");
}

function getRandomCoordinate(gridSize) {
  const row = Math.floor(Math.random() * gridSize) + startBoard;
  const col = Math.floor(Math.random() * gridSize) + startBoard;
  return [row, col];
}

function moveSnake(direction) {
  const head = snake[snake.length - 1];
  let newHead;
  if (direction === "right") newHead = [head[0], head[1] + 1];
  else if (direction === "down") newHead = [head[0] + 1, head[1]];
  else if (direction === "left") newHead = [head[0], head[1] - 1];
  else if (direction === "up") newHead = [head[0] - 1, head[1]];

  if (
    newHead[0] < startBoard || newHead[1] < startBoard ||
    newHead[0] > endboard || newHead[1] > endboard ||
    snake.some(p => p[0] === newHead[0] && p[1] === newHead[1])
  ) {
    return true;
  }

  snake.push(newHead);
  const tail = snake.shift();
  sheet.getRange(tail[0], tail[1]).setBackground(null);

  if (newHead[0] === food[0] && newHead[1] === food[1]) {
    growSnake(newHead, tail);
  }

  snake.forEach(p => sheet.getRange(p[0], p[1]).setBackground("green"));
  return false;
}

function growSnake(tail) {
  snake.unshift(tail);
  food = getRandomCoordinate(gridSize);
  sheet.getRange(food[0], food[1]).setBackground("red");
  score++;
  sheet.getRange("Y4").setValue("Score: " + score);
}
