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

export { NotesModel };

/*

// check validity
schema
  .isValid({
    name: 'jimmy',
    age: 24,
  })
  .then(function (valid) {
    valid; // => true
  });

// you can try and type cast objects to the defined schema
schema.cast({
  name: 'jimmy',
  age: '24',
  createdOn: '2014-09-23T19:25:25Z',
});
// => { name: 'jimmy', age: 24, createdOn: Date }
The exported functions are factory methods for constructing schema instances, but without the new keyword. If you need access to the actual schema classes, they are also exported:

import {
  BooleanSchema,
  DateSchema,
  MixedSchema,
  NumberSchema,
  ArraySchema,
  ObjectSchema,
  StringSchema,
} from 'yup';
If you're looking for an easily serializable DSL for yup schema, check out yup-ast

Using a custom locale dictionary
Allows you to customize the default messages used by Yup, when no message is provided with a validation test. If any message is missing in the custom dictionary the error message will default to Yup's one.

import { setLocale } from 'yup';

setLocale({
  mixed: {
    default: 'Não é válido',
  },
  number: {
    min: 'Deve ser maior que ${min}',
  },
});

// now use Yup schemas AFTER you defined your custom dictionary
let schema = yup.object().shape({
  name: yup.string(),
  age: yup.number().min(18),
});

schema.validate({ name: 'jimmy', age: 11 }).catch(function (err) {
  err.name; // => 'ValidationError'
  err.errors; // => ['Deve ser maior que 18']
});
If you need multi-language support, Yup has got you covered. The function setLocale accepts functions that can be used to generate error objects with translation keys and values. Just get this output and feed it into your favorite i18n library.

import { setLocale } from 'yup';

setLocale({
  // use constant translation keys for messages without values
  mixed: {
    default: 'field_invalid',
  },
  // use functions to generate an error object that includes the value from the schema
  number: {
    min: ({ min }) => ({ key: 'field_too_short', values: { min } }),
    max: ({ max }) => ({ key: 'field_too_big', values: { max } }),
  },
});

// now use Yup schemas AFTER you defined your custom dictionary
let schema = yup.object().shape({
  name: yup.string(),
  age: yup.number().min(18),
});

schema.validate({ name: 'jimmy', age: 11 }).catch(function (err) {
  err.name; // => 'ValidationError'
  err.errors; // => [{ key: 'field_too_short', values: { min: 18 } }]
});*/

       // return true
