import { Application } from "express";
import { noteIface } from "../helpers/interfaces";
import { NotesController } from "../services/notesController";

class NotesRouter {

    app: Application
    notesController:NotesController
    constructor(app:Application, mockedNotes: noteIface[]){

        this.app = app
        this.notesController = new NotesController(mockedNotes)
    }

    router(){

        //Create(add) a new note
        this.app.post("/notes", this.notesController.addNote)

        //Read all notes 
        this.app.get("/notes", this.notesController.getAllNotes)

        //Read one note
        this.app.get("/notes/:id", this.notesController.getNote)

        //Read note stats
        this.app.get("/notes/stats", this.notesController.getStats)

        //Update selected note
        this.app.patch("/notes/:id", this.notesController.updateNote)

        //Delete selected note
        this.app.delete("/notes/:id", this.notesController.removeNote)
    }
}

export { NotesRouter }