import Ajv2020 from 'ajv/dist/2020';
import addFormats from 'ajv-formats';
import { schemas } from './schemas';

const ajv = new Ajv2020({ allErrors: true });
addFormats(ajv);

Object.entries(schemas).forEach(([key, schema]) => {
  ajv.addSchema(schema, key);
});

export const validators = Object.fromEntries(
  Object.entries(schemas).map(([key, schema]) => [key, ajv.compile(schema)])
);
