import { render , screen, fireEvent} from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store/Reducer';
import { BrowserRouter } from 'react-router-dom';
import Profile from '../components/Profile/Profile';
// import { TextEncoder, TextDecoder } from 'util'

// global.TextDecoder = TextEncoder
// global.TextDecoder = TextDecoder

const MockProfile = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Profile/>
      </BrowserRouter>
    </Provider>
  )
};

const {MongoClient} = require('mongodb');

describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(globalThis.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db(globalThis.__MONGO_DB_NAME__);
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should insert a doc into collection', async () => {
    const users = db.collection('user');

    const mockUser = {_id: 'stateUser', name: 'mrUser'};
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({_id: 'stateUser'});
    expect(insertedUser).toEqual(mockUser);
  });
});