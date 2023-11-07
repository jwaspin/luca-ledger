import { Navigate, Route, Routes } from 'react-router-dom';

import AccountLedger from '@/views/AccountLedger';
import Accounts from '@/views/Accounts';
import Dashboard from '@/views/Dashboard';
import Home from '@/views/Home';

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
        element={<Accounts />}
      />
      <Route
        path='/accounts/:accountId'
        element={<AccountLedger />}
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
