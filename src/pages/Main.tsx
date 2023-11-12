import { Outlet } from 'react-router-dom';
import ErrorBoundary from '../components/error-boundary/ErrorBoundary';
import OrganizationsBar from '../components/organizations-bar/OrganizationsBar';
import { StorageProvider } from '../context/StorageContext';

export default function Main() {
  return (
    <StorageProvider>
      <ErrorBoundary>
        <OrganizationsBar />
        <Outlet />
      </ErrorBoundary>
    </StorageProvider>
  );
}
