import AddEntityButton from './components/AddEntityButton.1';
import EntitiesTable from './components/EntitiesTable'; // Component for displaying entities

export default function EntitiesPage() {
  return (
    <div>
      <h1>Entities Management</h1>
      <AddEntityButton />
      <EntitiesTable />
    </div>
  );
}
