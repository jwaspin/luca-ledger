import addFormats from 'ajv-formats';
import Ajv2020 from 'ajv/dist/2020';

import {
  categorySchema,
  entitySchema,
  lucaSchema,
  recurringTransactionEventSchema,
  recurringTransactionSchema,
  schemaSchema,
  transactionSchema,
} from 'luca-schema';

const SchemaKeys = Object.freeze({
  CATEGORY: 'category',
  ENTITY: 'entity',
  LUCASCHEMA: 'lucaSchema',
  RECURRINGTRANSACTION: 'recurringTransaction',
  RECURRINGTRANSACTIONEVENT: 'recurringTransactionEvent',
  SCHEMA: 'schema',
  TRANSACTION: 'transaction',
});

const schemas = {
  [SchemaKeys.CATEGORY]: categorySchema,
  [SchemaKeys.ENTITY]: entitySchema,
  [SchemaKeys.LUCASCHEMA]: lucaSchema,
  [SchemaKeys.RECURRINGTRANSACTION]: recurringTransactionSchema,
  [SchemaKeys.RECURRINGTRANSACTIONEVENT]: recurringTransactionEventSchema,
  [SchemaKeys.SCHEMA]: schemaSchema,
  [SchemaKeys.TRANSACTION]: transactionSchema,
};

const ajv = new Ajv2020({ allErrors: true });
addFormats(ajv);

Object.entries(schemas).forEach(([key, schema]) => {
  ajv.addSchema(schema, key);
});

const validators = Object.fromEntries(
  Object.entries(schemas).map(([key, schema]) => [key, ajv.compile(schema)])
);

export { SchemaKeys, schemas, validators };
