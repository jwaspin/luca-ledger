import schemas from './schemas';

export const generateCategory = (initialData = {}) => {
  const category = {
    id: '',
    name: '',
    subCategories: [],
    ...initialData,
  };
  schemas.primaryCategorySchema.validateSync(category);
  return category;
};
