interface uidIface {
    uid: String
}

interface noteIface extends uidIface{

    name: String,
    category: String,
    dateCreated: Number,
    dateEdited?: Number,
    content: String,
    archived: Boolean
}

interface noteIfaceUpdating extends noteIface {

    dateEdited: Number,
}

interface categoryNotesMap {

    "category": String,  
    "active": Number,
    "archived": Number
}

export { uidIface, noteIface, noteIfaceUpdating, categoryNotesMap }