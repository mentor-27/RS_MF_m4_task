import { Component, ErrorInfo, ReactNode } from 'react';

type TErrorBoundaryProps = {
  children: ReactNode;
};
type TErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends Component {
  state: TErrorBoundaryState;
  constructor(public props: TErrorBoundaryProps) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.log(error, info);
  }

  static getDerivedStateFromError(error: Error): TErrorBoundaryState {
    return { hasError: true };
  }

  render(): ReactNode {
    if (this.state.hasError) {
      this.setState({ hasError: false });
      return <h3>Something went wrong.</h3>;
    }
    return this.props.children;
  }
}
