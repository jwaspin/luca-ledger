import { Navigate, Route, Routes } from 'react-router-dom';

import AccountsPage from '@/features/accounts/AccountsPage';
import Categories from '@/pages/Categories';
import Dashboard from '@/pages/Dashboard';
import Entities from '@/pages/Entities';
import Home from '@/pages/Home';
import Ledger from '@/pages/Ledger';
import Recurring from '@/pages/Recurring';

export default function AppContent() {
  return (
    <Routes>
      <Route
        path='/'
        element={<Home />}
      />
      <Route
        path='/dashboard'
        element={<Dashboard />}
      />
      <Route
        path='/accounts'
        element={<AccountsPage />}
      />
      <Route
        path='/accounts/:accountId'
        element={<Ledger />}
      />
      <Route
        path='/entities'
        element={<Entities />}
      />
      <Route
        path='/categories'
        element={<Categories />}
      />
      <Route
        path='/recurring'
        element={<Recurring />}
      />
      <Route
        path='*'
        element={
          <Navigate
            to='/'
            replace
          />
        }
      />
    </Routes>
  );
}
