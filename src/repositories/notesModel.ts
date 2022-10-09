import { noteIface, noteIfaceUpdating, uidIface } from "../helpers/interfaces"
import { noteUidSchema, noteSchemaObj, noteUpdatingSchemaObj } from "./schemas/schema";

class NotesModel{

    checkNewNote(note: noteIface){
  
      return noteSchemaObj.isValidSync(note)
    }

    checkUpdatingNote(noteUpdating: noteIfaceUpdating){

      return noteUpdatingSchemaObj.isValidSync(noteUpdating)
    }
   
    checkUid(uid: uidIface){

       return noteUidSchema.isValidSync(uid)
    }
};

export { NotesModel }