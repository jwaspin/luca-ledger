const categorySchema = require('./src/schemas/category.json');
const entitySchema = require('./src/schemas/entity.json');
const recurringTransactionSchema = require('./src/schemas/recurringTransaction.json');
const recurringTransactionEventSchema = require('./src/schemas/recurringTransactionEvent.json');
const schemaSchema = require('./src/schemas/schema.json');
const transactionSchema = require('./src/schemas/transaction.json');
const lucaSchema = require('./src/luca-schema.json');

module.exports = {
  lucaSchema,
  categorySchema,
  entitySchema,
  recurringTransactionSchema,
  recurringTransactionEventSchema,
  schemaSchema,
  transactionSchema,
};
