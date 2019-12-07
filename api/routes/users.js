const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../model/User');
const key = require('../config/keys').secret;


/**
 * @route POST api/users/register
 * @description Register user
 * @access Public
 */

router.post('/register', (req, res) => {
    let {
        name,
        username,
        email,
        password,
        userType
    } = req.body
    User.findOne({ username: username }).then(user => {
        if (user) {
            return res.send('Username is already taken.');
        } else {
            User.findOne({ email: email }).then(user => {
                if (user) {
                    return res.send('Email is already taken.');
                } else {
                    let newUser = new User({
                        name: name,
                        username: username,
                        email: email,
                        password: password,
                        userType: userType
                    })

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) {
                                throw err;
                            } else {
                                newUser.password = hash;
                                newUser.save().then(user => {
                                    res.send('You are now registered!');
                                    console.log("Successfully Registered.");
                                });
                            }
                        })

                    })
                }

            });
        }
    })
});

router.post('/login', (req, res) => {
    console.log(req.body)
    User.findOne({ username: req.body.data.uname }).then(user => {
        console.log(user)
        if (!user) {
            return res.send('Account not found!')
        } else {
            bcrypt.compare(req.body.data.password, user.password).then(match => {
                if (match) {
                    const payload = {
                        _id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email,
                        userType: user.userType,
                    }
                    jwt.sign(payload, key, {
                        expiresIn: 604800
                    }, (err, token) => {
                        if (err) {
                            res.status(400).json({
                                msg: "Error!",
                                success: false
                            });
                        } else {
                            console.log("Successfully Login.");
                            return res.send({
                                status: 200,
                                mgs:"Successfully logged in!",
                                success: true,
                                token: token,
                                userInfo : user,
                                userType: user.userType
                            });
                        }
                    });
                
                    console.log('exists')
                } else {
                    return res.send("Password is incorrect!");
                }
            })
            .catch((error)=>{
                console.log(error)
            })
        }
    })
});

router.get('/profile', passport.authenticate('jwt',
    {
        session: false
    }), (req, res) => {
        return res.json({
            user: req.user
        });
    }

);

router.put('/account', (req, res) => {
    console.log(req.body)
    username = req.body.username;
    newName = req.body.name;
    newPassword = req.body.password;
    const text = async function() {
        const update = await User.updateUser(username, newName, bcrypt.hashSync(newPassword, 10))
        res.send(await User.getUserByUsername(username))
    }
    text();
})

module.exports = router;

