import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import CheckboxInput from '@c/core/CheckboxInput';

export default function TableRowCheckbox({ row, toggleIsSelected }) {
  const dispatch = useDispatch();

  const handleChange = () => {
    dispatch(toggleIsSelected(row.id));
  };

  return (
    <CheckboxInput
      value={row.isSelected}
      onChange={handleChange}
    />
  );
}

TableRowCheckbox.propTypes = {
  row: PropTypes.object.isRequired,
  toggleIsSelected: PropTypes.func.isRequired,
};
