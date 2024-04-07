import { Fragment, useEffect } from 'react';
import { values } from 'lodash';

import SchemaDrivenTable from '@c/tables/SchemaDrivenTable';
import { SchemaKeys } from '@s/lucaSchema';
import { ListTypeEnum } from '@s/schemaDrivenSlice';
import LoadButton from './components/LoadButton';
import { useJsonFileReader } from './hooks';

export default function ImportPage() {
  const { readJsonFile, jsonData } = useJsonFileReader();

  const handleFileLoad = (file) => {
    readJsonFile(file);
  };

  useEffect(() => {
    if (jsonData) {
      console.log(jsonData);
    }
  }, [jsonData]);

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
