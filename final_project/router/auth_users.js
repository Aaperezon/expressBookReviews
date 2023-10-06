const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}
const doesExist = (username)=>{
  let userswithsamename = users.filter((user)=>{
    return user.username === username
  });
  if(userswithsamename.length > 0){
    return true;
  } else {
    return false;
  }
}




var accessToken;
const authenticatedUser = (username,password)=>{
  let validusers = users.filter((user)=>{
    return (user.username === username && user.password === password)
  });
  if(validusers.length > 0){
    return true;
  } else {
    return false;
  }
}
//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(404).json({message: "Error logging in"});
  }
  if (authenticatedUser(username,password)) {
      accessToken = jwt.sign({
          data: password,
          username: username

        }, 'access', { expiresIn: 60*60 });
      req.session.authorization = {
        accessToken,username
      }
    return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({message: "Invalid Login. Check username and password"});
  }

  return res.status(300).json({message: "Yet to be implemented"});
  
});









regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  let to_assign = {};
  to_assign[jwt.verify(accessToken, 'access').username] = req.body.review;
  books[isbn]["reviews"] = Object.assign( to_assign );
  res.send(books[isbn],null,4);




  return res.status(300).json({message: "Yet to be implemented"});
});


regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  delete books[isbn]["reviews"][jwt.verify(accessToken, 'access').username];
  res.send(books[isbn],null,4);



  return res.status(300).json({message: "Yet to be implemented"});
});









module.exports.authenticated = regd_users;
module.exports.doesExist = doesExist;
module.exports.isValid = isValid;
module.exports.users = users;

