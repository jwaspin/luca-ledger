import AppContent from './AppContent';
import AppFooter from './AppFooter/AppFooter';
import AppHeader from './AppHeader';

export default function MainLayout() {
  return (
    <>
      <AppHeader />
      <AppContent />
      <AppFooter />
    </>
  );
}
