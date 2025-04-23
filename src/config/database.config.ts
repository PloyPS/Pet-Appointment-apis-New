export default () => ({
    mysql: {
        host: process.env.MYSQL_HOST || 'localhost',
        port: Number(process.env.MYSQL_PORT) || 3306,
        database: process.env.MYSQL_DATABASE || 'pet-appoinment',
        username: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || 'convergence',
        synchronize: /true/i.test(process.env.MYSQL_SYNCHRONIZE) || false,
        logging: /true/i.test(process.env.MYSQL_LOGGING),
    },
});
