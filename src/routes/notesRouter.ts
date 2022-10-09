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
       
        //Create(add) a new note
        this.app.post(`/${baseURI}`, this.notesController.addNote.bind(this.notesController))

        //Read all notes 
        this.app.get(`/${baseURI}`, this.notesController.getAllNotes.bind(this.notesController))

        //Calc notes stats
        this.app.get(`/${baseURI}/stats`, this.notesController.getStats.bind(this.notesController))

        //Read one note
        this.app.get(`/${baseURI}/:id`, this.notesController.getNote.bind(this.notesController))

        //Update selected note
        this.app.patch(`/${baseURI}/:id`, this.notesController.updateNote.bind(this.notesController))

        //Delete selected note
        this.app.delete(`/${baseURI}/:id`, this.notesController.removeNote.bind(this.notesController))
    }
}

export { NotesRouter }