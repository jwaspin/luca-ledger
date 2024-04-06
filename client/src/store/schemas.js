import {
  categorySchema,
  entitySchema,
  lucaSchema,
  recurringTransactionEventSchema,
  recurringTransactionSchema,
  schemaSchema,
  transactionSchema,
} from 'luca-schema';

export const schemas = {
  category: categorySchema,
  entity: entitySchema,
  lucaSchema: lucaSchema,
  recurringTransactionEvent: recurringTransactionEventSchema,
  recurringTransaction: recurringTransactionSchema,
  schema: schemaSchema,
  transaction: transactionSchema,
};
