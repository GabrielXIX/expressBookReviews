const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [
    {
        id: 1,
        username: "username1",
        password: "password1"
    },
    {
        id: 2,
        username: "username2",
        password: "password2"
    }
];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
    const user = users.find(user => user.username == username)

    // if !user {
    //     return 
    // }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

    if (!username || !password) {
        return res.status(404).json({ message: "Username or password not provided" });
    }

    let accessToken = jwt.sign({
        data: username
    }, 'access', { expiresIn: 60 * 60 });

    // Store access token in session
    req.session.authorization = {
        accessToken
    }
    return res.status(200).send("User successfully logged in");
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn
    const review = req.body.review
    const user = req.user

    books[isbn]["reviews"][user] = review

    return res.status(200).send("Review successfully updated or added");
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn
    const user = req.user

    delete books[isbn]["reviews"][user]

    return res.status(200).send("Review successfully deleted");
})

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
