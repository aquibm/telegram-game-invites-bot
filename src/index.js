import TelegramBot from 'node-telegram-bot-api';
import config from './config';
import Bot from './bot/bot';

const telegramApi = new TelegramBot(config.telegramToken, {
    polling: true,
});

const bot = new Bot(telegramApi);
bot.registerSelf();