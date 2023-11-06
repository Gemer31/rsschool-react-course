import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Main from './pages/Main';
import NotFound from './pages/NotFound';
import OrganizationDetailsError from './components/organization-details/OrganizationDetailsError';
import OrganizationDetails from './components/organization-details/OrganizationDetails';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Outlet />}>
      <Route path="/" element={<Main />}>
        <Route
          path="details"
          element={<OrganizationDetails />}
          errorElement={<OrganizationDetailsError />}
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
