import LucaTable from '@/components/common/LucaTable';
import { useEntities } from '@/hooks';

export default function EntitiesTable() {
  const { entities } = useEntities();

  const columns = [
    {
      field: 'name',
      title: 'Name',
      component: ({ row }) => <div>{row.name}</div>,
    },
    {
      field: 'createdAt',
      title: 'Created At',
      component: ({ row }) => <div>{row.createdAt}</div>,
    },
    {
      field: 'updatedAt',
      title: 'Updated At',
      component: ({ row }) => <div>{row.updatedAt}</div>,
    },
  ];

  return (
    <div>
      <h2>Entities</h2>
      <LucaTable
        columns={columns}
        data={entities}
      />
    </div>
  );
}
