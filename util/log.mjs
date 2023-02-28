const log = () => {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (!this.DEBUG)
        return;
    console.log.apply(console, args);
};

log.DEBUG = false;

export default log;