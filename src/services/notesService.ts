import { categoryNotesMap, noteIface, noteIfaceUpdating, uidIface } from "../helpers/interfaces";

class NotesService {

    notes: noteIface[]
    constructor(mockedNotes: noteIface[]){

        this.notes = mockedNotes
    }
 
    async addNote(note: noteIface){
      
        let status: Boolean = false 
        
        this.notes.push(note)

        status = true  
         
        return { status, note }
    }
    
    async getAllNotes(){

        let status: Boolean = true
         
        return { status, notes: this.notes }
    }

    async getNote(uid: uidIface['uid']){

        let status: Boolean = false 
        let note: noteIface|Object = {}
        
        this.notes.forEach((n:noteIface) => {
        
               if(n.uid === uid){
                 
                   note = n
                   status = true
               }
        })
         
        return { status, note }
    }

    async getStats(){

        let status: Boolean = false

        const usedNotesCategories:String[] = [];

        this.notes.forEach(note => usedNotesCategories.includes(note.category) 
                                 ? "" 
                                 : usedNotesCategories.push(note.category))
    
        const notesMapArray:categoryNotesMap[] = usedNotesCategories.map(cat => ( 
            { "category": cat,
              "active": this.notes.filter(note => (note.category == cat && !note.archived)).length,
              "archived": this.notes.filter(note => (note.category == cat && note.archived)).length,
            }))

        status = notesMapArray.length > 0 ? true: status    

        return { status, stats: notesMapArray }    
    }

    async updateNote(updatingNote: noteIfaceUpdating){

        let status: Boolean = false 
    
            this.notes.forEach((note, index) => {

                if(note.uid === updatingNote.uid){

                    this.notes[index] = updatingNote
                    status = true 
                }
            })
         
        return { status, note: updatingNote }
    }

    async removeNote(uid: uidIface['uid']){
        
        let status: Boolean = false 
        let note: noteIface|Object = {}
        
        const noteArr: noteIface[] = this.notes.filter(n => n.uid === uid)

        if(noteArr.length === 1){

            this.notes = this.notes.filter(n => n.uid !== uid)
            note = noteArr[0]
            status = true 
        } 
         
        return { status, note }
    }
}

export { NotesService }