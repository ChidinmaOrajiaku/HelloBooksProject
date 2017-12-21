import configureMockStore from 'redux-mock-store';
import jwt from 'jsonwebtoken';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import mockData from './mocks/mockData';
import * as SigninActions from '../actions/signinAction';
import * as CreateBookActions from '../actions/createBooks';
import * as BorrowBookActions from '../actions/borrowBooks';
import * as CountUsersActions from '../actions/adminCountUsers';
import * as ActionTypes from '../actions/types';

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);

/**
 * Thunk test
 */
describe('SignIn actions', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('creates SET_CURRENT_USER when user signs in', async (done) => {
    jest.setTimeout(10000) 
    const { userDetails, userDetailsResponse } = mockData;
    moxios.stubRequest('/api/v1/users/signin', {
      status: 200,
      response: userDetails
    });
    const expectedActions = [{ 
        type: ActionTypes.SET_CURRENT_USER, 
        user: userDetailsResponse 
    }];
    const store = mockStore({});
    await store.dispatch(SigninActions.userSigninRequest(userDetails))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
      done();
  });
});

describe('Count User actions', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('gets COUNT_USERS when admin counts users', async (done) => {
    jest.setTimeout(10000) 
    const { userCountResponse } = mockData;
    moxios.stubRequest('/api/v1/users/', {
      status: 200,
      response: userCountResponse
    });
    const expectedActions = [{ 
        type: ActionTypes.COUNT_USERS, 
        adminCountUsers: 7
    }];
    const store = mockStore({});
    await store.dispatch(CountUsersActions.adminCountUserRequest())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
      done();
  });
});

describe('Borrow books actions', () => {
    beforeEach(() => {
      moxios.install();
    });
    afterEach(() => {
      moxios.uninstall();
    });
  
    it('creates BORROW_BOOKS_SUCCESSFUL user borrows book', async (done) => {
      jest.setTimeout(10000) 
      const { borrowBookData, borrowBookDataResponse } = mockData;
      moxios.stubRequest(`/api/v1/users/${borrowBookData.userId}/books`, {
        status: 201,
        response: borrowBookDataResponse
      });
      const expectedActions = [{ 
          type: ActionTypes.BORROW_BOOKS_SUCCESSFUL, 
          response: borrowBookDataResponse
      }];
      const store = mockStore({});
      await store.dispatch(BorrowBookActions.borrowRequest(borrowBookData.bookId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
        done();
    });
  });

  describe('Create books actions', () => {
    beforeEach(() => {
      moxios.install();
    });
    afterEach(() => {
      moxios.uninstall();
    });
  
    it('creates CREATE_BOOKS_SUCCESSFUL book', async (done) => {
      jest.setTimeout(10000) 
      const { createBookData, createBookResponse } = mockData;
      moxios.stubRequest('/api/v1/users/books', {
        status: 201,
        response: createBookResponse
      });
      const expectedActions = [{ 
          type: ActionTypes.CREATE_BOOKS_SUCCESSFUL, 
          response: createBookResponse
      }];
      const store = mockStore({});
      await store.dispatch(CreateBookActions.adminAddRequest(createBookData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
        done();
    });
  });