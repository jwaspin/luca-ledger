import { useCallback, useState } from 'react';

import { getVersion } from '../utils';

export default function useDataLoader() {
  const [entities, setEntities] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedRows, setSelectedRows] = useState({
    entities: [],
    transactions: [],
    categories: [],
  });

  const handleRowSelection = (type, selected) => {
    setSelectedRows((prev) => ({ ...prev, [type]: selected }));
  };

  const loadData = useCallback((jsonData) => {
    const version = getVersion(jsonData);
    switch (version) {
      case '1':
        console.log('Loading data version 1');
        break;
      case '2':
        setEntities(jsonData.entities || []);
        setTransactions(jsonData.transactions || []);
        setCategories(jsonData.categories || []);
        break;
      default:
        console.error('Unsupported version:', version);
    }
  }, []);

  return {
    entities,
    transactions,
    categories,
    selectedRows,
    loadData,
    handleRowSelection,
  };
}
