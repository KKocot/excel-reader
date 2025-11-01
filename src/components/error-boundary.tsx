import React, { Component, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log(error, errorInfo);
    // You can log error info here or send to a logging service
    // console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <h1 className="text-3xl font-bold mb-4 text-red-600">
            Coś poszło nie tak
          </h1>
          <p className="mb-4">
            Wystąpił nieoczekiwany błąd. Spróbuj odświeżyć stronę.
          </p>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={this.handleReload}
          >
            Odśwież stronę
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
