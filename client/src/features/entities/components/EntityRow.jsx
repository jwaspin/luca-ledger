import debounce from 'lodash/debounce';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateEntityById } from '../store/actions';
import EntityStatusSelect from './EntityStatusSelect';
import EntityTypeSelect from './EntityTypeSelect';

export default function EntityRow({ entity }) {
  const [editableEntity, setEditableEntity] = useState({ ...entity });
  const dispatch = useDispatch();

  const handleChange = debounce((field, value) => {
    setEditableEntity((prev) => ({ ...prev, [field]: value }));
  }, 500);

  const saveChanges = () => {
    dispatch(updateEntityById(editableEntity.id, editableEntity));
  };

  const revertChanges = () => {
    setEditableEntity({ ...entity });
  };

  return (
    <tr>
      <td>
        <input
          type='text'
          value={editableEntity.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />
      </td>
      <td>
        <input
          type='text'
          value={editableEntity.description}
          onChange={(e) => handleChange('description', e.target.value)}
        />
      </td>
      <td>
        <EntityTypeSelect
          entityType={editableEntity.entityType}
          onChange={(value) => handleChange('entityType', value)}
        />
      </td>
      <td>
        <EntityStatusSelect
          entityStatus={editableEntity.entityStatus}
          onChange={(value) => handleChange('entityStatus', value)}
        />
      </td>
      <td>
        <button onClick={saveChanges}>✓</button>
        <button onClick={revertChanges}>×</button>
      </td>
    </tr>
  );
}

EntityRow.propTypes = {
  entity: PropTypes.object.isRequired,
};
