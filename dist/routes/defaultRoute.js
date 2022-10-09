"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultRouter = void 0;
class defaultRouter {
    constructor(app) {
        this.app = app;
        this.baseURI = '/';
    }
    routes(baseURI) {
        this.app.get(`${this.baseURI}`, (req, res) => {
            res.send('Notes API root URI');
        });
    }
}
exports.defaultRouter = defaultRouter;
