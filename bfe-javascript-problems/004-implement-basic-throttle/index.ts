
//  https://bigfrontend.dev/problem/implement-basic-throttle

import assert from '../../util/test/index';

type throttleCallback = (...args: string[]) => void;
type throttledFn = (...args: string[]) => any;

const throttle = function (callbackFn: throttleCallback, delayMs: number): throttledFn {
    let nextInvocationEpoch = 0;
    let nextValue: any;
    let hasNextValue = false;
    let running: boolean;

    const startThrottle = () => {
        running = true;
        setTimeout(handleTimeout, delayMs)
    }

    const handleTimeout = () => {
        if (!hasNextValue) {
            return;
        }
        hasNextValue = false;
        running = false;
        startThrottle()
        callbackFn.call(null, nextValue);
    }

    return function (value: any): any {
        nextValue = value;
        hasNextValue = true;
        if (!running) {
            handleTimeout();
        }
    }
}

const test = (input: string[], expected: string[], throttleSec = 3) => {
    let startTime = performance.now();
    const calls: string[] = [];
    let testTimeMS = 1000;

    const time_dialation = 100;

    const recordCallback = (id: string): void => {
        let currentTime = Math.floor((performance.now() - startTime) / time_dialation);
        // console.log(".. callback! ", { id, currentTime }, calls);
        calls.push(`${id}@${currentTime}`)
    }

    const throttled = throttle(recordCallback, throttleSec * time_dialation)
    input.forEach((call) => {
        const [arg, time] = call.split('@')
        const timeMs = parseFloat(time) * time_dialation;
        // console.log("queueing ", { arg, timeMs })
        testTimeMS += timeMs;
        setTimeout(() => throttled(arg), timeMs);
    });

    const adjustedTestTime = Math.max(testTimeMS, input.length * (throttleSec * time_dialation));
    // console.log("waiting", { adjustedTestTime, testTimeMS })
    setTimeout(() => {
        // console.log("done", { adjustedTestTime, testTimeMS })
        assert(calls, expected);
    }, adjustedTestTime);
};

test(['A@0'], ['A@0'], 3);
test(['A@0', 'B@1'], ['A@0', 'B@3'], 3);
test(['A@0', 'B@1', 'C@2'], ['A@0', 'C@3'], 3);
test(['A@0', 'B@1', 'C@2', 'D@3'], ['A@0', 'D@3']);
test(['A@0', 'B@5', 'C@9', 'D@17'], ['A@0', 'C@10', 'D@20'], 10);
