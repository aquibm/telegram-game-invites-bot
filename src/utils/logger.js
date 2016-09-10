/* eslint-disable no-console */
class Logger {
    constructor() {
        this.loggingEnabled = true;
    }

    log(message) {
        return this.loggingEnabled && console.log(message);
    }
}

export default new Logger();
/* eslint-enable no-console */