"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const defaultRoute_1 = require("./defaultRoute");
const notesRouter_1 = require("./notesRouter");
const Routes = (app) => {
    const defaultRoute = new defaultRoute_1.defaultRouter(app).routes('/');
    const notesRoutes = new notesRouter_1.NotesRouter(app).routes('notes');
};
exports.Routes = Routes;
