import useMainListSelectors from './useMainListSelectors';
import useLoadedListSelectors from './useLoadedListSelectors';

export default function useListSelectors(
  mainListSelectors,
  loadedListSelectors
) {
  const { selectors: mainSelectors } = useMainListSelectors(mainListSelectors);
  const { selectors: loadedSelectors } =
    useLoadedListSelectors(loadedListSelectors);

  const selectors = {
    ...mainSelectors,
    ...loadedSelectors,
  };

  return { selectors };
}
