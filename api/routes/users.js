const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../model/User');
const key = require('../config/keys').secret;
const multer = require('multer');


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
                                mgs: "Successfully logged in!",
                                success: true,
                                token: token,
                                userInfo: user,
                                userType: user.userType
                            });
                        }
                    });

                    console.log('exists')
                } else {
                    return res.send("Password is incorrect!");
                }
            })
                .catch((error) => {
                    console.log(error)
                })
        }
    })
});

// router.get('/profile', passport.authenticate('jwt',
//     {
//         session: false
//     }), (req, res) => {
//         return res.json({
//             user: req.user
//         });
//     }

// );

router.get('/profile/:token', (req, res) => {
    let token = req.params.token
    jwt.verify(token, key, (err, decode) => {
        if (err) {
            res.status(401).send(err)
        } else {
            res.json({
                id: decode._id,
                name: decode.name,
                type: decode.userType,
                username: decode.username,
                email: decode.email
            })
        }
    })
})



router.put('/account', (req, res) => {
    // console.log("Token is:" + req.body.token);
    // console.log("New name is: " + req.body.name);
    let token = req.body.token;
    let name = req.body.name;
    let reqPass = req.body.password;
    console.log(reqPass);

    jwt.verify(token, key, (err, decode) => {
        if (err) {
            res.status(401).send(err)
        } else {
            const payload = {
                _id: decode._id,
                name: name,
                username: decode.username,
                email: decode.email,
                password: reqPass,
                userType: decode.userType,
            }

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(payload.password, salt, (err, hash) => {
                    if (err) {
                        throw err;
                    } else {
                        payload.password = hash;
                        console.log("New name is: " + name)
                        User.findByIdAndUpdate(decode._id, { $set: { name: name, password: payload.password } }, { new: true }, (err, saved) => {
                            if (err) {
                                console.log(err);
                                res.status(500).send({
                                    success: false,
                                    token: token
                                })
                            } else {
                                jwt.sign(payload, key, {
                                    expiresIn: 604800
                                }, (err, token1) => {
                                    if (err) {
                                        res.status(400).send({
                                            success: false,
                                            msg: "Error"
                                        })
                                    }
                                    console.log("New token is: " + token1)
                                    res.status(200).send({
                                        success: true,
                                        token: token1
                                    })
                                    // console.log(token)
                                    // res.status(200).send({
                                    //     success: true,
                                    //     token: token
                                    // })

                                })


                            }
                        })

                    }
                })

            })

        }

    })
})

    
    



    module.exports = router;
