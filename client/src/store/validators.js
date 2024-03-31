import Ajv2020 from 'ajv/dist/2020';
import addFormats from 'ajv-formats';
import axios from 'axios';

import {
  lucaSchema,
  categorySchema,
  entitySchema,
  recurringTransactionSchema,
  recurringTransactionEventSchema,
  schemaSchema,
  transactionSchema,
} from 'luca-schema';

async function loadSchema(uri) {
  try {
    const response = await axios.get(uri);
    return response.data;
  } catch (error) {
    console.error(`Could not load schema from ${uri}:`, error);
  }
}

const ajv = new Ajv2020({ loadSchema });
addFormats(ajv);

const validateLucaSchema = ajv.compile(lucaSchema);
const validateCategory = ajv.compile(categorySchema);
const validateEntity = ajv.compile(entitySchema);
const validateRecurringTransaction = ajv.compile(recurringTransactionSchema);
const validateRecurringTransactionEvent = ajv.compile(
  recurringTransactionEventSchema
);
const validateSchema = ajv.compile(schemaSchema);
const validateTransaction = ajv.compile(transactionSchema);

export {
  validateLucaSchema,
  validateCategory,
  validateEntity,
  validateRecurringTransaction,
  validateRecurringTransactionEvent,
  validateSchema,
  validateTransaction,
};
