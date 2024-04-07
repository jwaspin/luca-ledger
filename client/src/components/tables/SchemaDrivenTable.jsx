import { Paper, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import TableRowCheckbox from '@c/input/TableRowCheckbox';
import DynamicColumnsTable from '@c/tables/DynamicColumnsTable';
import { useSchemaConfig } from '@s/lucaSchema';
import { useListSlice } from '@s/schemaDrivenSlice';

export default function SchemaDrivenTable({
  schemaKey,
  displayIsValid = false,
  readOnly = true,
  listType,
}) {
  const { title, validator, columns } = useSchemaConfig(schemaKey);
  const { actions, selectors } = useListSlice(schemaKey);

  let data = selectors.selectList(listType);

  const dataWithIsValid = data.map((row) => ({
    ...row,
    isValid: validator(row),
  }));

  if (!readOnly) {
    columns.unshift({
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
  schemaKey: PropTypes.string.isRequired,
  displayIsValid: PropTypes.bool,
  readOnly: PropTypes.bool,
  listType: PropTypes.oneOf(['main', 'loaded']).isRequired,
};
