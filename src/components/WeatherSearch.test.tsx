import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import WeatherSearch from './WeatherSearch';
import '@testing-library/jest-dom';
// Mock Mantine components
jest.mock('@mantine/core', () => ({
  Group: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  TextInput: ({ placeholder, value, onChange }: any) => (
    <input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      data-testid="city-input"
    />
  ),
  Button: ({ children, loading, type }: any) => (
    <button type={type} disabled={loading} data-testid="search-button">
      {loading ? 'Loading...' : children}
    </button>
  ),
}));

describe('WeatherSearch Component', () => {
  let mockOnSearch: jest.Mock;

  beforeEach(() => {
    mockOnSearch = jest.fn();
  });

  it('renders correctly', () => {
    render(<WeatherSearch onSearch={mockOnSearch} loading={false} />);

    expect(screen.getByPlaceholderText('Enter city name')).toBeInTheDocument();
    expect(screen.getByTestId('search-button')).toBeInTheDocument();
  });

  it('updates input value when typing', () => {
    render(<WeatherSearch onSearch={mockOnSearch} loading={false} />);

    const input = screen.getByTestId('city-input');
    fireEvent.change(input, { target: { value: 'London' } });
    expect(input).toHaveValue('London');
  });

  it('calls onSearch with trimmed input on form submission', () => {
    render(<WeatherSearch onSearch={mockOnSearch} loading={false} />);

    const input = screen.getByTestId('city-input');
    const searchButton = screen.getByTestId('search-button');

    fireEvent.change(input, { target: { value: '  New York  ' } });
    fireEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith('New York');
    expect(input).toHaveValue('');
  });

  it('does not call onSearch when input is empty or only whitespace', () => {
    render(<WeatherSearch onSearch={mockOnSearch} loading={false} />);

    const searchButton = screen.getByTestId('search-button');
    const input = screen.getByTestId('city-input');

    // Ensure input is empty
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(searchButton);
    expect(mockOnSearch).not.toHaveBeenCalled();

    // Test with whitespace
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(searchButton);
    expect(mockOnSearch).not.toHaveBeenCalled();
  });

  it('displays loading state when loading prop is true', () => {
    render(<WeatherSearch onSearch={mockOnSearch} loading={true} />);

    const searchButton = screen.getByTestId('search-button');
    expect(searchButton).toBeDisabled();
    expect(searchButton).toHaveTextContent('Loading...');
  });
});
