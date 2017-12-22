import configureMockStore from 'redux-mock-store';
import jwt from 'jsonwebtoken';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import mockData from './mocks/mockData';
import * as SigninActions from '../actions/signinAction';
import * as GetUserActions from '../actions/getUser';
import * as ModifyBookActions from '../actions/modifyBooks';
import * as GetUserBorrowedActions from '../actions/getUserBorrowedBooks';
import * as CreateBookActions from '../actions/createBooks';
import * as GetBookActions from '../actions/getABook';
import * as GetAllBooksActions from '../actions/getAllBooks';
import * as GetAllBorrowedBooksActions from '../actions/getAllBorrowedBooks';
import * as DeleteBookActions from '../actions/deleteBooks';
import * as BorrowBookActions from '../actions/borrowBooks';
import * as CategoryActions from '../actions/getCategory';
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
    it('creates BORROW_BOOKS_FAILED user borrows book', async (done) => {
        jest.setTimeout(10000) 
        const { borrowBookData} = mockData;
        moxios.stubRequest(`/api/v1/users/${borrowBookData.userId}/books`, {
          status: 400,
          error: "An error occurred"
        });
        const expectedActions = [{ 
            type: ActionTypes.BORROW_BOOKS_FAILED, 
            error: "An error occurred"
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
    it('creates CREATE_BOOKS_FAILED book', async (done) => {
        jest.setTimeout(10000) 
        const { createBookData} = mockData;
        moxios.stubRequest('/api/v1/users/books', {
          status: 400,
          error: "An error occurred"
        });
        const expectedActions = [{ 
            type: ActionTypes.CREATE_BOOKS_FAILED, 
            error: "An error occurred"
        }];
        const store = mockStore({});
        await store.dispatch(CreateBookActions.adminAddRequest(createBookData))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
          done();
      });
  });

  describe('Get a book actions', () => {
    beforeEach(() => {
      moxios.install();
    });
    afterEach(() => {
      moxios.uninstall();
    });
  
    it('get a GET_A_BOOK_SUCCESSFUL book', async (done) => {
      jest.setTimeout(10000) 
      const { getABookData } = mockData;
      moxios.stubRequest('/api/v1/books/1', {
        status: 200,
        response: getABookData
      });
      const expectedActions = [{ 
          type: ActionTypes.GET_A_BOOK_SUCCESSFUL, 
          response: getABookData
      }];
      const store = mockStore({});
      await store.dispatch(GetBookActions.getBookRequest(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
        done();
    });
    ('get a GET_A_BOOK_FAILED book', async (done) => {
        jest.setTimeout(10000) 
        moxios.stubRequest('/api/v1/books/1', {
          status: 400,
          error: "An error occurred"
        });
        const expectedActions = [{ 
            type: ActionTypes.GET_A_BOOK_FAILED, 
            error: "An error occurred"
        }];
        const store = mockStore({});
        await store.dispatch(GetBookActions.getBookRequest())
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
          done();
      });
  });

  describe('Delete a book actions', () => {
    beforeEach(() => {
      moxios.install();
    });
    afterEach(() => {
      moxios.uninstall();
    });
  
    it('delete a DELETE_BOOKS_SUCCESSFUL book', async (done) => {
      jest.setTimeout(10000) 
      moxios.stubRequest('/api/v1/books/1', {
        status: 200,
        response: []
      });
      const expectedActions = [{ 
          type: ActionTypes.DELETE_BOOKS_SUCCESSFUL, 
          response: []
      }];
      const store = mockStore({});
      await store.dispatch(DeleteBookActions.adminDeleteRequest(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
        done();
    });
    it('delete a DELETE_BOOKS_FAILED book', async (done) => {
        jest.setTimeout(10000) 
        moxios.stubRequest('/api/v1/books/1', {
          status: 400,
          error: "An error occurred"
        });
        const expectedActions = [{ 
            type: ActionTypes.DELETE_BOOKS_FAILED, 
            error: "An error occurred"
        }];
        const store = mockStore({});
        await store.dispatch(DeleteBookActions.adminDeleteRequest(1))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
          done();
      });
  });

  describe('Get all books actions', () => {
    beforeEach(() => {
      moxios.install();
    });
    afterEach(() => {
      moxios.uninstall();
    });
  
    it('get all GET_BOOKS_SUCCESSFUL books', async (done) => {
      jest.setTimeout(10000) 
      const { getAllBooksData } = mockData;
      moxios.stubRequest('/api/v1/users/books', {
        status: 200,
        response: getAllBooksData
      });
      const expectedActions = [{ 
          type: ActionTypes.GET_BOOKS_SUCCESSFUL, 
          response: getAllBooksData
      }];
      const store = mockStore({});
      await store.dispatch(GetAllBooksActions.getRequest())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
        done();
    });
    it('get all GET_BOOKS_FAILED books', async (done) => {
        jest.setTimeout(10000) 
        moxios.stubRequest('/api/v1/users/books', {
          status: 400,
          error: "An error occurred"
        });
        const expectedActions = [{ 
            type: ActionTypes.GET_BOOKS_FAILED, 
            error: "An error occurred"
        }];
        const store = mockStore({});
        await store.dispatch(GetAllBooksActions.getRequest(1))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
          done();
      });
});
 describe('Get all borrowed books actions', () => {
    beforeEach(() => {
        moxios.install();
    });
    afterEach(() => {
        moxios.uninstall();
    });

    it('get all GET_BORROWED_BOOKS_SUCCESSFUL books', async (done) => {
        jest.setTimeout(10000) 
        const { getAllBorrowedBooksData } = mockData;
        moxios.stubRequest('/api/v1/users/books/unreturned', {
        status: 200,
        response: getAllBorrowedBooksData
        });
        const expectedActions = [{ 
            type: ActionTypes.GET_BORROWED_BOOKS_SUCCESSFUL, 
            response: getAllBorrowedBooksData
        }];
        const store = mockStore({});
        await store.dispatch(GetAllBorrowedBooksActions.admingetBorrowedRequest())
        .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
        done();
    });
    it('get all GET_BORROWED_BOOKS_FAILED books', async (done) => {
        jest.setTimeout(10000) 
        const { getAllBorrowedBooksData } = mockData;
        moxios.stubRequest('/api/v1/users/books/unreturned', {
            status: 400,
            error: "An error occurred"
        });
        const expectedActions = [{ 
            type: ActionTypes.GET_BORROWED_BOOKS_FAILED, 
            error: "An error occurred"
        }];
        const store = mockStore({});
        await store.dispatch(GetAllBorrowedBooksActions.admingetBorrowedRequest())
            .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            });
            done();
        });
  });

  describe('Get category actions', () => {
    beforeEach(() => {
        moxios.install();
    });
    afterEach(() => {
        moxios.uninstall();
    });

    it('get all GET_CATEGORY_SUCCESSFUL category', async (done) => {
        jest.setTimeout(10000) 
        const { getCategoryData } = mockData;
        moxios.stubRequest('/api/v1/books/category/all', {
        status: 200,
        response: getCategoryData
        });
        const expectedActions = [{ 
            type: ActionTypes.GET_CATEGORY_SUCCESSFUL, 
            response: getCategoryData
        }];
        const store = mockStore({});
        await store.dispatch(CategoryActions.getAllCategoryRequest())
        .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
        done();
    });
    it('get all GET_CATEGORY_FAILED category', async (done) => {
        jest.setTimeout(10000) 
        moxios.stubRequest('/api/v1/books/category/all', {
            status: 400,
            error: "An error occurred"
        });
        const expectedActions = [{ 
            type: ActionTypes.GET_CATEGORY_FAILED, 
            error: "An error occurred"
        }];
        const store = mockStore({});
        await store.dispatch(CategoryActions.getAllCategoryRequest())
            .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            });
            done();
        });
  });
  describe('Get user actions', () => {
    beforeEach(() => {
        moxios.install();
    });
    afterEach(() => {
        moxios.uninstall();
    });

    it('get GET_USER_SUCCESSFUL user details', async (done) => {
        jest.setTimeout(10000) 
        const { getUserData } = mockData;
        moxios.stubRequest('/api/v1/users/1', {
        status: 200,
        response: getUserData
        });
        const expectedActions = [{ 
            type: ActionTypes.GET_USER_SUCCESSFUL, 
            response: getUserData
        }];
        const store = mockStore({});
        await store.dispatch(GetUserActions.getUserDataRequest(1))
        .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
        done();
    });
    it('get GET_USER_FAILED user details', async (done) => {
        jest.setTimeout(10000) 
        moxios.stubRequest('/api/v1/users/1', {
            status: 400,
            error: "An error occurred"
        });
        const expectedActions = [{ 
            type: ActionTypes.GET_USER_FAILED, 
            error: "An error occured"
        }];
        const store = mockStore({});
        await store.dispatch(GetUserActions.getUserDataRequest(1))
            .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            });
            done();
        });
  });

  describe('Get user borrowed books actions', () => {
    beforeEach(() => {
        moxios.install();
    });
    afterEach(() => {
        moxios.uninstall();
    });

    it('get GET_USER_BORROWED_SUCCESSFUL user borrowed books details', async (done) => {
        jest.setTimeout(10000) 
        const { getAllBorrowedBooksData } = mockData;
        moxios.stubRequest('/api/v1/users/1/history', {
        status: 200,
        response: getAllBorrowedBooksData
        });
        const expectedActions = [{ 
            type: ActionTypes.GET_USER_BORROWED_SUCCESSFUL, 
            response: getAllBorrowedBooksData
        }];
        const store = mockStore({});
        await store.dispatch(GetUserBorrowedActions.getUserBorrowed(1))
        .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
        done();
    });
    it('get GET_USER_BORROWED_FAILED user details', async (done) => {
        jest.setTimeout(10000) 
        moxios.stubRequest('/api/v1/users/1/history', {
            status: 400,
            error: "An error occurred"
        });
        const expectedActions = [{ 
            type: ActionTypes.GET_USER_BORROWED_FAILED, 
            error: "An error occured"
        }];
        const store = mockStore({});
        await store.dispatch(GetUserBorrowedActions.getUserBorrowed(1))
            .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            });
            done();
        });
  });

  describe('Modify books actions', () => {
    beforeEach(() => {
        moxios.install();
    });
    afterEach(() => {
        moxios.uninstall();
    });

    it('modify MODIFY_BOOKS_SUCCESSFUL books', async (done) => {
        jest.setTimeout(10000) 
        const { bookData } = mockData;
        moxios.stubRequest('/api/v1/books/1', {
        status: 201,
        response: bookData
        });
        const expectedActions = [{ 
            type: ActionTypes.MODIFY_BOOKS_SUCCESSFUL, 
            response: bookData
        }];
        const store = mockStore({});
        await store.dispatch(ModifyBookActions.adminModifyRequest(1))
        .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
        done();
    });
    it("modify MODIFY_BOOKS_FAILED books actions", async (done) => {
        jest.setTimeout(10000) 
        moxios.stubRequest('/api/v1/books/1', {
            status: 400,
            error: "An error occurred"
        });
        const expectedActions = [{ 
            type: ActionTypes.MODIFY_BOOKS_FAILED, 
            error: "An error occured"
        }];
        const store = mockStore({});
        await store.dispatch(ModifyBookActions.adminModifyRequest(1))
            .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            });
            done();
        });
  });