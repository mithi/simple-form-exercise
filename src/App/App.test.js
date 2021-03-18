import { render, screen } from '@testing-library/react';
import App from '.';

test('Renders hello world app', () => {
  render(<App />);
  const linkElement = screen.getByText(/hello world/i);
  expect(linkElement).toBeInTheDocument();
});
