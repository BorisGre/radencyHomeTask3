import * as yup from 'yup';

const noteUidSchema = yup.object({

        uid: yup.string().required(),
      });

const noteSchemaObj = yup.object({

        uid: yup.string().length(36).required(),
        name: yup.string().required(),
        category: yup.string().required(),
        dateCreated: yup.number().positive().integer().default(() => Date.now()).required(),
        content: yup.string().required(),
        archived: yup.boolean().required(),
      });

const noteUpdatingSchemaObj = yup.object().shape({

        uid: yup.string().length(36).required(),
        name: yup.string().required(),
        category: yup.string().required(),
        dateCreated: yup.number().positive().integer().default(() => Date.now()).required(),
        dateEdited: yup.number().positive().integer().default(() => Date.now()).required(),
        content: yup.string().required(),
        archived: yup.boolean().required(),
      });      

export { noteUidSchema, noteSchemaObj, noteUpdatingSchemaObj }