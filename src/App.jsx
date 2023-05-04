import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Provider } from 'react-redux';

import AppContent from './components/AppContent';
import AppHeader from './components/AppHeader';
import store from './store';

export default function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Provider store={store}>
        <CssBaseline />
        <AppHeader />
        <AppContent />
      </Provider>
    </LocalizationProvider>
  );
}
