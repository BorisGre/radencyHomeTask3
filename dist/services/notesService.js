"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotesService = void 0;
class NotesService {
    constructor(mockedNotes) {
        this.notes = mockedNotes;
    }
    addNote(note) {
        return __awaiter(this, void 0, void 0, function* () {
            let status = false;
            this.notes.push(note);
            status = true;
            return { status, note };
        });
    }
    getAllNotes() {
        return __awaiter(this, void 0, void 0, function* () {
            let status = true;
            return { status, notes: this.notes };
        });
    }
    getNote(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            let status = false;
            let note = {};
            this.notes.forEach((n) => {
                if (n.uid === uid) {
                    note = n;
                    status = true;
                }
            });
            return { status, note };
        });
    }
    getStats() {
        return __awaiter(this, void 0, void 0, function* () {
            let status = false;
            const usedNotesCategories = [];
            this.notes.forEach(note => usedNotesCategories.includes(note.category)
                ? ""
                : usedNotesCategories.push(note.category));
            const notesMapArray = usedNotesCategories.map(cat => ({ "category": cat,
                "active": this.notes.filter(note => (note.category == cat && !note.archived)).length,
                "archived": this.notes.filter(note => (note.category == cat && note.archived)).length,
            }));
            status = notesMapArray.length > 0 ? true : status;
            return { status, stats: notesMapArray };
        });
    }
    updateNote(updatingNote) {
        return __awaiter(this, void 0, void 0, function* () {
            let status = false;
            this.notes.forEach((note, index) => {
                if (note.uid === updatingNote.uid) {
                    this.notes[index] = updatingNote;
                    status = true;
                }
            });
            return { status, note: updatingNote };
        });
    }
    removeNote(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            let status = false;
            let note = {};
            const noteArr = this.notes.filter(n => n.uid === uid);
            if (noteArr.length === 1) {
                this.notes = this.notes.filter(n => n.uid !== uid);
                note = noteArr[0];
                status = true;
            }
            return { status, note };
        });
    }
}
exports.NotesService = NotesService;
