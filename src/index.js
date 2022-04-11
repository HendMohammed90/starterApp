"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
const config_1 = __importDefault(require("./config"));
const PORT = config_1.default.port || 3000;
// create an instance server
const app = (0, express_1.default)();
// HTTP request logger middleware
app.use((0, morgan_1.default)('dev'));
// HTTP security middleware headers
app.use((0, helmet_1.default)());
// Basic rate-limiting middleware for Express
// Apply the rate limiting middleware to all requests
app.use((0, express_rate_limit_1.default)({
    windowMs: 60 * 60 * 1000,
    max: 2,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'el3b b3ed ya ro7 mama Too Many Requests From That IP Try Again Ba3d Saa3a 😂',
}));
// Add routing for main Path
app.get('/', (req, res) => {
    // throw new Error('There is an error here')
    res.json({
        message: 'Hello World 🌍',
    });
});
// error handler middleware
app.use(error_middleware_1.default);
app.use((_, res) => {
    res.status(404).json({
        message: 'Ohh you are lost, read the API documentation to find your way back home 😂',
    });
});
// start express server
app.listen(PORT, () => {
    console.log(`Server is starting at prot:${PORT}`);
});
exports.default = app;
// "dev": "nodemon src/index.ts",
// "build": "tsc",
// "start": "npm run build && node dist/index.js",
// "format": "prettier --write src/**/*.ts",
// "test": "npm run build && jasmine",
// "lint": "eslint src/**/*.ts",
// "lint:fix": "eslint --fix"
// mohammedelzanaty <mohammedelzanaty129@gmail.com>
// https://github.com/mohammedelzanaty/express-api-typescript-jasmine.git
// express-api-typescript-jasmine
// starterApp/src
