import { Route, Routes } from 'react-router-dom';

import AccountLedger from '@/views/AccountLedger';
import Accounts from '@/views/Accounts';
import Dashboard from '@/views/Dashboard';

export default function AppContent() {
  return (
    <Routes>
      <Route
        path='/'
        element={<Dashboard />}
      />
      <Route
        path='/accounts'
        element={<Accounts />}
      />
      <Route
        path='/accounts/:accountId'
        element={<AccountLedger />}
      />
    </Routes>
  );
}
