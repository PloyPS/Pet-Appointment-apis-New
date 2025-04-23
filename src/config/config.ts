import * as dotenv from 'dotenv';

const envFile = process.argv[2] || process.env.NODE_ENV || '.env';

dotenv.config({ path: envFile });

export const config = {
    app: {
        domain: process.env.SERVER_DOMAIN || 'http://localhost:3000',
        port: Number(process.env.SERVER_PORT) || 3000,
    },
    db: {
        connectionLimit: Number(process.env.MYSQL_CONNECTION_LIMIT) || 10,
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || 'convergence',
        database: process.env.MYSQL_DATABASE || 'pet-appoinment',
    },
    jwt: {
        secretKey: process.env.JWT_KEY || 'convergence',
        expiresIn: process.env.JWT_EXPIRES_IN || '12h',
    },
    cor: {
        originAllows: (process.env.CORS_ORIGIN || 'http://localhost:3000').split(','),
    },
    log: {
        filename: process.env.LOG_FILENAME || 'logs/app.log',
        levelPrint: process.env.LOG_PRINT || 'info',
        levelFile: process.env.LOG_FILE || 'error',
    },
    upload: {
        maxSize: 1024 * 1024 * 6,
        path: {
            avatar: 'uploads/avatar',
            banner: 'uploads/banner',
            product: 'uploads/product',
            attachment: 'uploads/attachment',
        },
    },
    cache: {
        maxAge: 86400,
    },
};
