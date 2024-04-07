import { values } from 'lodash';
import { Fragment, useEffect } from 'react';

import SchemaDrivenTable from '@c/tables/SchemaDrivenTable';
import { SchemaKeys } from '@s/lucaSchema';
import { ListTypeEnum } from '@s/schemaDrivenSlice';
import LoadButton from './components/LoadButton';
import { useJsonFileReader, useLoader } from './hooks';

export default function ImportPage() {
  const { readJsonFile, jsonData } = useJsonFileReader();
  const { loadJsonData } = useLoader();

  const handleFileLoad = (file) => {
    readJsonFile(file);
  };

  useEffect(() => {
    if (jsonData) {
      loadJsonData(jsonData);
    }
  }, [jsonData, loadJsonData]);

  return (
    <div>
      <LoadButton onFileLoad={handleFileLoad} />
      {values(SchemaKeys).map((key) => (
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
