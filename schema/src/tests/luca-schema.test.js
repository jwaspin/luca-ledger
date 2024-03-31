const Ajv2020 = require("ajv/dist/2020");
const addFormats = require("ajv-formats");
const axios = require("axios");

const schema = require("../luca-schema.json");
const exampleData = require("../examples/luca-schema.json");

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

test('full luca schema object is valid', async () => {
  const validate = await ajv.compileAsync(schema);
  const valid = validate(exampleData);
  if (!valid) console.log(validate.errors);
  expect(valid).toBe(true);
});
