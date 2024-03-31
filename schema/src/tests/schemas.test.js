const Ajv2020 = require("ajv/dist/2020");
const addFormats = require("ajv-formats");
const schema = require("../schemas/schema.json");
const exampleData = require("../examples/schemas.json");

const ajv = new Ajv2020();
addFormats(ajv);
const validate = ajv.compile(schema);

test('examples are valid schema objects', () => {
    exampleData.forEach((example) => {
        const valid = validate(example);
        if (!valid) console.log(validate.errors);
        expect(valid).toBe(true);
    });
});
