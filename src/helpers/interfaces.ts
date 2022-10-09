interface uidIface {
    uid: String
}

interface noteAddIface {
    name: String,
    category: String, 
    content: String,
    archived: Boolean
}

interface noteIface extends uidIface {
    name: String,
    category: String,
    dateCreated?: Number,
    dateEdited?: Number,
    content: String,
    archived: Boolean
}

interface noteIfaceUpdating extends noteIface {
    dateCreated: Number,
    dateEdited: Number,
}

interface categoryNotesMap {

    "category": String,  
    "active": Number,
    "archived": Number
}

export { uidIface, noteAddIface, noteIface, noteIfaceUpdating, categoryNotesMap }