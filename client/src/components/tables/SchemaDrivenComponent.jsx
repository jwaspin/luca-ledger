import PropTypes from 'prop-types';
import { values } from 'lodash';

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
  // check column.type to see if it's an array, if it is, grab the first element that's not "null"
  const columnType = Array.isArray(column.type)
    ? column.type.find((type) => type !== 'null')
    : column.type;

  const StringComponent = <div>{row[column.field]}</div>;
  const NumberComponent = <div>{row[column.field]}</div>;
  const BooleanComponent = <div>{String(row[column.field])}</div>;
  const CheckboxComponent = (
    <TableRowCheckbox
      row={row}
      toggleIsSelected={actions.toggleIsSelected}
    />
  );

  if (readOnly) {
    switch (columnType) {
      case ColumnTypeEnum.STRING:
        return StringComponent;
      case ColumnTypeEnum.NUMBER:
        return NumberComponent;
      case ColumnTypeEnum.BOOLEAN:
        return BooleanComponent;
      case ColumnTypeEnum.CHECKBOX:
        return CheckboxComponent;
      default:
        return <div>Unknown column type: {columnType}</div>;
    }
  }

  switch (columnType) {
    case ColumnTypeEnum.STRING:
      return StringComponent;
    case ColumnTypeEnum.NUMBER:
      return NumberComponent;
    case ColumnTypeEnum.BOOLEAN:
      return BooleanComponent;
    case ColumnTypeEnum.CHECKBOX:
      return CheckboxComponent;
    default:
      return <div>Unknown column type: {columnType}</div>;
  }
}

SchemaDrivenComponent.propTypes = {
  row: PropTypes.object.isRequired,
  column: PropTypes.shape({
    field: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf(values(ColumnTypeEnum)).isRequired,
  }).isRequired,
  actions: PropTypes.object,
  readOnly: PropTypes.bool,
};
