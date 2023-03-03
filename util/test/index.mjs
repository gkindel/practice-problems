
export const assert = (result, expected, msg) => {
    const a = JSON.stringify(expected);
    const b = JSON.stringify(result);

    if (a === b) {
        console.log(`✅ ${msg}`, a);
    } else {
        console.error(`❌ ${msg} expected ${a} got ${b}`);
    }
};

export default assert;
