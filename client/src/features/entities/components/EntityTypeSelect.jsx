import { Select, MenuItem } from '@mui/material';
import PropTypes from 'prop-types';

const EntityTypeSelect = ({ entityType, onEntityTypeChange }) => {
  const entityTypes = [
    'ACCOUNT',
    'RETAILER',
    'SERVICE',
    'INDIVIDUAL',
    'UTILITY',
    'GOVERNMENT',
  ];

  return (
    <Select
      value={entityType}
      onChange={(e) => onEntityTypeChange(e.target.value)}
    >
      {entityTypes.map((type) => (
        <MenuItem
          key={type}
          value={type}
        >
          {type}
        </MenuItem>
      ))}
    </Select>
  );
};

EntityTypeSelect.propTypes = {
  entityType: PropTypes.string.isRequired,
  onEntityTypeChange: PropTypes.func.isRequired,
};

export default EntityTypeSelect;
