const whitelist = [
    'http://localhost:3000',
    'http://localhost:3001',
    process.env.FRONTEND_URL,
];

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // allow cookies, authorization headers, etc.
    optionsSuccessStatus: 200
};

module.exports = corsOptions;
