import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchInput from './components/SearchInput';

test('renders a search button', () => {
    render(<SearchInput />);
  
    // Use React Testing Library's queryByText to find the search button
    const searchButton = screen.queryByRole('button', { name: /Search/i });
  
    // Assert that the search button exists
    expect(searchButton).toBeInTheDocument();
  });
  
  test('renders a search input field', () => {
    render(<SearchInput />);
  
    // Use getByPlaceholderText to find the search input field by its placeholder text
    const searchInput = screen.getByPlaceholderText(/Type to search a word/i);
  
    // Assert that the search input field exists
    expect(searchInput).toBeInTheDocument();
  });
