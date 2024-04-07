import { generateColumnsFromSchema } from './generateColumnsFromSchema';
import { SchemaKeys, schemas, validators } from './lucaSchemaConfig';
import constants from './lucaSchemaConstants';

export const useSchemaConfig = (schemaKey) => {
  if (!Object.values(SchemaKeys).includes(schemaKey)) {
    throw new Error(`Invalid schemaKey: ${schemaKey}`);
  }

  const schema = schemas[schemaKey];
  const validator = validators[schemaKey];
  const columns = generateColumnsFromSchema(schema);

  return {
    title: schema.title,
    description: schema.description,
    SchemaKeys,
    constants,
    schema,
    validator,
    columns,
  };
};
