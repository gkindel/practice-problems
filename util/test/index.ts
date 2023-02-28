
export const assert = (result: any, expected: any, msg?: string) => {
    const a = JSON.stringify(expected);
    const b = JSON.stringify(result);

    const info = msg !== undefined ? msg + ' ' : '';
    if (a == b) {
        console.log(`✅ ${info}`, a);
    } else {
        console.error(`❌ ${info}expected '${a}' got '${b}'`);
    }
};

export default assert;