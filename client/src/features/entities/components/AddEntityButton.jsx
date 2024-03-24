import { useDispatch } from 'react-redux';

import { createNewEntity } from '../store/actions';

export default function AddEntityButton() {
  const dispatch = useDispatch();

  const handleAddEntity = () => {
    dispatch(createNewEntity('New entity', 'add a description'));
  };

  return <button onClick={handleAddEntity}>Add New Entity</button>;
}
