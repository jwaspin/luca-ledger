import Ajv from 'ajv';
import addFormats from 'ajv-formats';

import categorySchema from '../../../schemas/v2.0/category.json';
import entitySchema from '../../../schemas/v2.0/entity.json';
import repeatedTransactionSchema from '../../../schemas/v2.0/recurringTransaction.json';
import repeatedTransactionOccurrenceSchema from '../../../schemas/v2.0/recurringTransactionEvent.json';
import transactionSchema from '../../../schemas/v2.0/transaction.json';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const validateCategory = ajv.compile(categorySchema);
const validateEntity = ajv.compile(entitySchema);
const validateRepeatedTransaction = ajv.compile(repeatedTransactionSchema);
const validateRepeatedTransactionOccurrence = ajv.compile(
  repeatedTransactionOccurrenceSchema
);
const validateTransaction = ajv.compile(transactionSchema);

export {
  validateCategory,
  validateEntity,
  validateRepeatedTransaction,
  validateRepeatedTransactionOccurrence,
  validateTransaction,
};
