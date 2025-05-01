import { BACKWARD_STEP } from "./const.ts";

export class Game {
  private isPlaying = false;
  private currentProgress = 0;

  constructor(
    private readonly config: {
      onPlay: (loop: () => void) => void;
      onStop: () => void;
      onCurrentProgressUpdate: (currentProgress: number) => void;
    },
  ) {}

  private updateCurrentProgress() {
    this.config.onCurrentProgressUpdate(this.currentProgress);
  }

  private stop() {
    this.isPlaying = false;
    this.config.onStop();
  }

  private loop() {
    if (this.currentProgress > 0) {
      if (this.currentProgress < BACKWARD_STEP) {
        this.currentProgress = 0;
      } else {
        this.currentProgress -= BACKWARD_STEP;
      }
    }

    this.updateCurrentProgress();
  }

  play() {
    this.isPlaying = true;
    this.config.onPlay(this.loop.bind(this));
  }

  onActionTriggered(step: number) {
    if (!this.isPlaying) {
      return;
    }

    if (this.currentProgress + step >= 100) {
      this.stop();
      this.currentProgress = 100;
    } else {
      this.currentProgress += step;
    }

    this.updateCurrentProgress();
  }
}
