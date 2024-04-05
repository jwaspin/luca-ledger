import Ajv2020 from 'ajv/dist/2020';
import addFormats from 'ajv-formats';

import {
  lucaSchema,
  categorySchema,
  entitySchema,
  recurringTransactionSchema,
  recurringTransactionEventSchema,
  schemaSchema,
  transactionSchema,
} from 'luca-schema';

const ajv = new Ajv2020();
addFormats(ajv);

ajv.addSchema(categorySchema, 'category');
ajv.addSchema(entitySchema, 'entity');
ajv.addSchema(recurringTransactionSchema, 'recurringTransaction');
ajv.addSchema(recurringTransactionEventSchema, 'recurringTransactionEvent');
ajv.addSchema(schemaSchema, 'schema');
ajv.addSchema(transactionSchema, 'transaction');
ajv.addSchema(lucaSchema, 'luca-schema');

const validateCategory = ajv.compile(categorySchema);
const validateEntity = ajv.compile(entitySchema);
const validateRecurringTransaction = ajv.compile(recurringTransactionSchema);
const validateRecurringTransactionEvent = ajv.compile(
  recurringTransactionEventSchema
);
const validateSchema = ajv.compile(schemaSchema);
const validateTransaction = ajv.compile(transactionSchema);
const validateLucaSchema = ajv.compile(lucaSchema);

export {
  validateLucaSchema,
  validateCategory,
  validateEntity,
  validateRecurringTransaction,
  validateRecurringTransactionEvent,
  validateSchema,
  validateTransaction,
};
