import isEmpty from 'lodash/isEmpty';
import signUpErrorReducer from '../reducers/signUp';
import borrowBooksReducer from '../reducers/borrowBooks';
import createBooksReducer from '../reducers/createBooks';
import deletedBookReducer from '../reducers/deleteBooks';
import getABookReducer from '../reducers/getABook';
import getAllBooksReducer from '../reducers/getAllBooks';
import getAllBorrowedBooksReducer from '../reducers/getAllBorrowedBooks';
import getCategoryReducer from '../reducers/getCategory';
import getUserReducer from '../reducers/getUser';
import getUserBorrowedBooksReducer from '../reducers/getUserBorrowedBooks';
import modifyBookReducer from '../reducers/modifyBooks';
import returnBookReducer from '../reducers/returnBook';
import yetToReturnReducer from '../reducers/yetToReturn';
import authReducer from '../reducers/auth';
import mockData from './mocks/mockData';
import * as types from '../actions/types';

describe('Set current user reducer', () => {
  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual({
      isAuthenticated: false,
      user: {}
    });
  });

  it('should handle current user', () => {
    const { userDetailsResponse } = mockData;
    expect(authReducer({
      type: types.SET_CURRENT_USER,
      isAuthenticated: !isEmpty(userDetailsResponse),
      user: userDetailsResponse,
    })).toEqual({
      type: 'SET_CURRENT_USER',
      isAuthenticated: !isEmpty(userDetailsResponse),
      user: userDetailsResponse
    });
  });
});

describe('Sign up error reducer', () => {
  it('should return the initial state', () => {
    expect(signUpErrorReducer(undefined, {})).toEqual([
      {
        error: '',
        isSignedUp: '',
      }
    ]);
  });

  it('should handle sign up errors', () => {
    const { errorMessage } = mockData;
    expect(signUpErrorReducer([], {
      type: types.SIGN_UP_FAILED,
      error: errorMessage,
    })).toEqual([
      {
        error: errorMessage,
        isSignedUp: false,
      }
    ]);
  });
});


describe('Borrowed books reducer', () => {
  it('should return the initial state', () => {
    expect(borrowBooksReducer(undefined, {})).toEqual([
      {
        borrowData: {},
        response: '',
        error: '',
        hasBorrowed: '',
      }
    ]);
  });

  it('should handle borrowed books', () => {
    const { borrowBookDataResponse, errorMessage } = mockData;
    expect(borrowBooksReducer([], {
      type: types.BORROW_BOOKS_SUCCESSFUL,
      response: borrowBookDataResponse,
    })).toEqual([
      {
        borrowData: {},
        response: borrowBookDataResponse,
        error: '',
        hasBorrowed: true,
      }
    ]);

    expect(borrowBooksReducer([], {
      type: types.BORROW_BOOKS_FAILED,
      error: errorMessage,
    })).toEqual([
      {
        borrowData: {},
        response: '',
        error: errorMessage,
        hasBorrowed: false,
      }
    ]);
  });
});

describe('Create books reducer', () => {
  it('should return the initial state', () => {
    expect(createBooksReducer(undefined, {})).toEqual([
      {
        createData: {},
        response: '',
        error: '',
        isAdded: '',
      }
    ]);
  });

  it('should handle created books', () => {
    const { errorMessage, createBookResponse } = mockData;
    expect(createBooksReducer([], {
      type: types.CREATE_BOOKS_SUCCESSFUL,
      response: createBookResponse,
    })).toEqual([
      {
        createData: {},
        response: createBookResponse,
        error: '',
        isAdded: true,
      }
    ]);

    expect(createBooksReducer([], {
      type: types.CREATE_BOOKS_FAILED,
      error: errorMessage,
    })).toEqual([
      {
        createData: {},
        response: '',
        error: errorMessage,
        isAdded: false,
      }
    ]);
  });
});

