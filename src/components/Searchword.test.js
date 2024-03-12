import { render, fireEvent } from '@testing-library/react';
import SearchInput from "./SearchInput";

describe('SearchInput Component', () => {
  test('renders the search input field', () => {
    const { getByPlaceholderText } = render(<SearchInput />);
    const searchInput = getByPlaceholderText('Type to search a word...');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute('type', 'search');
  });
});
