"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotesRouter = void 0;
const notesController_1 = require("../services/notesController");
class NotesRouter {
    constructor(app) {
        this.app = app;
        this.notesController = new notesController_1.NotesController();
    }
    routes(baseURI) {
        const ctx = this.notesController;
        //Create(add) a new note
        this.app.post(`/${baseURI}`, ctx.addNote.bind(ctx));
        //Read all notes 
        this.app.get(`/${baseURI}`, ctx.getAllNotes.bind(ctx));
        //Calc notes stats
        this.app.get(`/${baseURI}/stats`, ctx.getStats.bind(ctx));
        //Read one note
        this.app.get(`/${baseURI}/:id`, ctx.getNote.bind(ctx));
        //Update selected note
        this.app.patch(`/${baseURI}/:id`, ctx.updateNote.bind(ctx));
        //Delete selected note
        this.app.delete(`/${baseURI}/:id`, ctx.removeNote.bind(ctx));
    }
}
exports.NotesRouter = NotesRouter;
