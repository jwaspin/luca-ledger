import useLoadedListActions from './useLoadedListActions';
import useMainListActions from './useMainListActions';

export default function useListActions(sliceActions) {
  const { actions: mainActions } = useMainListActions(sliceActions);
  const { actions: loadedActions } = useLoadedListActions(sliceActions);

  const actions = {
    ...mainActions,
    ...loadedActions,
  };

  return { actions };
}
