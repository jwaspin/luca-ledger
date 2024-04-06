// import { categorySchema, entitySchema, transactionSchema } from 'luca-schema';
import { useEffect } from 'react';
// import { useSelector } from 'react-redux';

// import SchemaDrivenTable from '@c/tables/SchemaDrivenTable';
import LoadButton from './components/LoadButton';
import { useDataLoader, useJsonFileReader } from './hooks';
// import {
//   validateEntity,
//   validateTransaction,
//   validateCategory,
// } from '@/store/validators';

export default function ImportPage() {
  const { readJsonFile, jsonData } = useJsonFileReader();
  const { loadData } = useDataLoader();

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
      <div>todo: tables</div>
    </div>
  );
}
