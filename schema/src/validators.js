const Ajv2020 = require("ajv/dist/2020");
const addFormats = require("ajv-formats");
const fs = require("fs");
const path = require("path");

const ajv = new Ajv2020();
addFormats(ajv);

const schemasDir = path.join(__dirname, 'schemas');
const validators = {}; 
const schemas = {};

fs.readdirSync(schemasDir).forEach(file => {
  if (path.extname(file) === '.json') {
    const schemaName = path.basename(file, '.json');
    const schema = require(path.join(schemasDir, file));
    ajv.addSchema(schema);
    schemas[schemaName] = schema;
  }
});

Object.keys(schemas).forEach(schemaName => {
  const validatorName = `validate${schemaName.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')}`;
  validators[validatorName] = ajv.compile(schemas[schemaName]);
});

module.exports = { validators, schemas };
