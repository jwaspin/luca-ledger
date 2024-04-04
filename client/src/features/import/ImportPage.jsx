import { categorySchema, entitySchema, transactionSchema } from 'luca-schema';
import { useEffect } from 'react';

import SchemaDrivenTable from '@/components/tables/SchemaDrivenTable';
import ImportButton from './components/ImportButton';
import LoadButton from './components/LoadButton';
import { useDataLoader, useJsonFileReader } from './hooks';
import {
  validateEntity,
  validateTransaction,
  validateCategory,
} from '@/store/validators';

export default function ImportPage() {
  const { readJsonFile, jsonData } = useJsonFileReader();
  const {
    entities,
    transactions,
    categories,
    selectedRows,
    loadData,
    // handleRowSelection,
  } = useDataLoader();

  const handleFileLoad = (file) => {
    readJsonFile(file);
  };

  const handleImport = () => {
    console.log('ToDo: Import data');
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
      />
      <SchemaDrivenTable
        title='Transactions'
        data={transactions}
        schema={transactionSchema}
        validator={validateTransaction}
      />
      <SchemaDrivenTable
        title='Categories'
        data={categories}
        schema={categorySchema}
        validator={validateCategory}
      />
      <ImportButton
        onClick={handleImport}
        disabled={Object.values(selectedRows).every((arr) => arr.length === 0)}
      />
    </div>
  );
}
