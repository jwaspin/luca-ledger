import PropTypes from 'prop-types';

import TableRowCheckbox from '@c/input/TableRowCheckbox';

export const ColumnTypeEnum = Object.freeze({
  STRING: 'string',
  NUMBER: 'number',
  BOOLEAN: 'boolean',
  CHECKBOX: 'checkbox',
});

export default function SchemaDrivenComponent({
  row,
  column,
  actions,
  readOnly = true,
}) {
  if (readOnly) {
    switch (column.type) {
      case ColumnTypeEnum.STRING:
        return <div>{row[column.field]}</div>;
      case ColumnTypeEnum.NUMBER:
        return <div>{row[column.field]}</div>;
      case ColumnTypeEnum.BOOLEAN:
        return <div>{String(row[column.field])}</div>;
      case ColumnTypeEnum.CHECKBOX:
        return (
          <TableRowCheckbox
            row={row}
            toggleIsSelected={actions.toggleIsSelected}
          />
        );
      default:
        return <div>Unknown column type: {column.type}</div>;
    }
  }

  switch (column.type) {
    case ColumnTypeEnum.STRING:
      return (
        <input
          value={row[column.field]}
          onChange={(event) =>
            actions.updateField({
              id: row.id,
              field: column.field,
              value: event.target.value,
            })
          }
        />
      );
    case ColumnTypeEnum.NUMBER:
      return (
        <input
          type='number'
          value={row[column.field]}
          onChange={(event) =>
            actions.updateField({
              id: row.id,
              field: column.field,
              value: event.target.value,
            })
          }
        />
      );
    case ColumnTypeEnum.BOOLEAN:
      return (
        <input
          type='checkbox'
          checked={row[column.field]}
          onChange={(event) =>
            actions.updateField({
              id: row.id,
              field: column.field,
              value: event.target.checked,
            })
          }
        />
      );
    case ColumnTypeEnum.CHECKBOX:
      return (
        <TableRowCheckbox
          row={row}
          toggleIsSelected={actions.toggleIsSelected}
        />
      );
    default:
      return <div>Unknown column type: {column.type}</div>;
  }
}

SchemaDrivenComponent.propTypes = {
  row: PropTypes.object.isRequired,
  column: PropTypes.shape({
    field: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf(Object.values(ColumnTypeEnum)).isRequired,
  }).isRequired,
  actions: PropTypes.object.isRequired,
  readOnly: PropTypes.bool.isRequired,
};
