function checkTopGame(finalScore) {
  const props = PropertiesService.getScriptProperties();
  const topScore = parseInt(props.getProperty("top_score") || "0", 10);

  if (finalScore > topScore) {
    const playerName = Browser.inputBox(
      "Game Over - New High Score!",
      `You got the highest score of ${finalScore}! Enter your name:`,
      Browser.Buttons.OK_CANCEL
    );

    if (playerName !== "cancel" && playerName.trim() !== "") {
      props.setProperty("top_score", finalScore.toString());
      props.setProperty("top_player", playerName);
      sheet.getRange("Y5").setValue(`Top Score: ${finalScore} by ${playerName}`).setFontSize(20).setFontWeight("bold");
    }
  }
}

function resetGame() {
  const props = PropertiesService.getScriptProperties();
  snake = [[6, 6], [6, 7]];
  food = getRandomCoordinate(gridSize);
  score = 0;
  props.setProperty("game_running", "false");
  props.setProperty("direction", "right");
  props.setProperty("top_score", "0");
  props.setProperty("top_player", "No one yet");
  sheet.clear();
  initializeGame();
  Logger.log("Game has been reset.");
}

function test() {
  checkTopGame(1000);
}
