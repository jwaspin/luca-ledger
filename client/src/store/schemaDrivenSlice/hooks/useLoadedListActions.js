import { useDispatch } from 'react-redux';

export default function useLoadedListActions(sliceActions) {
  const dispatch = useDispatch();

  const loadItems = (items) => dispatch(sliceActions.addLoadedItems(items));
  const toggleIsSelected = (id) =>
    dispatch(
      sliceActions.updateLoadedItem({
        id,
        changes: { isSelected: (item) => !item.isSelected },
      })
    );

  const actions = {
    loadItems,
    toggleIsSelected,
  };
  return { actions };
}
