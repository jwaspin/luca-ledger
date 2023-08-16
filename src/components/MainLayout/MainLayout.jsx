import { Routes, Route } from 'react-router-dom';

import AppHeader from './AppHeader';
import Dashboard from '@/views/Dashboard';  
import Accounts from '@/views/Accounts';
import AccountLedger from '@/views/AccountLedger';

export default function MainLayout() {
  return (
    <>
      <AppHeader />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/transactions" element={<AccountLedger />} />
      </Routes>
    </>
  );
}
