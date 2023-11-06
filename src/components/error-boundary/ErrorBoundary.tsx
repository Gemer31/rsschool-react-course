import { Component, ReactNode } from 'react';
import './ErrorBoundary.scss';
import { NavLink } from 'react-router-dom';

interface IErrorBoundaryProps {
  children: ReactNode;
}

interface IErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('Custom Error: ', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="error-boundary">
          <span className="error-boundary__message">
            Error boundary triggered
          </span>
          <NavLink
            to="/"
            className="error-boundary__link"
            onClick={() => this.setState({ hasError: false })}
          >
            Return
          </NavLink>
        </main>
      );
    }

    return this.props.children;
  }
}
