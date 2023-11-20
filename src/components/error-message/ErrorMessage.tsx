import { NavLink } from 'react-router-dom';
import './ErrorMessage.scss';

interface IErrorMessageProps {
  message: string;
  callback: () => void;
}

export default function ErrorMessage({
  message,
  callback,
}: IErrorMessageProps) {
  return (
    <main className="error-message">
      <span data-testid="errorMessage" className="error-message__message">
        {message}
      </span>
      <NavLink
        to="/"
        className="error-message__link"
        onClick={() => callback?.()}
      >
        Go Home
      </NavLink>
    </main>
  );
}
