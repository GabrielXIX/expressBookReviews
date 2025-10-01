const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  const userExists = users.find(user => user.username === username)

  console.log(`user exists: ${userExists}`)

  if (userExists){
    return res.status(400).send("User already exists");
  }

  users.push({
    id: users.length + 1,
    username: username,
    password: password
  })

  console.log(`new users: ${users}`)

  return res.status(200).send("User successfully registered");
})

// Get the book list available in the shop
public_users.get('/',function (req, res) {

    let myPromise1 = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve("Promise 1 resolved")
    },3000)})

    myPromise1.then(() => {
        res.send(JSON.stringify({books}, null, 4));
    })
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    let book = books[isbn]

    let myPromise1 = new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve("Promise 1 resolved")
        },3000)})
        
        myPromise1.then(() => {
            res.send(book);
        })
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    const matching_books = Object.fromEntries(
        Object.entries(books).filter(([key, value]) => value.author === author)
    );

    let myPromise1 = new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve("Promise 1 resolved")
        },3000)})
        
        myPromise1.then(() => {
            res.send(matching_books);
        })
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
    const matching_books = Object.fromEntries(
        Object.entries(books).filter(([key, value]) => value.title === title)
    );


    let myPromise1 = new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve("Promise 1 resolved")
        },3000)})
        
        myPromise1.then(() => {
            res.send(matching_books);
        })
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    let reviews = books[isbn]["reviews"]
    res.send(reviews);
});

module.exports.general = public_users;
