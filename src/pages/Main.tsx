import { Outlet } from 'react-router-dom';
import ErrorBoundary from '../components/error-boundary/ErrorBoundary';
import OrganizationsBar from '../components/organizations-bar/OrganizationsBar';
import { Provider } from 'react-redux';
import { setupStore } from '../store/store';

const store = setupStore();

export default function Main() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <OrganizationsBar />
        <Outlet />
      </ErrorBoundary>
    </Provider>
  );
}
