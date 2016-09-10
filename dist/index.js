'use strict';

var _nodeTelegramBotApi = require('node-telegram-bot-api');

var _nodeTelegramBotApi2 = _interopRequireDefault(_nodeTelegramBotApi);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _bot = require('./bot/bot');

var _bot2 = _interopRequireDefault(_bot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var telegramApi = new _nodeTelegramBotApi2.default(_config2.default.telegramToken, {
    polling: true
});

var bot = new _bot2.default(telegramApi);
bot.registerSelf();