import { updatePassword } from "../../actions/updatePassword";

const mockData = {
  userDetails: {
    message: 'Welcome admin',
    username: 'admin',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRhZGR5Iiwicm9sZSI6InVzZXIiLCJpZCI6MiwiaWF0IjoxNTEzODc1ODE3LCJleHAiOjE1MTM5NjIyMTd9.oexUFhi08vhMU88LmZJvRDy9JFdThMpfb3Qz9DWWzgk'
  },
  userDetailsResponse: {
    username: 'daddy',
    role: 'user',
    id: 2,
    iat: 1513875817,
    exp: 1513962217
  },
  userCountResponse: {
    count: 7
  },
  borrowBookData: {
    bookId: 1,
    userId: 1,
  },
  borrowBookDataResponse: {
    returned: false,
    id: 24,
    userId: 1,
    bookId: 7,
    toReturnDate: '2018-01-14',
    updatedAt: '2017-12-21T21:16:08.442Z',
    createdAt: '2017-12-21T21:16:08.442Z',
    returnDate: null,
    categoryId: null
  },
  createBookData: {
    title: 'a',
    author: 'a',
    category: 'a',
    image: 'https://res.cloudinary.com/andela-chidinma/image/upload/v1511133007/g2exfx6sgbymszspybts.jpg',
    review: 'Nice'
  },
  createBookErrorData: {
    author: 'a',
    category: 'a',
    image: 'https://res.cloudinary.com/andela-chidinma/image/upload/v1511133007/g2exfx6sgbymszspybts.jpg',
    review: 'Nice'
  },
  createBookErrorResponse: 'An error occured',
  createBookResponse: {
    message: 'Succesfully added'
  },
  getABookData: {
    id: 7,
    title: 'Rage of Angels',
    author: 'Sidney Sheldon',
    category: 'Fiction',
    image: 'https://res.cloudinary.com/andela-chidinma/image/upload/v1513096198/prbdr6eghnnrcewwpodf.jpg',
    review: 'Nice Book',
    createdAt: '2017-12-12T11:11:10.823Z',
    updatedAt: '2017-12-12T16:30:00.352Z',
    userId: null,
    categoryId: null
  },
  getAllBooksData: {
    id: 7,
    title: 'Rage of Angels',
    author: 'Sidney Sheldon',
    category: 'Fiction',
    image: 'https://res.cloudinary.com/andela-chidinma/image/upload/v1513096198/prbdr6eghnnrcewwpodf.jpg',
    review: 'Nice Book',
    createdAt: '2017-12-12T11:11:10.823Z',
    updatedAt: '2017-12-12T16:30:00.352Z',
    userId: null,
    categoryId: null
  },
  getAllBorrowedBooksData: {
    id: 7,
    title: 'Rage of Angels',
    author: 'Sidney Sheldon',
    category: 'Fiction',
    image: 'https://res.cloudinary.com/andela-chidinma/image/upload/v1513096198/prbdr6eghnnrcewwpodf.jpg',
    review: 'Nice Book',
    createdAt: '2017-12-12T11:11:10.823Z',
    updatedAt: '2017-12-12T16:30:00.352Z',
    userId: null,
    categoryId: null
  },
  getCategoryData: {
    category: 'Fiction'
  },
  getUserData: {
    firstname: 'daddy',
    lastname: 'daddy',
    username: 'daddy',
    password: 'daddy',
    email: 'daddy@gmail.com'
  },
  bookData: {
    title: 'a',
    author: 'b',
    category: 'a',
    image: 'https://res.cloudinary.com/andela-chidinma/image/upload/v1511133007/g2exfx6sgbymszspybts.jpg',
    review: 'Nice'
  },
  returnBookData: {
    message: 'Successfully Returned'
  },
  userData: {
    verifyPassword: '1234',
    password: '4321'
  },
  errorMessage: 'An error occurred',
  image: 'https://res.cloudinary.com/andela-chidinma/image/upload/v1515403427/ena7dhy6xriztom6vuvo.jpg'
};

export default mockData;
