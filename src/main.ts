import './style.css'
import {LAYOUT} from "./lib/layout.ts";
import {Game} from "./lib/game.ts";
import {CLICK_STEP, DOLLAR_STEP} from "./lib/const.ts";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = LAYOUT

let interval: ReturnType<typeof setInterval> | undefined;

const girlEl = document.getElementById("girl")!;
const progressEl = document.getElementById("progress")!;

const game = new Game({
  onPlay: (loop) => {
    interval = setInterval(loop, 100);
  },
  onStop: () => {
    if (interval) {
      clearInterval(interval)
    }
  },
  onCurrentProgressUpdate: (currentProgress: number) => {
    girlEl.style.left = `${currentProgress}%`;
    progressEl.innerText = `${currentProgress.toFixed(1)}%`
  }
});

window.addEventListener("click", () => {
  game.onActionTriggered(CLICK_STEP)
})

window.addEventListener("keyup", (e: KeyboardEvent) => {
  if (e.key === "$") {
    game.onActionTriggered(DOLLAR_STEP)
  }
});


game.play();


