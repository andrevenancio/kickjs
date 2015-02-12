var clc = require('cli-color');

module.exports = {

    __info: {
        symbol: ' ',
        color: clc.cyan
    },

    __success: {
        symbol: '✓',
        color: clc.green
    },

    __fail: {
        symbol: '✗',
        color: clc.red
    },

    __log: function(type, args) {
        console.log(type.color(type.symbol), this.__info.color.apply(this, args));
    },

    clear: function() {
        return console.log(clc.reset);
    },

    info: function() {
        return this.__log(this.__info, arguments);
    },

    help: function(command, description) {
        console.log(' ', this.__info.color(command), description);
    },

    success: function() {
        return this.__log(this.__success, arguments);
    },

    fail: function() {
        return this.__log(this.__fail, arguments);
    }
};