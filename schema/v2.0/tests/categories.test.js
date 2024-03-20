import Ajv from "ajv/dist/2019";
import addFormats from "ajv-formats";

import categorySchema from "../category.json";
import exampleCategories from "../examples/categories.json";

const ajv = new Ajv({ allErrors: true });
addFormats(ajv); 
const validate = ajv.compile(categorySchema);

test('examples are valid categories', () => {
  exampleCategories.forEach((example) => {
    const valid = validate(example);
    expect(valid).toBe(true);
    if (!valid) console.log(validate.errors);
  });
});
