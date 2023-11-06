import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <>
      <h1>Something went wrong</h1>
      <Link to="/">Go Home</Link>
    </>
  );
}
