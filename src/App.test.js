import { render } from '@testing-library/react';
import App from './App';

test('renders hero setup screen', () => {
  render(<App />);
  const buttonElement = screen.getByText(/start adventure/i);
  expect(buttonElement).toBeInTheDocument();
});
