const express = require("express");
const router = express.Router();
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

// User Model
const User = require("../../model/users");

// @route  GET api/users
// @desc   Get All Users
// @access Public
router.get("/", (req, res) => {
  // if weren't using routers should be /api/users
  User.find()
    .sort({ date: -1 }) //desc
    .then(users => res.json(users));
});

// @route  POST api/users
// @desc   Create an User
// @access Public
router.post("/", (req, res) => {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(req.body.password, salt);
  // Store hash in your password DB.
  const newUser = new User({
    username: req.body.username, //bodyParser enable it
    password: hash,
    email: req.body.email
  });

  newUser
    .save()
    .then(user => res.json(user))
    .catch(er => res.json(er));
  /*
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "Post created...",
        authData
      });
    }
  });
*/
});

// Signup

router.post("/signup", (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              // _id: new mongoose.Types.ObjectId(),
              username: req.body.username,
              password: hash,
              email: req.body.email
            });
            user
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "User created"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
});

// Post by Tokens

router.post("/login", (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "email not found, user doesn't exist!"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        if (result) {
          const user = {
            username: req.body.username,
            email: req.body.email
          };
          jwt.sign({ user }, "secretkey", { expiresIn: "1h" }, (err, token) => {
            console.log(token);
            return res.status(200).json({
              message: "Auth successful",
              token
            });
          });
        } else {
          return res.status(400).json({
            message: "Wrong Password"
          });
        }
      });
    });
});
/*
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              _id: user[0]._id
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h"
            }
          );
          return res.status(200).json({
            message: "Auth successful",
            token: token
          });
        }
        res.status(401).json({
          message: "Auth failed"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
   });
*/

/*
  // Mock user
  const user = {
    id: 1,
    username: "brad",
    email: "brad@gmail.com"
  };

  jwt.sign({ user }, "secretkey", { expiresIn: "30s" }, (err, token) => {
    console.log(token);
    res.json({
      token
    });
  });
});
*/

// @route  PUT api/users/:id
// @desc   Update an User
// @access Public
router.put("/:id", (req, res) => {
  let id = req.params.id;
  //{ name: req.body.name } // {new: true} return updated element
  User.findByIdAndUpdate(id, { $set: req.body }, { new: true })
    .then(user => res.json(user))
    .catch(er =>
      res.status(404).json({
        success: false,
        parmitem: req.params.id,
        bodyitem: req.body._id
      })
    );
});

// @route  DELETE api/users/:id
// @desc   Delete an User
// @access Public
router.delete("/:id", (req, res) => {
  User.findById(req.params.id)
    .then(user =>
      user.remove().then(() => res.json({ success: true, user: req.params.id }))
    )
    .catch(er => res.status(404).json({ success: false, user: req.params.id }));
});

module.exports = router;
