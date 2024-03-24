import { useSelector } from 'react-redux';
import { selectAllEntities } from '../store/selectors';
import EntityRow from './EntityRow';

export default function EntityTable() {
  const entities = useSelector(selectAllEntities);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Type</th>
          <th>Status</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {entities.map((entity) => (
          <EntityRow
            key={entity.id}
            entity={entity}
          />
        ))}
      </tbody>
    </table>
  );
}
