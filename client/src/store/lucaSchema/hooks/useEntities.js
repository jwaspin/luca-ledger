import { slices } from '@s';
import { SchemaKeys } from '@s/lucaSchema';
import { useListSlice } from '@s/schemaDrivenSlice';

export default function useEntities() {
  const { actions, selectors } = useListSlice(slices, SchemaKeys.ENTITY);
  const entities = selectors.selectItems;
  const loadedEntities = selectors.selectLoadedItems;

  const loadEntities = (entities) => {
    actions.loadItems(entities);
  };

  return { entities, loadedEntities, loadEntities };
}
