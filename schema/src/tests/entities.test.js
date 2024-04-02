const exampleData = require("../examples/entities.json");
const { validators } = require("../validators");

const { validateEntity } = validators;

test('examples are valid entities', () => {
    exampleData.forEach((example) => {
        const valid = validateEntity(example);
        if (!valid) console.log(validateEntity.errors);
        expect(valid).toBe(true);
    });
});
