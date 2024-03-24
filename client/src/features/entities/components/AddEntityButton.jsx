import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { addEntity } from '@/store/slices/entities';

export default function AddEntityButton() {
  const dispatch = useDispatch();

  const newEntity = {
    id: uuidv4(),
    name: '',
    description: '',
    entityType: 'ACCOUNT',
    entityStatus: 'ACTIVE',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const handleAddEntity = () => {
    dispatch(addEntity(newEntity));
  };

  return <button onClick={handleAddEntity}>Add New Entity</button>;
}
