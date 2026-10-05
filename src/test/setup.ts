// Registers the jest-dom matchers AND augments Vitest's `expect` types.
// The bare '@testing-library/jest-dom' import only registers them at runtime,
// which left every toBeInTheDocument/toHaveClass call a TS2339.
import '@testing-library/jest-dom/vitest';
import { createElement, forwardRef, type ReactNode, type Ref } from 'react';
import { vi } from 'vitest';

/**
 * framer-motion drives animations through the Web Animations API. happy-dom's
 * Animation implementation rejects with AbortError when a component unmounts
 * mid-animation, which surfaced as "17 unhandled errors" and a non-zero exit
 * code even with every test green.
 *
 * Mocked for tests only — the app still uses the real library.
 */
vi.mock('framer-motion', () => {
  const createComponent = (tag: string) => {
    const Component = forwardRef(
      (
        {
          children,
          className,
          style,
          variants,
          initial,
          animate,
          exit,
          transition,
          whileHover,
          whileTap,
          whileFocus,
          whileDrag,
          whileInView,
          layout,
          layoutId,
          onAnimationStart,
          onAnimationEnd,
          ...rest
        }: Record<string, unknown>,
        ref: Ref<HTMLElement>,
      ) => createElement(tag, { ref, className, style, ...rest }, children as ReactNode),
    );
    Component.displayName = `MockMotion${tag}`;
    return Component;
  };

  return {
    motion: new Proxy(
      {},
      {
        get: (_target, tag: string) => createComponent(tag),
      },
    ),
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
    useReducedMotion: () => false,
    useAnimation: () => ({ start: vi.fn(), stop: vi.fn(), set: vi.fn() }),
    useMotionValue: (value: unknown) => ({ get: () => value, set: vi.fn(), on: vi.fn() }),
    useSpring: (value: unknown) => ({ get: () => value, set: vi.fn() }),
    useTransform: () => 0,
    useScroll: () => ({ scrollY: { get: () => 0 }, scrollYProgress: { get: () => 0 } }),
    useInView: () => true,
  };
});