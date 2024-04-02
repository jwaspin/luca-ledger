const exampleData = require("../examples/recurringTransactions.json");
const { validators } = require("../validators");

const { validateRecurringTransaction } = validators;

test('examples are valid recurringTransactions', () => {
    exampleData.forEach((example) => {
        const valid = validateRecurringTransaction(example);
        if (!valid) console.log(validateRecurringTransaction.errors);
        expect(valid).toBe(true);
    });
});
