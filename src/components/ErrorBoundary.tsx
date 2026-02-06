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
    // Log error info to a logging service in production
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.error("ErrorBoundary caught an error", error, errorInfo);
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background">
          <h1 className="text-3xl font-bold mb-4 text-destructive">
            Coś poszło nie tak
          </h1>
          <p className="mb-4 text-foreground">
            Wystąpił nieoczekiwany błąd. Spróbuj odświeżyć stronę.
          </p>
          <button
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
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
