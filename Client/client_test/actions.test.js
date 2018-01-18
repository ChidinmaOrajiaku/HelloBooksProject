import configureMockStore from 'redux-mock-store';
import jwt from 'jsonwebtoken';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import mockData from './mocks/mockData';
import * as UpdatePassword from '../actions/updatePassword';
import * as BookActions from '../actions/booksAction';
import * as EditBookActions from '../actions/editBooks';
import * as ReturnBookActions from '../actions/returnBook';
import * as YetToReturnActions from '../actions/yetToReturn';
import * as SigninActions from '../actions/signinAction';
import * as SignupActions from '../actions/signupAction';
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

  it('should sign user in', async (done) => {
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

describe('Logout actions', () => {
    beforeEach(() => {
      moxios.install();
    });
    afterEach(() => {
      moxios.uninstall();
    });
  
    it('should log a user out', async(done) => {
      jest.setTimeout(10000) 
      const expectedActions = [{ 
          type: ActionTypes.SET_CURRENT_USER, 
          user: {}
      }];
      const store = mockStore({});
      await store.dispatch(SigninActions.logout())
        expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  describe('Get book count actions', () => {
    beforeEach(() => {
      moxios.install();
    });
    afterEach(() => {
      moxios.uninstall();
    });
  
    it('should get book count', async (done) => {
    const { bookCountResponse } = mockData;
      jest.setTimeout(10000) 
      moxios.stubRequest('/api/v1/books', {
        status: 200,
        response: bookCountResponse
      });
      const expectedActions = [{ 
          type: ActionTypes.GET_BOOKS_COUNT, 
          books: 7
      }];
      const store = mockStore({});
      await store.dispatch(BookActions.adminCountBooksRequest())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
        done();
    });
  });

  describe('Get rented books count actions', () => {
    beforeEach(() => {
      moxios.install();
    });
    afterEach(() => {
      moxios.uninstall();
    });
  
    it('should get rented book count', async (done) => {
    const { bookCountResponse } = mockData;
      jest.setTimeout(10000) 
      moxios.stubRequest('/api/v1/rentedbooks/history/all', {
        status: 200,
        response: bookCountResponse
      });
      const expectedActions = [{ 
          type: ActionTypes.GET_RENTED_BOOKS_COUNT, 
          rentedBooks: 7
      }];
      const store = mockStore({});
      await store.dispatch(BookActions.adminCountRentedBooksRequest())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
        done();
    });
  });

  describe('Get not returned books count actions', () => {
    beforeEach(() => {
      moxios.install();
    });
    afterEach(() => {
      moxios.uninstall();
    });
  
    it('should get not returned book count', async (done) => {
    const { bookCountResponse } = mockData;
      jest.setTimeout(10000) 
      moxios.stubRequest('/api/v1/users/books/unreturned/history', {
        status: 200,
        response: bookCountResponse
      });
      const expectedActions = [{ 
          type: ActionTypes.GET_NOT_RETURNED_BOOKS_COUNT, 
          notReturnedBooks: 7
      }];
      const store = mockStore({});
      await store.dispatch(BookActions.adminCountNotReturnedBooksRequest())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
        done();
    });
  });

  describe('Get category count actions', () => {
    beforeEach(() => {
      moxios.install();
    });
    afterEach(() => {
      moxios.uninstall();
    });
  
    it('should get category count', async (done) => {
    const { bookCountResponse } = mockData;
      jest.setTimeout(10000) 
      moxios.stubRequest('/api/v1/books/category/history', {
        status: 200,
        response: bookCountResponse
      });
      const expectedActions = [{ 
          type: ActionTypes.GET_CATEGORY_COUNT, 
          categoryCount: 7
      }];
      const store = mockStore({});
      await store.dispatch(BookActions.adminCountCategoryRequest())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
        done();
    });
  });

  describe('Creates Category actions', () => {
    beforeEach(() => {
      moxios.install();
    });
    afterEach(() => {
      moxios.uninstall();
    });
  
    it('should create category', async (done) => {
    const { createCategory } = mockData;
      jest.setTimeout(10000) 
      moxios.stubRequest('/api/v1/books/category', {
        status: 201,
        response: createCategory
      });
      const expectedActions = [{ 
          type: ActionTypes.CREATE_CATEGORY, 
          category: createCategory
      }];
      const store = mockStore({});
      await store.dispatch(BookActions.adminCreateCategoryRequest(createCategory))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
        done();
    });
  });

  describe('Save image failed', () => {
    beforeEach(() => {
      moxios.install();
    });
    afterEach(() => {
      moxios.uninstall();
    });
  
    it('should not save image in cloudinary', async (done) => {
    const { imageResponse, uploadImage } = mockData;
      jest.setTimeout(10000) 
      moxios.stubRequest('https://api.cloudinary.com/v1_1/andela-chidinma/upload', {
        status: 200,
        response: imageResponse
      });
      const expectedActions = [
        { 
          type: ActionTypes.SAVE_IMAGE_REQUEST, 
          data: uploadImage
        },
        { 
            type: ActionTypes.SAVE_IMAGE_FAILED, 
            error: "An error occurred"
          },
          
    ];
      const store = mockStore({});
      await store.dispatch(BookActions.saveImageCloudinary(uploadImage))
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

  it('should count users', async (done) => {
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

describe('Edit Book actions', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('should get book Id to edit', (done) => {
    jest.setTimeout(10000) 
    const { bookCountResponse } = mockData;
    const expectedActions = { 
        type: ActionTypes.EDIT_BOOK_ID, 
        bookId: 7
    };
    const actions = EditBookActions.editBookIdRequest(bookCountResponse.count)
        expect(actions).toEqual(expectedActions);
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
  it('should allow user to borrow book', async (done) => {
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
  it('should not allow user to borrow book', async (done) => {
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

  it('should create book', async (done) => {
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
  it('should not create book', async (done) => {
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

describe('Get a book action', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('should get a book', async (done) => {
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
  ('should not get a book', async (done) => {
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

  it('should delete a book', async (done) => {
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
  it('should not delete a book', async (done) => {
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

  it('should get all books', async (done) => {
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
  it('should not get all books', async (done) => {
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

  it('should get all borrowed books', async (done) => {
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
  it('should not get all borrowed books', async (done) => {
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

  it('should get all category', async (done) => {
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
  it('should not get all category', async (done) => {
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

  it('should get user details', async (done) => {
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
  it('should not get user details', async (done) => {
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

  it('should get user borrowed books details', async (done) => {
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
  it('should not get user borrowed books details', async (done) => {
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

  it('should modify books', async (done) => {
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
  it("should not modify books", async (done) => {
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

describe('Return books actions', () => {
  beforeEach(() => {
      moxios.install();
  });
  afterEach(() => {
      moxios.uninstall();
  });

  it('should return books', async (done) => {
      jest.setTimeout(10000) 
      const { returnBookData } = mockData;
      moxios.stubRequest('/api/v1/users/1/books', {
      status: 200,
      response: returnBookData
      });
      const expectedActions = [{ 
          type: ActionTypes.RETURN_BOOK_SUCCESSFUL, 
          response: returnBookData
      }];
      const store = mockStore({});
      await store.dispatch(ReturnBookActions.returnBook(1))
      .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
      });
      done();
  });
  it("should not return books", async (done) => {
      jest.setTimeout(10000) 
      moxios.stubRequest('/api/v1/users/1/books', {
          status: 400,
          error: "An error occurred"
      });
      const expectedActions = [{ 
          type: ActionTypes.RETURN_BOOK_FAILED, 
          error: "An error occured"
      }];
      const store = mockStore({});
      await store.dispatch(ReturnBookActions.returnBook(1))
          .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          });
          done();
      });
});

describe('Get yet to be returned books actions', () => {
  beforeEach(() => {
      moxios.install();
  });
  afterEach(() => {
      moxios.uninstall();
  });

  it('should get yet to return books', async (done) => {
      jest.setTimeout(10000) 
      const { borrowBookDataResponse } = mockData;
      moxios.stubRequest('/api/v1/users/1/books', {
      status: 200,
      response: borrowBookDataResponse
      });
      const expectedActions = [{ 
          type: ActionTypes.YET_TO_RETURN_SUCCESSFUL, 
          response: borrowBookDataResponse
      }];
      const store = mockStore({});
      await store.dispatch(YetToReturnActions.yetToReturn(1))
      .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
      });
      done();
  });
  it("should not get yet to return books", async (done) => {
      jest.setTimeout(10000)
      const { borrowBookDataResponse } = mockData;
      moxios.stubRequest('/api/v1/users/1/books', {
          status: 400,
          error: "An error occurred"
      });
      const expectedActions = [{ 
          type: ActionTypes.YET_TO_RETURN_FAILED, 
          error: "An error occured"
      }];
      const store = mockStore({});
      await store.dispatch(YetToReturnActions.yetToReturn(1))
          .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          });
          done();
      });
});
