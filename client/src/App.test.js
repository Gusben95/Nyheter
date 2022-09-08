import { render, screen } from '@testing-library/react';
import App from './App';
import {
  ArticleComp, 
} from '../../client/src/components/Article/ArticleComp';
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});




describe('article comp titel', () => {
  test('check if titel returns a string with a titel', () => {
    expect(typeof ArticleComp.titel).toBe(string);
  });
});localStorage