describe('Get a book reducer', () => {
  it('should return the initial state', () => {
    expect(getABookReducer(undefined, {})).toEqual([
      {
        getABookData: {},
        response: '',
        error: '',
      }
    ]);
  });

  it('should handle books', () => {
    const { errorMessage, getABookData } = mockData;
    expect(getABookReducer([], {
      type: types.GET_A_BOOK_SUCCESSFUL,
      response: getABookData,
    })).toEqual([
      {
        getABookData: {},
        response: getABookData,
        error: '',
      }
    ]);

    expect(getABookReducer([], {
      type: types.GET_A_BOOK_FAILED,
      error: errorMessage,
    })).toEqual([
      {
        getABookData: {},
        response: '',
        error: errorMessage,
      }
    ]);
  });
});

describe('Delete book reducer', () => {
  it('should return the initial state', () => {
    expect(deletedBookReducer(undefined, {})).toEqual([
      {
        deleteData: {},
        response: '',
        error: '',
        isDeleted: ''
      }
    ]);
  });

  it('should handle deleted books', () => {
    const { errorMessage } = mockData;
    expect(deletedBookReducer([], {
      type: types.DELETE_BOOKS_SUCCESSFUL,
      response: [],
    })).toEqual([
      {
        deleteData: {},
        response: [],
        error: '',
        isDeleted: true
      }
    ]);

    expect(deletedBookReducer([], {
      type: types.DELETE_BOOKS__FAILED,
      error: errorMessage,
    })).toEqual([]);
  });
});

describe('Get all books reducer', () => {
  it('should return the initial state', () => {
    expect(getAllBooksReducer(undefined, {})).toEqual([
      {
        getData: {},
        response: '',
        error: '',
      }
    ]);
  });

  it('should handle books', () => {
    const { errorMessage, getAllBooksData } = mockData;
    expect(getAllBooksReducer([], {
      type: types.GET_BOOKS_SUCCESSFUL,
      response: getAllBooksData,
    })).toEqual([
      {
        getData: {},
        response: getAllBooksData,
        error: '',
      }
    ]);

    expect(getAllBooksReducer([], {
      type: types.GET_BOOKS_FAILED,
      error: errorMessage,
    })).toEqual([
      {
        getData: {},
        response: '',
        error: errorMessage,
      }
    ]);
  });
});

describe('Get all borrowed books reducer', () => {
  it('should return the initial state', () => {
    expect(getAllBorrowedBooksReducer(undefined, {})).toEqual([
      {
        getBorrowedData: {},
        response: '',
        error: '',
      }
    ]);
  });

  it('should handle all borrowed books', () => {
    const { errorMessage, getAllBorrowedBooksData } = mockData;
    expect(getAllBorrowedBooksReducer([], {
      type: types.GET_BORROWED_BOOKS_SUCCESSFUL,
      response: getAllBorrowedBooksData,
    })).toEqual([
      {
        getBorrowedData: {},
        response: getAllBorrowedBooksData,
        error: '',
      }
    ]);

    expect(getAllBorrowedBooksReducer([], {
      type: types.GET_BORROWED_BOOKS_FAILED,
      error: errorMessage,
    })).toEqual([
      {
        getBorrowedData: {},
        response: '',
        error: errorMessage,
      }
    ]);
  });
});

describe('Get category reducer', () => {
  it('should return the initial state', () => {
    expect(getCategoryReducer(undefined, {})).toEqual([
      {
        getCategoryData: {},
        response: '',
        error: '',
      }
    ]);
  });

  it('should handle category', () => {
    const { errorMessage, getCategoryData } = mockData;
    expect(getCategoryReducer([], {
      type: types.GET_CATEGORY_SUCCESSFUL,
      response: getCategoryData,
    })).toEqual([
      {
        getCategoryData: {},
        response: getCategoryData,
        error: '',
      }
    ]);

    expect(getCategoryReducer([], {
      type: types.GET_CATEGORY_FAILED,
      error: errorMessage,
    })).toEqual([
      {
        getCategoryData: {},
        response: '',
        error: errorMessage,
      }
    ]);
  });
});

