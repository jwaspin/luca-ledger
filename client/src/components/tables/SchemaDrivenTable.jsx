import { Paper, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import DynamicColumnsTable from '@/components/tables/DynamicColumnsTable';
import { generateColumnsFromSchema } from '@/utils';

export default function SchemaDrivenTable({
  title,
  data,
  schema,
  validator,
  displayIsValid = false,
  readOnly = false,
}) {
  // actually, the todo is the edit mode
  console.log('ToDo: read only mode', readOnly);
  let columns = [];
  if (displayIsValid) {
    columns.push({
      field: 'isValid',
      title: 'Is Valid',
      component: ({ row }) => <div>{String(row['isValid'])}</div>,
    });
  }
  columns = columns.concat(generateColumnsFromSchema(schema));

  const dataWithIsValid = data.map((row) => ({
    ...row,
    isValid: validator(row),
  }));

  return (
    <Paper>
      <h3>{title}</h3>
      {dataWithIsValid.length > 0 ? (
        <DynamicColumnsTable
          columns={columns}
          data={dataWithIsValid}
        />
      ) : (
        <Typography variant='body1'>No {title} to display</Typography>
      )}
    </Paper>
  );
}

SchemaDrivenTable.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  schema: PropTypes.object.isRequired,
  validator: PropTypes.func.isRequired,
  displayIsValid: PropTypes.bool,
  readOnly: PropTypes.bool,
};
