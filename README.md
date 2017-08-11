## FEATURES
. ES6 - Using [[Babel](https://www.npmjs.com/package/babel)]

. User registration API - Using [[JWT](https://www.npmjs.com/package/jsonwebtoken)] and [[bcrypt[(https://www.npmjs.com/package/bcrypt)]

. Style guide - [[Eslint with airbnb style guide](https://www.npmjs.com/package/eslint-config-airbnb)]

## INSTALLATIONS
. [[Node.js-Express](https://docs.npmjs.com/getting-started/installing-node)]
    npm-install --save express
. [[PostgreSQL](https://www.postgresql.org/download/)]
## or simply 
. git clone this repository
. Run "npm-install" to install dependencies
. Run "npm run start:dev" to start the application server

## APIs
The following apis are present in the application

 ## API routes for users to create accounts and login to the application
       . /api/users/signup
             POST : Username, Password & Email Address     
       . /api/users/signin
            POST: Username & Password
 ## An API route that allow users add new book: 
       . /api/books
          POST: Title, author and category
 ## An API route that allow users to modify a book information
       . /api/books/<bookId>
          PUT: Title and/or author and/or category
 ## An API route that allow users to gets all the books in the library
       . GET: /api/books
## An API route that allow user to borrow a book
       . /api/users/<userId>/books
         POST: Title, userId, bookId, to return date
## An API route that allow user to return a book
       . /api/users/<userId>/books
         PUT: returned, return date and userId
## An API route that allow users to get all the books that the user has borrowed but has not returned
       . GET: /api/users/<userId>/books?returned=false
