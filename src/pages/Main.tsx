import { Outlet } from 'react-router-dom';
import ErrorBoundary from '../components/error-boundary/ErrorBoundary';
import OrganizationsBar from '../components/organizations-bar/OrganizationsBar';

export default function Main() {
  return (
    <ErrorBoundary>
      <OrganizationsBar />
      <Outlet />
    </ErrorBoundary>
  );
}
