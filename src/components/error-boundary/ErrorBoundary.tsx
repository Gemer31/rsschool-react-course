import { Component, ReactNode } from 'react';
import ErrorMessage from '../error-message/ErrorMessage';

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
        <ErrorMessage
          message="Error boundary triggered"
          callback={() => {
            this.setState({ hasError: false });
          }}
        />
      );
    }

    return this.props.children;
  }
}
