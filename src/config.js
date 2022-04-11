"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { PORT, POSTGRES_HOST, POSTGRES_DB, POSTGRES_TEST_DB, POSTGRES_USER, ENV, BCRYPT_PASSWORD, SALT_ROUNDS, } = process.env;
exports.default = {
    port: PORT,
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    testDatabase: POSTGRES_TEST_DB,
    user: POSTGRES_USER,
    env: ENV,
    pass: BCRYPT_PASSWORD,
    salt: SALT_ROUNDS
};
