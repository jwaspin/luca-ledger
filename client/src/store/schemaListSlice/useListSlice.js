import { useDispatch, useSelector } from 'react-redux';

import { slices } from '@/store';

export default function useListSlice(sliceName) {
  const dispatch = useDispatch();
  const {
    sliceActions,
    sliceSelector,
    mainListSelectors,
    loadedListSelectors,
  } = slices[sliceName];
  const { loading, error } = useSelector(sliceSelector);

  const selectAllItems = useSelector(mainListSelectors.selectAll);
  const selectItemById = useSelector(mainListSelectors.selectById);
  const selectItemsById = useSelector(mainListSelectors.selectIds);

  const selectLoadedItems = useSelector(loadedListSelectors.selectAll);

  const selectors = {
    selectAllItems,
    selectItemById,
    selectItemsById,
    selectLoadedItems,
  };

  const addItem = (item) => dispatch(sliceActions.addMainItem(item));
  const loadItems = (items) => dispatch(sliceActions.addLoadedItems(items));

  const actions = {
    addItem,
    loadItems,
  };

  return {
    loading,
    error,
    actions,
    selectors,
  };
}
