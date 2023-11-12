import { Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import CreateNewCategory from '@/components/CreateNewCategory';
import { actions, constants, selectors } from '@/store/categories';

export default function Categories() {
  const dispatch = useDispatch();
  const categories = useSelector(selectors.selectCategories);

  const loadDefaultCategories = () => {
    constants.CategoryInitialData.forEach((category) => {
      dispatch(actions.loadCategory(category));
    });
  };

  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
      }}
    >
      <Box>Categories</Box>
      <Button onClick={loadDefaultCategories}>Load Default Categories</Button>
      <CreateNewCategory />
      {categories.map((category) => (
        <Box
          key={category.id}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '5px',
            width: '250px',
            border: '1px solid black',
          }}
        >
          {category.name}
        </Box>
      ))}
    </Box>
  );
}
