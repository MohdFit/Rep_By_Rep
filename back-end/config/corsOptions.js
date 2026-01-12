const whitelist = [
    process.env.FRONTEND_URL, // e.g., http://localhost:3000
    'https://www.yoursite.com',
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
