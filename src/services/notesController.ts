import { Request, Response } from "express";
import { v4 } from "uuid"
import { noteAddIface, noteIface, noteIfaceUpdating, uidIface } from "../helpers/interfaces";
import { NotesModel } from "../repositories/notesModel";
import { NotesService } from "./notesService";
import mockedNotes from "../repositories/mockedNotes";

class NotesController{
    
    model: NotesModel;
    service: NotesService; 

    constructor(){
        
        this.model = new NotesModel()
        this.service = new NotesService(mockedNotes)
    }

    async addNote(req: Request, res: Response){

        let { name, category, content, archived }: noteAddIface  = req.body

            const uid = v4()
            const dateCreated = Date.now()
            archived = Boolean(archived)

        const note: noteIface = {uid, name, category, dateCreated, content, archived}

        if(this.model.checkNewNote(note) === false){
    
            res.status(404).json({})
            return 
        }
        
        const { status } = await this.service.addNote(note)

        status === false ? res.status(404).json(note)
                         : res.status(201).json(note)
    }

    async getNote(req: Request, res: Response){

        const uid: uidIface['uid'] = req.params['id']

        if(this.model.checkUid({uid}) === false){

            res.status(404).json({})
            return 
        }

        const { status, note }  = await this.service.getNote(uid)

        status === false ? res.status(404).json(note)
                         : res.status(200).json(note)
    }

    async getAllNotes(req: Request, res: Response){

        const { status, notes } = await this.service.getAllNotes()

        status === false ? res.status(404).json([])
                         : res.status(200).json(notes)  
    }

    async getStats(req: Request, res: Response){

        const { status, stats } = await this.service.getStats()

        status === false ? res.status(404).json({})
                         : res.status(200).json(stats)  
    }

    async updateNote(req: Request, res: Response){

        const dateEdited = Date.now()
        const uid: uidIface['uid'] = req.params['id']
        const note:noteIfaceUpdating = {uid, ...req.body, dateEdited}
              note['dateCreated'] = Number(note.dateCreated)  
              note['archived'] = Boolean(note.archived)

        if(this.model.checkUpdatingNote(note) === false){
            console.log(`update fail`, note)
            res.status(404).json({})
            return 
        }

        const { status } = await this.service.updateNote(note)

        status === false ? res.status(404).json({})
                         : res.status(201).json(note)  
    }

    async removeNote(req: Request, res: Response){

        const uid: uidIface['uid']  = req.params['id']     
        
        if(this.model.checkUid({uid}) === false){

            res.status(404).json({})
            return 
        }

        const { status, note } = await this.service.removeNote(uid)

        status === false ? res.status(404).json({})
                         : res.status(200).json(note)  
    }
}

export { NotesController }