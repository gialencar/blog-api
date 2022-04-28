const pino = require('pino')({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      // levelFirst: true,
      translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
      ignore: 'pid,hostname',
    },
  },
});

module.exports = pino;
