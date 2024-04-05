import { categorySchema, entitySchema, transactionSchema } from 'luca-schema';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import SchemaDrivenTable from '@/components/tables/SchemaDrivenTable';
import LoadButton from './components/LoadButton';
import { useDataLoader, useJsonFileReader } from './hooks';
import {
  validateEntity,
  validateTransaction,
  validateCategory,
} from '@/store/validators';
import {
  selectors as entitySelectors,
  actions as entityActions,
} from '@/store/entities';
import {
  selectors as transactionSelectors,
  actions as transactionActions,
} from '@/store/transactions';
import {
  selectors as categorySelectors,
  actions as categoryActions,
} from '@/store/categories';

export default function ImportPage() {
  const { readJsonFile, jsonData } = useJsonFileReader();
  const { loadData } = useDataLoader();
  const entities = useSelector(entitySelectors.selectLoadedEntities);
  const categories = useSelector(categorySelectors.selectLoadedCategories);
  const transactions = useSelector(
    transactionSelectors.selectLoadedTransactions
  );

  const handleFileLoad = (file) => {
    readJsonFile(file);
  };

  useEffect(() => {
    if (jsonData) {
      loadData(jsonData);
    }
  }, [jsonData, loadData]);

  return (
    <div>
      <LoadButton onFileLoad={handleFileLoad} />
      <SchemaDrivenTable
        title='Entities'
        data={entities}
        schema={entitySchema}
        validator={validateEntity}
        toggleSelection={entityActions.toggleEntitySelected}
        displayIsValid
      />
      <SchemaDrivenTable
        title='Transactions'
        data={transactions}
        schema={transactionSchema}
        validator={validateTransaction}
        toggleSelection={transactionActions.toggleTransactionSelected}
        displayIsValid
      />
      <SchemaDrivenTable
        title='Categories'
        data={categories}
        schema={categorySchema}
        validator={validateCategory}
        toggleSelection={categoryActions.toggleCategorySelected}
        displayIsValid
      />
    </div>
  );
}
