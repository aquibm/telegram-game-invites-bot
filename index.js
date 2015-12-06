var telegram = require('telegram-bot-api');
var _ = require('lodash');
var fs = require('fs');

(function() {
    var Game = function() {
        this.process = function(message) {
            if(!resolveCommand(message.text, '/game')|| message.chat.id !== settings.targetChatId) {
                return;
            }

            var sender = resolveSender(message);

            if(settings.timedOut) {
                api.sendMessage({
                    chat_id: sender.id,
                    text: 'A game invite was recently sent out, please wait before sending out another.'
                });

                return;
            }

            if(sender.muted) {
                api.sendMessage({
                    chat_id: sender.id,
                    text: 'You cannot send out game invites while muted.'
                });

                return;
            }

            _.each(users, function(user) {
                if(user.id !== sender.id && !user.muted) {
                    api.sendMessage({
                        chat_id: user.id,
                        text: sender.name + ' has sent out a game invite.'
                    });
                }
            });

            timeout(60);
        }
    };

    var Start = function() {
        this.process = function(message) {
        	if(!resolveCommand(message.text, '/start') && !resolveCommand(message.text, '/unmute')) {
        		return;
        	}

            var sender = resolveSender(message);

            if(sender.muted) {
                sender.muted = false;
                saveUsers();
            }
        }
    };

    var Mute = function() {
        this.process = function(message) {
            if(!resolveCommand(message.text, '/mute')) {
                return;
            }

            var sender = resolveSender(message);

            if(!sender.muted) {
                sender.muted = true;
                saveUsers();
            }
        }
    };

    var keys = require('./keys.json');

    var api = new telegram({
        token: keys.token,
        updates: {
            enabled: true
        }
    });

    var settings = {
        targetChatId: keys.gameInvitesChat,
        usersFile: './users.json',
        commands: [
            new Game(),
            new Start(),
            new Mute()
        ],
        timeoutDuration: 300,
        timedOut: false,
        botName: keys.botName
    };

    var users = require(settings.usersFile);

    function registerUser(userDto) {
        var found = _.find(users, function(user) {
            return user.id === userDto.id;
        });

        if(_.isUndefined(found)) {
            users.push({
                id: userDto.id,
                name: userDto.first_name,
                muted: false
            });

            saveUsers();
        }
    }

    function saveUsers() {
        fs.writeFile(settings.usersFile, JSON.stringify(users), function(error) {
            if(error) {
                console.log('Errored');
            }
        });
    }

    function timeout(seconds) {
        settings.timedOut = true;

        setTimeout(function() {
            settings.timedOut = false;
        }, seconds * 1000);
    }

    function resolveSender(message) {
        return _.find(users, function(user) {
            return message.from.id === user.id;
        });
    }

    function resolveCommand(command, expected) {
    	return command === expected || command === expected + '@' + settings.botName;
    }

    api.on('message', function(message) {
        registerUser(message.from);

        _.each(settings.commands, function(cmd) {
            cmd.process(message);
        });
    });
}());