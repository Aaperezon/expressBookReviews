const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let doesExist = require("./auth_users.js").doesExist;
let authenticatedUser = require("./auth_users.js").authenticatedUser;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!doesExist(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/', async function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books,null,4));
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',async function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(books[isbn],null,4)
 });

// Get book details based on author
public_users.get('/author/:author', async function (req, res) {
  //Write your code here
  const author = req.params.author;
  let to_send = [];
  for(const [key, values] of Object.entries(books)){
    // res.send(values,null,4)
    if(books[key]["author"] == author)
      to_send.push(books[key]);
  }
  res.send(to_send,null,4)

});

// Get all books based on title
public_users.get('/title/:title', async function (req, res) {
  //Write your code here
  const title = req.params.title;
  let to_send = [];
  for(const [key, values] of Object.entries(books)){
    // res.send(values,null,4)
    if(books[key]["title"] == title)
      to_send.push(books[key]);
  }
  res.send(to_send,null,4)
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const review = req.params.review;
  let to_send = [];
  for(const [key, values] of Object.entries(books)){
    if(books[key]["review"] == review)
      to_send.push(books[key]);
  }
  res.send(to_send,null,4)
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
