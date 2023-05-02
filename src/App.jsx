import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';

import AppContent from './components/AppContent';
import AppHeader from './components/AppHeader';
import store from './store';

export default function App() {
  return (
    <Provider store={store}>
      <CssBaseline />
      <AppHeader />
      <AppContent />
    </Provider>
  );
}
