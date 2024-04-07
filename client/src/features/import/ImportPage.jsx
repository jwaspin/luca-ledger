import { Fragment, useEffect } from 'react';

import SchemaDrivenTable from '@c/tables/SchemaDrivenTable';
import { useSchemaConfig } from '@s/lucaSchema';
import { ListTypeEnum } from '@s/schemaDrivenSlice';
import LoadButton from './components/LoadButton';
import { useDataLoader, useJsonFileReader } from './hooks';

export default function ImportPage() {
  const { readJsonFile, jsonData } = useJsonFileReader();
  const { loadData } = useDataLoader();
  const { SchemaKeys } = useSchemaConfig();

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
        <Fragment key={key}>
          <SchemaDrivenTable
            schemaKey={key}
            listType={ListTypeEnum.LOADED}
            readOnly={false}
            displayIsValid={true}
          />
        </Fragment>
      ))}
    </div>
  );
}
