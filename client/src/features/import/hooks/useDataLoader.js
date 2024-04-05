import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { getVersion } from '../utils';
import { actions as entityActions } from '@/store/entities';
import { actions as transactionActions } from '@/store/transactions';
import { actions as categoryActions } from '@/store/categories';

export default function useDataLoader() {
  const dipatch = useDispatch();

  const loadData = useCallback(
    (jsonData) => {
      const version = getVersion(jsonData);
      switch (version) {
        case '1':
          console.log('Loading data version 1');
          break;
        case '2':
          dipatch(entityActions.loadEntities(jsonData.entities || []));
          dipatch(categoryActions.loadCategories(jsonData.categories || []));
          dipatch(
            transactionActions.loadTransactions(jsonData.transactions || [])
          );
          break;
        default:
          console.error('Unsupported version:', version);
      }
    },
    [dipatch]
  );

  return { loadData };
}
