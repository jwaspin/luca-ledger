import { Navigate, Route, Routes } from 'react-router-dom';

import AccountsPage from '@/features/accounts/AccountsPage';
import BusinessesPage from '@/features/businesses/BusinessesPage';
import CategoriesPage from '@/features/categories/CategoriesPage';
import DashboardPage from '@/features/dashboard/DashboardPage';
import EntitiesPage from '@/features/entities/EntitiesPage';
import HomePage from '@/features/home/HomePage';
import LedgerPage from '@/features/ledger/LedgerPage';
import RecurringTransactionsPage from '@/features/recurringTransactions/RecurringTransactionsPage';
import SettingsPage from '@/features/settings/SettingsPage';

export default function AppContent() {
  return (
    <Routes>
      <Route
        path='/'
        element={<HomePage />}
      />
      <Route
        path='/dashboard'
        element={<DashboardPage />}
      />
      <Route
        path='/accounts'
        element={<AccountsPage />}
      />
      <Route
        path='/accounts/:accountId'
        element={<LedgerPage />}
      />
      <Route
        path='/entities'
        element={<EntitiesPage />}
      />
      <Route
        path='/categories'
        element={<CategoriesPage />}
      />
      <Route
        path='/recurring'
        element={<RecurringTransactionsPage />}
      />
      <Route
        path='/businesses'
        element={<BusinessesPage />}
      />
      <Route
        path='/settings'
        element={<SettingsPage />}
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
