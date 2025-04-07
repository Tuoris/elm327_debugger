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
