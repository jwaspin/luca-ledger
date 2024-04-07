import { useCallback } from 'react';

import { slices } from '@s';
import { useSchemaConfig } from '@s/lucaSchema';
import { useListSlice } from '@s/schemaDrivenSlice';
import { getVersion } from '../utils';

export default function useDataLoader() {
  const { SchemaKeys } = useSchemaConfig();
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
