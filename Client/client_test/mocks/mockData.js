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
    "returned": false,
    "id": 24,
    "userId": 1,
    "bookId": 7,
    "toReturnDate": "2018-01-14",
    "updatedAt": "2017-12-21T21:16:08.442Z",
    "createdAt": "2017-12-21T21:16:08.442Z",
    "returnDate": null,
    "categoryId": null
  },
  createBookData: {
    "title": "a",
    "author": "a",
    "category": "a",
    "image": "https://res.cloudinary.com/andela-chidinma/image/upload/v1511133007/g2exfx6sgbymszspybts.jpg",
    "review": "Nice"
  },
  createBookResponse: {
    message: 'Succesfully added'
  }
};

export default mockData;
