

export default function (curry) {
    const join = (a, b, c) => {
        return `${a}_${b}_${c}`
    }

    const assert = (msg, expected, result) => {
        if (result === expected) {
            console.log(`✅ ${msg}`, result);
        } else {
            console.error(`❌ ${msg}`, result);
        }
    };

    const foo = {
        marker: '_',
        join: function (a, b, c) {
            const marker = this?.marker || '.';
            return `${a}${marker}${b}${marker}${c}`
        }
    }

    const curriedJoin = curry(join);

    var ret;
    const expected = '1_2_3';

    assert("single initial case", expected, curriedJoin(1, 2, 3));

    assert("two initial case", expected, curriedJoin(1, 2)(3));

    assert("three deep", expected, curriedJoin(1)(2)(3));

    assert("empty initial", expected, curriedJoin()(1, 2, 3));

    assert("very chainable silly", expected, curriedJoin()()()()()(1, 2, 3));

    assert("gracefully ignores extra", expected, curriedJoin(1, 2)(3, 4));

    foo.curriedJoin = curry(foo.join);
    assert("object support", expected, foo.curriedJoin(1)(2)(3));
};