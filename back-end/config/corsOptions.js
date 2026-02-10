
const whitelist = [
    'http://localhost:3000',
    'http://localhost:3001',
];
if (process.env.FRONTEND_URL && !whitelist.includes(process.env.FRONTEND_URL)) {
    whitelist.push(process.env.FRONTEND_URL);
}
if (process.env.CORS_ORIGIN && !whitelist.includes(process.env.CORS_ORIGIN)) {
    whitelist.push(process.env.CORS_ORIGIN);
}

const corsOptions = {
    origin: (origin, callback) => {
        // Uncomment for debugging:
        // console.log('CORS check:', origin);
        if (!origin || whitelist.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // allow cookies, authorization headers, etc.
    optionsSuccessStatus: 200
};

module.exports = corsOptions;
