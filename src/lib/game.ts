import { BACKWARD_STEP, BASE_CAPTION, CAPTIONS } from "./const.ts";

export class Game {
  private isPlaying = false;
  private currentProgress = 0;
  private currentCaptionIdx = 0;
  private currentCaption: string | undefined = undefined;

  constructor(
    private readonly config: {
      onPlay: (loop: () => void, captionLoop: () => void) => void;
      onWin: () => void;
      onReset: () => void;
      onCaptionUpdate: (text: string | undefined) => void;
      onStop: () => void;
      onCurrentProgressUpdate: (currentProgress: number) => void;
    },
  ) {
    this.currentCaptionIdx = 0;
    this.updateCaption(BASE_CAPTION);
  }

  private publishCurrentProject() {
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
      this.updateCaption(CAPTIONS[this.currentCaptionIdx]);
    } else {
      this.currentCaptionIdx = 0;
      this.updateCaption(BASE_CAPTION);
    }

    this.publishCurrentProject();
  }

  private captionLoop() {
    if (this.currentProgress >= 0) {
      this.currentCaption = BASE_CAPTION;
      return;
    }

    this.updateCaption(CAPTIONS[this.currentCaptionIdx]);

    this.currentCaptionIdx =
      this.currentCaptionIdx >= CAPTIONS.length - 1
        ? 0
        : this.currentCaptionIdx + 1;
  }

  private triggerWin() {
    this.stop();
    this.config.onWin();
  }

  private updateCaption(newCaption: string | undefined) {
    if (newCaption === this.currentCaption) {
      return;
    }

    this.currentCaption = newCaption;
    this.config.onCaptionUpdate(newCaption);
  }

  play() {
    this.isPlaying = true;
    this.config.onPlay(this.loop.bind(this), this.captionLoop.bind(this));
  }

  onActionTriggered(step: number) {
    if (!this.isPlaying) {
      return;
    }

    if (this.currentProgress + step >= 100) {
      this.triggerWin();
      this.currentProgress = 100;
    } else {
      this.currentProgress += step;
    }

    this.publishCurrentProject();
  }
}
