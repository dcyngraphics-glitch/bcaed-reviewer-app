import { Component, type ErrorInfo, type ReactNode } from 'react';
import Button from './Button';
import Card from './Card';

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

/**
 * Catches a render-time crash so it degrades to a readable message instead of a
 * blank page.
 *
 * This app hit that failure twice — an out-of-range index and an unresolved
 * import both produced a white screen with nothing to go on. A boundary turns
 * that into something the student can report and the developer can act on.
 *
 * It cannot catch errors in event handlers or async work; those still need
 * their own handling.
 */
class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Kept as a console error rather than swallowed: there is no reporting
    // backend yet, and a silent boundary would hide real bugs in development.
    console.error('Unhandled render error:', error, info.componentStack);
  }

  private reset = () => this.setState({ error: null });

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <Card className="p-8 max-w-lg w-full text-center">
          <p className="text-4xl mb-3" aria-hidden="true">
            ⚠️
          </p>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Something broke</h1>
          <p className="text-gray-600 mb-4">
            This screen failed to load. Your progress is stored on this device and has not been
            lost.
          </p>

          <p className="text-xs text-left text-red-700 bg-red-50 border border-red-200 rounded p-3 mb-5 break-words">
            {error.message}
          </p>

          <div className="flex flex-wrap gap-3 justify-center">
            <Button variant="primary" onClick={this.reset}>
              Try again
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                window.location.assign('/student/home');
              }}
            >
              Back to dashboard
            </Button>
          </div>
        </Card>
      </div>
    );
  }
}

export default ErrorBoundary;
