document.querySelector("#toggleLogTimestamps").addEventListener("click", toggleLogTimestamps);

function toggleLogTimestamps() {
  const logs = document.querySelector("#logs");
  if (logs.classList.contains("showLogTimestamp")) {
    logs.classList.remove("showLogTimestamp");
  } else {
    logs.classList.add("showLogTimestamp");
  }
}

document.querySelector("#copyLogs").addEventListener("click", copyLogs);

async function copyLogs() {
  const logs = document.querySelector("#logs");
  const text = logs.innerText;
  if (!navigator.clipboard) {
    fallbackCopying(text);
    return;
  }

  navigator.clipboard.writeText(text);
}

function fallbackCopying(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;

  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  document.execCommand("copy");
  document.body.removeChild(textArea);
}

document.querySelector("#toggleFullscreen").addEventListener("click", toggleFullscreen);

function toggleFullscreen() {
  const appContainer = document.querySelector("#app");
  if (!appContainer) return;

  const isInFullScreen = document.fullscreenElement;

  if (isInFullScreen) {
    document.exitFullscreen();
  } else {
    appContainer.requestFullscreen();
  }
}

let repeatCommandsIntervalObject = null;
let repeatCommandsQueue = [];
let repeatMode = "single";
let repeatInterval = 1;

function commandsButtonCapture(event) {
  event.stopPropagation();
  const target = event.target;
  const buttonCommand = target.command;
  if (repeatMode === "single") {
    document.querySelectorAll("#commands button").forEach((button) => (button.dataset.enabled = "false"));

    if (repeatCommandsQueue.includes(buttonCommand)) {
      target.dataset.enabled = "false";
      repeatCommandsQueue = [];
    } else {
      target.dataset.enabled = "true";
      repeatCommandsQueue = [buttonCommand];
    }
  } else if (repeatMode === "multiple") {
    if (repeatCommandsQueue.includes(buttonCommand)) {
      target.dataset.enabled = "false";
      repeatCommandsQueue = repeatCommandsQueue.filter((command) => command !== buttonCommand);
    } else {
      target.dataset.enabled = "true";
      repeatCommandsQueue.push(buttonCommand);
    }
  }
}

function startCommandRepeat() {
  if (repeatCommandsIntervalObject) {
    clearInterval(repeatCommandsIntervalObject);
  }

  repeatCommandsIntervalObject = setInterval(async () => {
    for (const command of repeatCommandsQueue) {
      await command();
    }
  }, repeatInterval * 1000);
}

document.querySelector("#repeatCommandSingle").addEventListener("click", repeatCommandSingle);

function repeatCommandSingle(event) {
  const button = event.currentTarget;

  if (button.dataset.enabled === "false") {
    // Repeat State: OFF -> SINGLE_ON
    button.dataset.enabled = "true";
    repeatMode = "single";
    document.querySelectorAll(".repeatInterval")[0].hidden = false;

    document.querySelector("#commands").addEventListener("click", commandsButtonCapture, { capture: true });

    startCommandRepeat();
  } else {
    // Repeat State: SINGLE_ON -> MULTIPLE_ON
    button.hidden = true;
    const repeatCommandsButton = document.querySelector("#repeatCommands");
    repeatCommandsButton.hidden = false;
    repeatCommandsButton.dataset.enabled = "true";
    repeatMode = "multiple";
    repeatCommandsButton.focus();
  }
}

document.querySelector("#repeatCommands").addEventListener("click", repeatCommands);

function repeatCommands(event) {
  const button = event.currentTarget;

  if (button.dataset.enabled === "false") {
    // Repeat State: INVALID
    button.dataset.enabled = "true";
  } else {
    // Repeat State: MULTIPLE_ON -> OFF
    repeatCommandsQueue = [];
    document.querySelector("#commands").removeEventListener("click", commandsButtonCapture, { capture: true });
    clearInterval(repeatCommandsIntervalObject);

    button.hidden = true;
    const repeatCommandSingleButton = document.querySelector("#repeatCommandSingle");
    repeatCommandSingleButton.dataset.enabled = "false";
    repeatCommandSingleButton.hidden = false;
    repeatCommandSingleButton.focus();
    document.querySelectorAll("#commands button").forEach((button) => (button.dataset.enabled = "false"));
  }
}

const allChangeIntervalButtons = document.querySelectorAll(".repeatInterval");

allChangeIntervalButtons.forEach((button) => button.addEventListener("click", changeRepeatInterval));

function changeRepeatInterval(event) {
  const button = event.currentTarget;

  let currentInterval = button.dataset.interval;

  const allIntervals = Array.from(allChangeIntervalButtons).map((button) => button.dataset.interval);

  const currentButtonIndex = allIntervals.findIndex((interval) => interval === currentInterval);
  const nextButtonIndex = currentButtonIndex === allIntervals.length - 1 ? 0 : currentButtonIndex + 1;

  allChangeIntervalButtons.forEach((button, index) => {
    if (index === nextButtonIndex) {
      button.hidden = false;
    } else {
      button.hidden = true;
    }
  });

  currentInterval = allChangeIntervalButtons[nextButtonIndex].dataset.interval;

  const currentIntervalValue = parseInt(currentInterval) * (currentInterval.includes("m") ? 60 : 1);

  repeatInterval = currentIntervalValue;

  startCommandRepeat();
}
