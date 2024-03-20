const Ajv2020 = require("ajv/dist/2020");
const addFormats = require("ajv-formats");
const schema = require("../entity.json");
const exampleData = require("../examples/entities.json");

const ajv = new Ajv2020();
addFormats(ajv);
const validate = ajv.compile(schema);

test('examples are valid entities', () => {
    exampleData.forEach((example) => {
        const valid = validate(example);
        if (!valid) console.log(validate.errors);
        expect(valid).toBe(true);
    });
});
