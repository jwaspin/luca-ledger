import { useCallback } from 'react';

import { SchemaKeys, slices } from '@s';
import { useListSlice } from '@s/schemaListSlice';
import { getVersion } from '../utils';

export default function useDataLoader() {
  const {
    // loading,
    // error,
    actions: entityActions,
  } = useListSlice(slices, SchemaKeys.ENTITIES);

  const loadData = useCallback(
    (jsonData) => {
      const version = getVersion(jsonData);
      switch (version) {
        case '1':
          console.log('Loading data version 1');
          break;
        case '2':
          entityActions.loadItems(jsonData.entities || []);
          break;
        default:
          console.error('Unsupported version:', version);
      }
    },
    [entityActions]
  );

  return { loadData };
}
