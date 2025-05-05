import "./style.css";
import { LAYOUT } from "./lib/layout.ts";
import { Game } from "./lib/game.ts";
import { CLICK_STEP, CLICK_STEP_AFTER_50, DOLLAR_STEP } from "./lib/const.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = LAYOUT;

let mainLoopInterval: ReturnType<typeof setInterval> | undefined;
let captionLoopInterval: ReturnType<typeof setInterval> | undefined;

const girlEl = document.getElementById("girl")!;
const progressEl = document.getElementById("progress")!;
const congratsEl = document.getElementById("congrats")!;
const captionEl = document.getElementById("caption")!;

const game = new Game({
  onPlay: (loop, captionLoop) => {
    mainLoopInterval = setInterval(loop, 100);
    captionLoopInterval = setInterval(captionLoop, 4000);
  },
  onStop: () => {
    if (mainLoopInterval) {
      clearInterval(mainLoopInterval);
    }
    if (captionLoopInterval) {
      clearInterval(captionLoopInterval);
    }
    
    congratsEl.style.opacity = "1";
    captionEl.style.display = "none";
  },
  onCurrentProgressUpdate: (currentProgress: number) => {
    girlEl.style.left = `${currentProgress}%`;
    progressEl.innerText = `${currentProgress.toFixed(1)}%`;
  },
  onWin: () => {
    congratsEl.style.opacity = "1";
  },
  onReset: () => {},
  onCaptionUpdate: (caption) => {
    if (caption) {
      captionEl.innerText = caption;
    } else {
      captionEl.style.display = "none";
    }
  },
});

window.addEventListener("click", () => {
  game.onActionTriggered(game.progress < 60 ? CLICK_STEP : CLICK_STEP_AFTER_50);
});

window.addEventListener("keyup", (e: KeyboardEvent) => {
  if (e.key === "$") {
    game.onActionTriggered(DOLLAR_STEP);
  } if (e.key === " ") {
    game.onActionTriggered(game.progress < 60 ? CLICK_STEP : CLICK_STEP_AFTER_50);
  }
});

document.documentElement.requestFullscreen().then().catch(console.error);
game.play();
