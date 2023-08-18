import { Route, Routes } from 'react-router-dom';

import AccountLedger from '@/views/AccountLedger';
import Accounts from '@/views/Accounts';
import Dashboard from '@/views/Dashboard';
import AppHeader from './AppHeader';

export default function MainLayout() {
  return (
    <>
      <AppHeader />
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
    </>
  );
}
