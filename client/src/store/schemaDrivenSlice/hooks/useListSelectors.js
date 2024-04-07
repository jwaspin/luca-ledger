import useMainListSelectors from './useMainListSelectors';
import useLoadedListSelectors from './useLoadedListSelectors';

export default function useListSelectors(
  mainListSelectors,
  loadedListSelectors
) {
  const { selectors: mainSelectors } = useMainListSelectors(mainListSelectors);
  const { selectors: loadedSelectors } =
    useLoadedListSelectors(loadedListSelectors);

  const selectList = (listType) => {
    if (listType === 'main') {
      return mainSelectors.selectAllItems();
    } else if (listType === 'loaded') {
      return loadedSelectors.selectLoadedItems();
    }
  };

  const selectors = {
    ...mainSelectors,
    ...loadedSelectors,
    selectList,
  };

  return { selectors };
}
