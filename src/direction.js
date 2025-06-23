function changeDirectionToDown() {
  const props = PropertiesService.getScriptProperties();
  if (props.getProperty("direction") !== "up") {
    props.setProperty("direction", "down");
  }
}

function changeDirectionToRight() {
  const props = PropertiesService.getScriptProperties();
  if (props.getProperty("direction") !== "left") {
    props.setProperty("direction", "right");
  }
}

function changeDirectionToLeft() {
  const props = PropertiesService.getScriptProperties();
  if (props.getProperty("direction") !== "right") {
    props.setProperty("direction", "left");
  }
}

function changeDirectionToUp() {
  const props = PropertiesService.getScriptProperties();
  if (props.getProperty("direction") !== "down") {
    props.setProperty("direction", "up");
  }
}
