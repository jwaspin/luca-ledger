import { SchemaKeys, schemas, validators } from './lucaSchemaConfig';
import { generateColumnsFromSchema } from '@u';

export const useSchemaConfig = (schemaKey) => {
  if (!Object.values(SchemaKeys).includes(schemaKey)) {
    throw new Error(`Invalid schemaKey: ${schemaKey}`);
  }

  const schema = schemas[schemaKey];
  const validator = validators[schemaKey];

  const columns = generateColumnsFromSchema(schema);

  return {
    title: schema.title,
    schema,
    validator,
    columns,
  };
};
