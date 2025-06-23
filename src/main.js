function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu("Snake Game")
    .addItem("PlayGame", "play")
    .addItem("Go Down", "changeDirectionToDown")
    .addItem("Go Right", "changeDirectionToRight")
    .addItem("Go Left", "changeDirectionToLeft")
    .addItem("Go Up", "changeDirectionToUp")
    .addToUi();
}

function play() {
  const props = PropertiesService.getScriptProperties();
  if (props.getProperty("game_running") === "true") {
    Logger.log("Game is already running. Cannot start a new one.");
    return;
  }

  props.setProperty("game_running", "true");
  props.setProperty("direction", "right");

  initializeGame();
  let gameOver = false;

  while (!gameOver) {
    if (props.getProperty("game_running") !== "true") break;
    const direction = props.getProperty("direction");
    Logger.log(`Current Direction: ${direction}`);
    gameOver = moveSnake(direction);
    SpreadsheetApp.flush();
    Utilities.sleep(75);
  }

  props.setProperty("game_running", "false");
  checkTopGame(score);
  Logger.log("Game Over");
}
