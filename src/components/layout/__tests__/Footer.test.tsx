import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer Component', () => {
  test('renders footer text', () => {
    render(<Footer />);
    expect(screen.getByText(/bcaed reviewer app/i)).toBeInTheDocument();
  });
});