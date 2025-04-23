import { pino } from 'pino';
import pretty from 'pino-pretty';
// import { config } from 'src/config/config';

const stream = pretty({
    colorize: true,
    translateTime: true,
});

const fileTransport = pino.destination({
    // dest: config.log.filename,
    mkdir: true,
});

const transport = pino.multistream([
    // { stream: stream, level: config.log.levelPrint },
    // { stream: fileTransport, level: config.log.levelFile },
]);

const logger = pino({ level: 'info' }, transport);

export default logger;
