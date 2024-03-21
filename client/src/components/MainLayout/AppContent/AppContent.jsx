import { Navigate, Route, Routes } from 'react-router-dom';

import Accounts from '@/views/Accounts';
import Categories from '@/views/Categories';
import Dashboard from '@/views/Dashboard';
import Entities from '@/views/Entities';
import Home from '@/views/Home';
import Ledger from '@/views/Ledger';

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
        element={<Ledger />}
      />
      <Route
        path='/categories'
        element={<Categories />}
      />
      <Route
        path='/entities'
        element={<Entities />}
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