describe('Get user reducer', () => {
  it('should return the initial state', () => {
    expect(getUserReducer(undefined, {})).toEqual([
      {
        getUserData: {},
        response: '',
        error: '',
      }
    ]);
  });

  it('should handle user', () => {
    const { errorMessage, getUserData } = mockData;
    expect(getUserReducer([], {
      type: types.GET_USER_SUCCESSFUL,
      response: getUserData,
    })).toEqual([
      {
        getUserData: {},
        response: getUserData,
        error: '',
      }
    ]);

    expect(getUserReducer([], {
      type: types.GET_USER_FAILED,
      error: errorMessage,
    })).toEqual([
      {
        getUserData: {},
        response: '',
        error: errorMessage,
      }
    ]);
  });
});

describe('Get user borrowed books reducer', () => {
  it('should return the initial state', () => {
    expect(getUserBorrowedBooksReducer(undefined, {})).toEqual([
      {
        userBorrowedData: {},
        response: '',
        error: '',
      }
    ]);
  });

  it('should handle user borrowed books', () => {
    const { errorMessage, getAllBorrowedBooksData } = mockData;
    expect(getUserBorrowedBooksReducer([], {
      type: types.GET_USER_BORROWED_SUCCESSFUL,
      response: getAllBorrowedBooksData,
    })).toEqual([
      {
        userBorrowedData: {},
        response: getAllBorrowedBooksData,
        error: '',
      }
    ]);

    expect(getUserBorrowedBooksReducer([], {
      type: types.GET_USER_BORROWED_FAILED,
      error: errorMessage,
    })).toEqual([
      {
        userBorrowedData: {},
        response: '',
        error: errorMessage,
      }
    ]);
  });
});

describe('Modify book reducer', () => {
  it('should return the initial state', () => {
    expect(modifyBookReducer(undefined, {})).toEqual([
      {
        modifyData: {},
        response: '',
        error: '',
        isModified: ''
      }
    ]);
  });

  it('should handle user borrowed books', () => {
    const { errorMessage, bookData } = mockData;
    expect(modifyBookReducer([], {
      type: types.MODIFY_BOOKS_SUCCESSFUL,
      response: bookData,
    })).toEqual([
      {
        modifyData: {},
        response: bookData,
        error: '',
        isModified: true
      }
    ]);

    expect(modifyBookReducer([], {
      type: types.MODIFY_BOOKS_FAILED,
      error: errorMessage,
    })).toEqual([
      {
        modifyData: {},
        response: '',
        error: errorMessage,
        isModified: false
      }
    ]);
  });
});

describe('Return book reducer', () => {
  it('should return the initial state', () => {
    expect(returnBookReducer(undefined, {})).toEqual([
      {
        returnData: {},
        response: '',
        error: '',
        hasReturned: '',
      }
    ]);
  });

  it('should handle returned books', () => {
    const { errorMessage, returnBookData } = mockData;
    expect(returnBookReducer([], {
      type: types.RETURN_BOOK_SUCCESSFUL,
      response: returnBookData,
    })).toEqual([
      {
        returnData: {},
        response: returnBookData,
        error: '',
        hasReturned: true,
      }
    ]);

    expect(returnBookReducer([], {
      type: types.RETURN_BOOK_FAILED,
      error: errorMessage,
    })).toEqual([
      {
        returnData: {},
        response: '',
        error: errorMessage,
        hasReturned: false,
      }
    ]);
  });
});

describe('Yet to return book reducer', () => {
  it('should return the initial state', () => {
    expect(yetToReturnReducer(undefined, {})).toEqual([
      {
        yetToReturnData: {},
        response: '',
        error: '',
      }
    ]);
  });

  it('should handle returned books', () => {
    const { errorMessage, borrowBookDataResponse } = mockData;
    expect(yetToReturnReducer([], {
      type: types.YET_TO_RETURN_SUCCESSFUL,
      response: borrowBookDataResponse,
    })).toEqual([
      {
        yetToReturnData: {},
        response: borrowBookDataResponse,
        error: '',
      }
    ]);

    expect(yetToReturnReducer([], {
      type: types.YET_TO_RETURN_FAILED,
      error: errorMessage,
    })).toEqual([
      {
        yetToReturnData: {},
        response: '',
        error: errorMessage,
      }
    ]);
  });
});

