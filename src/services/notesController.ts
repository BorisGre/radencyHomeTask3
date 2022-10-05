import { Request, Response } from "express";
import { v4 } from "uuid"
import { noteIface, noteIfaceUpdating, uidIface } from "../helpers/interfaces";
import { NotesModel } from "../repositories/notesModel";
import { NotesService } from "./notesService";

class NotesController{
    
    model: NotesModel;
    service: NotesService; 

    constructor(mockedNotes: noteIface[]){
        
        this.model = new NotesModel()
        this.service = new NotesService(mockedNotes)
    }

    addNote(req: Request, res: Response){

        let note: noteIface  = req.body['note']
            note['uid'] = v4()
            note['dateCreated'] = Date.now()

        if(this.model.checkNewNote(note) === false){
    
            res.sendStatus(404).json({})
            return 
        }
        
        const { status } = this.service.addNote(note)

        status === false ? res.sendStatus(404).json(note)
                         : res.sendStatus(201).json(note)
    }

    getNote(req: Request, res: Response){

        const { uid }: uidIface  = req.body['uid']
        
        if(this.model.checkUid({uid}) === false){

            res.sendStatus(404).json({})
            return 
        }

        const { status, note }  = this.service.getNote(uid)

        status === false ? res.sendStatus(404).json(note)
                         : res.sendStatus(201).json(note)
    }

    getAllNotes(req: Request, res: Response){

        const { status, notes } = this.service.getAllNotes()

        status === false ? res.sendStatus(404).json([])
                         : res.sendStatus(200).json(notes)  
    }

    getStats(req: Request, res: Response){

        const { status, stats } = this.service.getStats()

        status === false ? res.sendStatus(404).json([])
                         : res.sendStatus(200).json(stats)  
    }

    updateNote(req: Request, res: Response){

        const  note:noteIfaceUpdating = req.body['note']
               note['dateEdited'] = Date.now()

        if(this.model.checkUpdatingNote(note) === false){
    
            res.sendStatus(404).json({})
            return 
        }

        const { status } = this.service.updateNote(note)

        status === false ? res.sendStatus(404).json({})
                         : res.sendStatus(201).json(note)  
    }

    removeNote(req: Request, res: Response){

        const { uid }: uidIface = req.body
        
        if(this.model.checkUid({uid}) === false){

            res.sendStatus(404).json({})
            return 
        }

        const { status, note } = this.service.removeNote({uid})

        status === false ? res.sendStatus(404).json({})
                         : res.sendStatus(200).json(note)  
    }
}

export { NotesController }