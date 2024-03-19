import { clamp, roundTo } from "./utilts";

function makeFrameHandler() {
    const _requestAnimationFrame = (...args: Parameters<typeof requestAnimationFrame>) => {
        let raf = requestAnimationFrame(...args);
        return () => cancelAnimationFrame(raf)
    }
    let running = false;
    let shouldStop = false;
    let startAt = 0
    let currentTime = 0;
    let stopAt = 0;
    let escapeTime = 0;
    let cachedFn: null | FrameRequestCallback = null
    let cancel: null | (() => void) = null;
    let afterFrame = false;

    let api = {
        isRunning: () => running,
        startAt: () => startAt,
        currentTime: () => currentTime,
        next: (...args: Parameters<typeof requestAnimationFrame>) => {
            return _requestAnimationFrame(...args)
        },
        restart: () => {
            if (cachedFn) {
                startAt = 0
                currentTime = 0;
                stopAt = 0;
                escapeTime = 0;
                api.effect(cachedFn)
            }
            // if (!running) api.resume()
        },
        resume: () => {
            if (cachedFn && !running) api.effect(cachedFn)
        },
        pause: () => {
            if (running) {
                running = false
                stopAt = currentTime
                if (afterFrame) {
                    shouldStop = true
                    cancel ? cancel() : null
                    shouldStop = false
                } else {
                    shouldStop = true
                }
            }
        },
        effect: (fn: FrameRequestCallback) => {
            cachedFn = fn;
            running = true;
            const loop: FrameRequestCallback = (now) => {
                afterFrame = false
                currentTime = now - startAt - escapeTime
                // console.log(roundTo(currentTime, 2), roundTo(escapeTime, 2), roundTo(stopAt, 2), roundTo(now, 2))
                fn(now);
                if (shouldStop) {
                    shouldStop = false
                } else {
                    if (cancel) cancel()
                    cancel = api.next(loop);
                    afterFrame = true
                }
            }
            requestAnimationFrame((now) => {
                if (startAt !== 0) escapeTime = now - (stopAt + startAt)
                if (startAt === 0) startAt = now;
                currentTime = now - startAt - escapeTime;
                loop(now)
            })
        },
        lazyexit: () => {
            stopAt = currentTime
            shouldStop = true;
            running = false
            startAt = 0
            currentTime = 0
            cachedFn = null
        },
        exit: () => {
            running = false
            stopAt = currentTime
            if (afterFrame) {
                shouldStop = true
                stopAt = startAt + currentTime;
                cancel ? cancel() : null
                shouldStop = false;
            } else {
                shouldStop = true
            }
            cachedFn = null;
            currentTime = 0;
            startAt = 0;
        }
    }
    return api;
}

export {
    makeFrameHandler
}