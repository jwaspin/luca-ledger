const Ajv2020 = require("ajv/dist/2020");
const addFormats = require("ajv-formats");
const schema = require("../luca-schema.json");
const exampleData = require("../examples/luca-schema.json");

const ajv = new Ajv2020();
addFormats(ajv);
const validate = ajv.compile(schema);

test('full luca schema object is valid', () => {
  const valid = validate(exampleData);
  if (!valid) console.log(validate.errors);
  expect(valid).toBe(true);
});
