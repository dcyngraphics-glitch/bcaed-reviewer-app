import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Sidebar from '../Sidebar';

describe('Sidebar Component', () => {
  test('renders sidebar links', () => {
    render(<Sidebar />);
    const dashboardLink = screen.getByRole('link', { name: /dashboard/i });
    expect(dashboardLink).toBeInTheDocument();
    
    const subjectsLink = screen.getByRole('link', { name: /subjects/i });
    expect(subjectsLink).toBeInTheDocument();
  });
});