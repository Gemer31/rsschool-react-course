import { RouteObject } from 'react-router-dom';
import { Layout } from './components/layout.tsx';
import { MainPage } from './pages/main-page.tsx';
import { UncontrolledFormPage } from './pages/uncontrolled-form-page.tsx';
import { ReactHookFormPage } from './pages/react-hook-form-page.tsx';
import { NotFoundPage } from './pages/not-found-page.tsx';

export enum RouterPage {
  MAIN = '/',
  REACT_HOOK_FORM = '/react-hook-form',
  UNCONTROLLED_FORM = '/uncontrolled-form',
}

export const routes: RouteObject[] = [
  {
    path: RouterPage.MAIN,
    element: <Layout />,
    children: [
      {
        path: RouterPage.MAIN,
        element: <MainPage />,
      },
      {
        path: RouterPage.UNCONTROLLED_FORM,
        element: <UncontrolledFormPage />,
      },
      {
        path: RouterPage.REACT_HOOK_FORM,
        element: <ReactHookFormPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
];
