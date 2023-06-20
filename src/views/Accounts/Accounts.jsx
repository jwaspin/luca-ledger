import { List } from '@mui/material';

export default function Accounts() {
  // create a list of accounts
  const accounts = [
    {
      name: 'Alpine Bank',
      type: 'Checking',
      balance: 1000.0,
    },
    {
      name: 'Chase Bank',
      type: 'Checking',
      balance: 1000.0,
    },
  ];

  return (
    // list the accounts using material ui
    <List>
      {accounts.map((account) => (
        <div key={account.name}>
          <h2>{account.name}</h2>
          <p>Balance: {account.balance}</p>
        </div>
      ))}
    </List>
  );
}
