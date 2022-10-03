import { render , screen, fireEvent} from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store/Reducer';
import { BrowserRouter } from 'react-router-dom';
import ArticleComp from '../components/Article/ArticleComp';

const MockArticleComp = () => {
  return (
      <Provider store={store}>
        <BrowserRouter>
          <ArticleComp/>
        </BrowserRouter>
      </Provider>
  )
};

describe('ArticleComp', () => {
  it('test', () => {
    render(<ArticleComp/>)
    screen.debug()
  })
})