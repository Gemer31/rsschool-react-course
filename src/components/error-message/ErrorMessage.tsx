import classes from './ErrorMessage.module.scss';
import { Link } from "react-router-dom";

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
      <Link role="go-back-button" to="/" onClick={() => callback?.()}>
        Go Home
      </Link>
    </main>
  );
}
