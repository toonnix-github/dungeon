import { render } from '@testing-library/react';
import App from './App';

test('renders app container', () => {
  render(<App />);
  const appElement = document.querySelector('.App');
  expect(appElement).toBeInTheDocument();
});
