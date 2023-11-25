import classes from './ErrorMessage.module.scss';
import Link from 'next/link';

interface IErrorMessageProps {
  message: string;
  callback: () => void;
}

export default function ErrorMessage({
  message,
  callback,
}: IErrorMessageProps) {
  return (
    <main className={classes.errorMessage__message}>
      <span
        data-testid="errorMessage"
        className={classes.errorMessage__message}
      >
        {message}
      </span>
      <Link to="/" className="error-message__link" onClick={() => callback?.()}>
        Go Home
      </Link>
    </main>
  );
}
