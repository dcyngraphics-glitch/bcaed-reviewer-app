import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../Header';

describe('Header Component', () => {
  test('renders header text', () => {
    render(<Header />);
    const headerText = screen.getByRole('heading', { level: 1, name: /bcaed reviewer app/i });
    expect(headerText).toBeInTheDocument();
  });
});
