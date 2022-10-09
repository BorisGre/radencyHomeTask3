import { Application } from "express";
import { NotesController } from "../services/notesController";

class NotesRouter {

    app: Application
    notesController:NotesController
    constructor(app: Application){
        
        this.app = app
        this.notesController = new NotesController()
    }

    routes(baseURI: String){
         
        const ctx: NotesController = this.notesController

        //Create(add) a new note
        this.app.post(`/${baseURI}`, ctx.addNote.bind(ctx))

        //Read all notes 
        this.app.get(`/${baseURI}`, ctx.getAllNotes.bind(ctx))

        //Calc notes stats
        this.app.get(`/${baseURI}/stats`, ctx.getStats.bind(ctx))

        //Read one note
        this.app.get(`/${baseURI}/:id`, ctx.getNote.bind(ctx))

        //Update selected note
        this.app.patch(`/${baseURI}/:id`, ctx.updateNote.bind(ctx))

        //Delete selected note
        this.app.delete(`/${baseURI}/:id`, ctx.removeNote.bind(ctx))
    }
}

export { NotesRouter }