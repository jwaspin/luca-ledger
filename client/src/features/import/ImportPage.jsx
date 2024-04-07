import { useEffect } from 'react';

import SchemaDrivenTable from '@c/tables/SchemaDrivenTable';
import LoadButton from './components/LoadButton';
import { useDataLoader, useJsonFileReader } from './hooks';
import { SchemaKeys } from '@s';

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
      {Object.keys(SchemaKeys).map((key) => (
        <SchemaDrivenTable
          key={key}
          schemaKey={key}
        />
      ))}
    </div>
  );
}
