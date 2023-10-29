import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MainLayout from '@/components/MainLayout/MainLayout';
import store from '@/store';

export default function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Provider store={store}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="*" element={<MainLayout />} />
          </Routes>
        </Router>
      </Provider>
    </LocalizationProvider>
  );
}