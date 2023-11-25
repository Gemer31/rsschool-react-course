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
    <main className={classes.errorMessage}>
      <span
        data-testid="errorMessage"
        className={classes.errorMessage__message}
      >
        {message}
      </span>
      <Link href="/" onClick={() => callback?.()}>
        Go Home
      </Link>
    </main>
  );
}
