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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotesController = void 0;
const uuid_1 = require("uuid");
const notesModel_1 = require("../repositories/notesModel");
const notesService_1 = require("./notesService");
const mockedNotes_1 = __importDefault(require("../repositories/mockedNotes"));
class NotesController {
    constructor() {
        this.model = new notesModel_1.NotesModel();
        this.service = new notesService_1.NotesService(mockedNotes_1.default);
    }
    addNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { name, category, content, archived } = req.body;
            const uid = (0, uuid_1.v4)();
            const dateCreated = Date.now();
            archived = Boolean(archived);
            const note = { uid, name, category, dateCreated, content, archived };
            if (this.model.checkNewNote(note) === false) {
                res.status(404).json({});
                return;
            }
            const { status } = yield this.service.addNote(note);
            status === false ? res.status(404).json(note)
                : res.status(201).json(note);
        });
    }
    getNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const uid = req.params['id'];
            if (this.model.checkUid({ uid }) === false) {
                res.status(404).json({});
                return;
            }
            const { status, note } = yield this.service.getNote(uid);
            status === false ? res.status(404).json(note)
                : res.status(200).json(note);
        });
    }
    getAllNotes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { status, notes } = yield this.service.getAllNotes();
            status === false ? res.status(404).json([])
                : res.status(200).json(notes);
        });
    }
    getStats(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { status, stats } = yield this.service.getStats();
            status === false ? res.status(404).json({})
                : res.status(200).json(stats);
        });
    }
    updateNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const dateEdited = Date.now();
            const uid = req.params['id'];
            const note = Object.assign(Object.assign({ uid }, req.body), { dateEdited });
            note['dateCreated'] = Number(note.dateCreated);
            note['archived'] = Boolean(note.archived);
            if (this.model.checkUpdatingNote(note) === false) {
                console.log(`update fail`, note);
                res.status(404).json({});
                return;
            }
            const { status } = yield this.service.updateNote(note);
            status === false ? res.status(404).json({})
                : res.status(201).json(note);
        });
    }
    removeNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const uid = req.params['id'];
            if (this.model.checkUid({ uid }) === false) {
                res.status(404).json({});
                return;
            }
            const { status, note } = yield this.service.removeNote(uid);
            status === false ? res.status(404).json({})
                : res.status(200).json(note);
        });
    }
}
exports.NotesController = NotesController;
