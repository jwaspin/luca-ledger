import { Paper, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import TableRowCheckbox from '@c/input/TableRowCheckbox';
import DynamicColumnsTable from '@c/tables/DynamicColumnsTable';
import { generateColumnsFromSchema } from '@u';

export default function SchemaDrivenTable(props) {
  const {
    title,
    data,
    schema,
    validator,
    actions,
    displayIsValid = false,
    readOnly = false,
  } = props;

  let columns = [];

  if (!readOnly) {
    columns.push({
      field: 'isSelected',
      title: 'Selected',
      component: ({ row }) => (
        <TableRowCheckbox
          row={row}
          toggleIsSelected={actions.toggleIsSelected}
        />
      ),
    });
  }

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
  actions: PropTypes.object,
  displayIsValid: PropTypes.bool,
  readOnly: PropTypes.bool,
};
