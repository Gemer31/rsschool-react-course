import { Outlet } from 'react-router-dom';
import { Header } from './header/header';

export function Layout() {
  return (
    <>
      <Header />
      <main className="main">
        <Outlet />
      </main>
    </>
  );
}
