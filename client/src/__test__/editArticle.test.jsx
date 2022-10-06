import { render , screen, fireEvent, getByAltText} from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store/Reducer';
import { BrowserRouter } from 'react-router-dom';
import EditingArticleFields from '../components/editArticle/EditingArticleFields';
import { getByLabelText } from '@testing-library/dom';


//test block Denis
const MocksignUp = () => {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <EditingArticleField/>
        </BrowserRouter>
      </Provider>
    )
  }

const url = "http://localhost/";

describe ('EditingArticleField', () => {

it("Editing an article field", ()=>{
    render(<EditingArticleFields article={{categories:[]}} handleEdit={()=>{}} handleRadioEdit={()=>{}} sendEdit={()=>{}} />);
    let element = screen.getByText("Titel");
    expect(element).toBeInTheDocument();
    

});
})