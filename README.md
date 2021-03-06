[![Build Status](https://travis-ci.org/ChidinmaOrajiaku/HelloBooksProject.svg?branch=test)](https://travis-ci.org/ChidinmaOrajiaku/HelloBooksProject)
[![Test Coverage](https://api.codeclimate.com/v1/badges/5a0fc5c54d3007c06ed6/test_coverage)](https://codeclimate.com/github/ChidinmaOrajiaku/HelloBooksProject/test_coverage)
[![Coverage Status](https://coveralls.io/repos/github/ChidinmaOrajiaku/HelloBooksProject/badge.svg?branch=bug%2Fimplement-second-feedback)](https://coveralls.io/github/ChidinmaOrajiaku/HelloBooksProject?branch=bug%2Fimplement-second-feedback)

# HelloBooksProject

## HelloBooks PROJECT
HelloBooks is an app that manages library processes (tracking, stocking and renting). Users can borrow books and read them within the app.

## FEATURES
. Users can sign up/login

. Users can update password

. Users can rent books

. Users can return books

. Admin can add book, modify and delete book

## INSTALLATIONS
. [Node.js-Express](https://docs.npmjs.com/getting-started/installing-node)
    npm-install --save express
    
. [PostgreSQL](https://www.postgresql.org/download/)
## or simply 
. git clone this repository

. Run "npm-install" to install dependencies

. Run "npm run start" to start the application server

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
       
To get more information on the apis, visit the [api documention](https://chidinmaorajiaku.github.io/slate)

## AUTHOR
Ms. Chidinma Orajiaku
       
## CONTRIBUTING
Your contribution will be well appreciated as long as you follow the covention in our [WIKI](https://github.com/ChidinmaOrajiaku/HelloBooksProject/wiki)!

## HEROKU LINK
You can visit the app on [HelloBooks](https://hello-books-bootcamp.herokuapp.com)

## LICENSE
This project is licensed under the MIT License

Copyright (c) [2017] [Chidinma Orajiaku]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
