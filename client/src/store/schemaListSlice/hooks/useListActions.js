import useLoadedListActions from './useLoadedListActions';
import useMainListActions from './useMainListActions';

export default function useListActions(sliceActions) {
  const mainActions = useMainListActions(sliceActions);
  const loadedActions = useLoadedListActions(sliceActions);

  const actions = {
    ...mainActions,
    ...loadedActions,
  };
  return { actions };
}
