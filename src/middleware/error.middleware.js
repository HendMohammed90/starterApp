"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// class HttpException extends Error {
//   status: number
//   message: string
//   constructor(status: number, message: string) {
//     super(message)
//     this.status = status
//     this.message = message
//   }
// }
const errorMiddleware = (error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || 'Whoops!! something went wrong';
    res.status(status).json({ status, message });
};
exports.default = errorMiddleware;
