"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotesModel = void 0;
const schema_1 = require("./schemas/schema");
class NotesModel {
    checkNewNote(note) {
        return schema_1.noteSchemaObj.isValidSync(note);
    }
    checkUpdatingNote(noteUpdating) {
        return schema_1.noteUpdatingSchemaObj.isValidSync(noteUpdating);
    }
    checkUid(uid) {
        return schema_1.noteUidSchema.isValidSync(uid);
    }
}
exports.NotesModel = NotesModel;
;
