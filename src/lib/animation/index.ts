import { makeFrameHandler } from "./core";

type Option = {
    immediate?: boolean;
};
export * from "./utilts"
  
export const createRafEffect = (fn: FrameRequestCallback, options: Option = {}) => {
  let running = false;
  const isRunning = () => running;
  const setIsRunning = (value:boolean) => running = value;

  const frame = makeFrameHandler();

  const cb = () => {
    fn(frame.currentTime());
  };

  if (options?.immediate) {
    frame.effect(cb);
    setIsRunning(true);
  }

  const start = () => {
    if (!isRunning()) {
      frame.effect(cb);
      setIsRunning(true);
    }
  };
  const resume = () => {
    if (!isRunning()) {
      frame.resume();
      setIsRunning(true);
    }
  };
  const pause = () => {
    if (isRunning()) {
      frame.pause();
      setIsRunning(false);
    }
  };
  const restart = () => {
    frame.restart();
    setIsRunning(true);
  };
  return { isRunning, start, pause, resume, restart };
};