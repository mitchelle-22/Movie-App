const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Database = require('../../database');
const dotenv = require('dotenv');
const path = require('path');
const { route } = require('../../app');
const dirname = __dirname.slice(0, __dirname.search("api/routes"))

dotenv.config({path: path.join(dirname, '.env')});

const maxAge = 60*60*12;

const createToken = (email) => {
    return jwt.sign({email}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: maxAge
    })
}

var postgres = new Database();

router.get('/logout', (req, res) => {
    console.log(req.cookies)
    res.cookie('jwt', '', {maxAge:1})
    res.status(200).json({
        token: req.cookie
    })

})
             
router.post('/register', (req, res, next) => {
    return new Promise((resolve, reject) => {
        let user = "'"+req.body.email_address+"'";
        let name = "'"+req.body.full_names+"'";
        let user_pass = "'"+req.body.password+"'";

        const checkEmail = `moviespot_schema.fn_email_address_exists(${user})`;
        postgres.callFnWithResultsAdd(checkEmail)
        .then((data) => {
            
            let emailExists = data.data[0].fn_email_address_exists;
            
            if(emailExists){
                res.status(401).json({
                    message: 'email exists',
                    emailExists: data
                });
            }else{
                const oldEmail = `moviespot_schema.fn_register_with_old_email(${user},${user_pass})`;
                const token = createToken(user);

                postgres.callFnWithResultsAdd(oldEmail)
                .then((data) => {
                    let oldUser = data.data[0].fn_register_with_old_email;
                    if(oldUser){
                        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });

                        res.status(201).json({
                            message: 'Welcome back',
                            emailExists: data,
                            user: token
                        });
                    }else{
                        const functionName = `moviespot_schema.fn_user_registration(${user}, ${name}, ${user_pass})`;

                        postgres.callFnWithResultsAdd(functionName)
                        .then((data) => {
                        console.log(data);

                        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });

                        res.status(201).json({
                                message: 'Newly Added user',
                                addedUser: data,
                                user: token
                            });
                            resolve(data);

                        })
                        .catch((error) => {
                            console.log(error);
                            res.status(500).json({
                                message: error,
                                error: error,
                                status: false
                            });
                            reject(error);
                        })
                    }
                })

            }


            resolve(data)
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                message: error,
                error: error,
                status: false
            });
            reject(error);
        })
    })
});

//login
router.post('/login', (req, res, next) => {
    return new Promise((resolve, reject) => {
        let user = "'"+req.body.email_address+"'";
        let user_pass = "'"+req.body.password+"'";

        const loginFn = `moviespot_schema.fn_user_logintest(${user},${user_pass})`;

        postgres.callFnWithResultsAdd(loginFn)
        .then((data) => {
            console.log(data);
            let loggedIn = data.data[0].fn_user_logintest;

            if(loggedIn){
                res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
                res.status(201).json({
                    message: 'User logged in',
                    loginUser: data,
                    message: data,
                    user: token
                });
            }else{
                res.status(401).json({
                    message: 'Incorrect login details',
                    addedUser: data
                });
            }
            
            resolve(data);

        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                message: error,
                error: error,
                status: false
            });
            reject(error);
        })
    })
});     


//Delete account
router.patch('/deleteAccount', (req, res, next) => {
    return new Promise((resolve, reject) => {

        let user = "'"+req.body.email_address+"'";

        const deleteFN = `moviespot_schema.fn_delete_account(${user})`;

        postgres.callFnWithResultsAdd(deleteFN)
        .then((data) => {
            console.log(data);
   
            res.status(201).json({
                message: 'Delete API ran successfully',
                cancelled: data
            });
            resolve(data);

        })
        .catch((error) => {

            console.log(error);
            res.status(500).json({
                message: 'bad Request',
                error: error,
                status: false
            });
            reject(error);
        })
    })
});


module.exports = router;