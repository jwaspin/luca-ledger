import LucaTable from '@/components/common/LucaTable';
import { useTransactions } from '@/hooks';

export default function TransactionsTable() {
  const { transactions } = useTransactions();

  const columns = [
    {
      field: 'description',
      title: 'Description',
      component: ({ row }) => <div>{row.description}</div>,
    },
    {
      field: 'amount',
      title: 'Amount',
      component: ({ row }) => <div>{row.amount}</div>,
    },
    {
      field: 'date',
      title: 'Date',
      component: ({ row }) => <div>{row.date}</div>,
    },
  ];

  return (
    <div>
      <h2>Transactions</h2>
      <LucaTable
        columns={columns}
        data={transactions}
      />
    </div>
  );
}
