import logger from '../utils/logger';

class Bot {
    constructor(telegramApi) {
        this.telegramApi = telegramApi;
    }

    registerSelf() {
        this.telegramApi.getMe().then((me) => {
            logger.log(`Connected to telegram as ${me.username}`);
        }).catch(() => {
            logger.log('Could not connect to telegram');
            process.exit(1);
        });
    }
}

export default Bot;