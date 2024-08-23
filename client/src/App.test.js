import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from './App';

test('renders URL input form', () => {
  act(() => {
    render(<App />);
  });
  const urlInputs = screen.getAllByPlaceholderText('Enter URL');
  expect(urlInputs).toHaveLength(3);
});

test('displays error message for invalid submission', () => {
  act(() => {
    render(<App />);
  });
  const submitButton = screen.getByText('Fetch Metadata');
  fireEvent.click(submitButton);
  const errorMessage = screen.getByText('Please enter at least 3 valid URLs');
  expect(errorMessage).toBeInTheDocument();
});

test('fetches and displays metadata', async () => {
  const mockFetch = jest.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve([
      { title: 'Test Title 1', description: 'Test Description 1', image: 'test1.jpg' },
      { title: 'Test Title 2', description: 'Test Description 2', image: 'test2.jpg' },
      { title: 'Test Title 3', description: 'Test Description 3', image: 'test3.jpg' },
    ]),
  });
  global.fetch = mockFetch;

  act(() => {
    render(<App />);
  });
  
  const urlInputs = screen.getAllByPlaceholderText('Enter URL');
  fireEvent.change(urlInputs[0], { target: { value: 'https://example.com' } });
  fireEvent.change(urlInputs[1], { target: { value: 'https://example.org' } });
  fireEvent.change(urlInputs[2], { target: { value: 'https://example.net' } });

  const submitButton = screen.getByText('Fetch Metadata');
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(screen.getByText('Test Title 1')).toBeInTheDocument();
    expect(screen.getByText('Test Title 2')).toBeInTheDocument();
    expect(screen.getByText('Test Title 3')).toBeInTheDocument();
  });
});