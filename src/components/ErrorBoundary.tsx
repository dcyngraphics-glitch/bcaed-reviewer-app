import { Component, type ErrorInfo, type ReactNode } from 'react';
import { motion } from 'framer-motion';
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
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-lg"
        >
          <Card className="p-8 text-center">
            <p className="text-4xl mb-3" aria-hidden="true">
              ⚠️
            </p>
            <h1 className="text-xl font-bold text-foreground mb-2">Something broke</h1>
            <p className="text-muted-foreground mb-4">
              This screen failed to load. Your progress is stored on this device and has not been
              lost.
            </p>

            <p className="text-xs text-left text-error-700 bg-error-50 border border-error-200 rounded-md p-3 mb-5 break-words">
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
        </motion.div>
      </div>
    );
  }
}

export default ErrorBoundary;
