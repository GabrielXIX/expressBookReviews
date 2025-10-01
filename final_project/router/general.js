const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  const userExists = users.find(user => user.username == username);

  if (userExists){
    res.send(JSON.stringify("User already exists"))
  }

  users.push({
    id: users.length + 1,
    username: username,
    password: password
  })

})

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify({books}, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    let book = books[isbn]
    res.send(book);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    const matching_books = Object.fromEntries(
        Object.entries(books).filter(([key, value]) => value.author === author)
    );
    res.send(matching_books);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
    const matching_books = Object.fromEntries(
        Object.entries(books).filter(([key, value]) => value.title === title)
    );
    res.send(matching_books);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    let review = books[isbn]["reviews"]
    res.send(review);
});

module.exports.general = public_users;
