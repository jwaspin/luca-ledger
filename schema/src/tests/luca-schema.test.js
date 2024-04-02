const exampleData = require("../examples/luca-schema.json");
const { validators } = require("../validators");

const { validateLucaSchema } = validators;

test('full luca schema object is valid', () => {
    const valid = validateLucaSchema(exampleData);
    if (!valid) console.log(validateLucaSchema.errors);
    expect(valid).toBe(true);
});

// async function loadSchema(uri) {
//   try {
//     const response = await axios.get(uri);
//     return response.data;
//   } catch (error) {
//     console.error(`Could not load schema from ${uri}:`, error);
//   }
// }

// const ajv = new Ajv2020({ loadSchema });
// addFormats(ajv);

// test('full luca schema object is valid', async () => {
//   const validate = await ajv.compileAsync(schema);
//   const valid = validate(exampleData);
//   if (!valid) console.log(validate.errors);
//   expect(valid).toBe(true);
// });
