import { Component, ReactNode } from 'react';

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
        <>
          <span className="custom-error-message">Error boundary triggered</span>
          <button
            type="button"
            className="form__button _error"
            onClick={() => this.setState({ hasError: false })}
          >
            Return
          </button>
        </>
      );
    }

    return this.props.children;
  }
}
