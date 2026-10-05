import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '../Footer';

describe('Footer Component', () => {
  test('renders footer text', () => {
    render(<Footer />);
    const footerText = screen.getByText(/bcaed reviewer app/i);
    expect(footerText).toBeInTheDocument();
  });
});