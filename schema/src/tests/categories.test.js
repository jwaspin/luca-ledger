const exampleData = require("../examples/categories.json");
const { validators } = require("../validators");

const { validateCategory } = validators;

test('examples are valid categories', () => {
    exampleData.forEach((example) => {
        const valid = validateCategory(example);
        if (!valid) console.log(validateCategory.errors);
        expect(valid).toBe(true);
    });
});
