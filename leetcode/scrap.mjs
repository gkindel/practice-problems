try {
    arrowAction();
} catch (ex) {
    console.log('great! no unexpected function calls');
}

// Awful, hoisting.
// troubleFunction();

export const arrowAction = () => console.log('life is good');
export const troubleFunction = function () { console.log('i think you ignored this') };

troubleFunction = () => console.log('wtf!');
troubleFunction();

try {
    arrowAction = () => console.log('yay consts');
} catch (ex) {
    console.log('bug prevented!');
}