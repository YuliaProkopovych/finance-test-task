import React from 'react';
import { render, screen } from '@testing-library/react';
import CustomHeader from './components/header';

describe('Header', () => {
  render(<CustomHeader />);
  test('Header is rendered', () => {
    const headerElement = screen.getByText(/Finance/i);
    expect(headerElement).toBeInTheDocument();
  });
});
