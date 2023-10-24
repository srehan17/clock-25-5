import { render, screen } from '@testing-library/react';
import App from './App';

test('renders h1 heading 25 + 5 Clock', () => {
  render(<App />);
  let wrapper = container.querySelector('h1');
  expect(wrapper?.textContent).toEqual('25 + 5 Clock');
});
