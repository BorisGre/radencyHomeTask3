import { Application } from "express"
import { defaultRouter } from "./defaultRoute"
import { NotesRouter } from "./notesRouter"

const Routes = (app: Application)=> {

    const defaultRoute = new defaultRouter(app).routes('/')
    const notesRoutes =    new NotesRouter(app).routes('notes')
}

export { Routes }