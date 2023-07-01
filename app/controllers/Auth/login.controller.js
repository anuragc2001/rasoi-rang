const User = require('../../models/user.model');
const bcrypt = require('bcryptjs');
const passport = require('passport');

getLogin = (req, res) => {
    res.render('login', { title: 'Cooking Blog - Login' });
    }

postLogin = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/submit-recipe',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
    }

getRegister = (req, res) => {
    res.render('register', { title: 'Cooking Blog - Register' });
    }

postRegister = (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];
    
    if(!name || !email || !password || !password2){
        errors.push({ msg: 'Please fill in all fields.' });
    }

    if(password !== password2){
        errors.push({ msg: 'Passwords do not match.' });
    }

    if(password.length < 6){
        errors.push({ msg: 'Password should be at least 6 characters.' });
    }

    if(errors.length > 0){
        res.render('register', { title: 'Cooking Blog - Register', errors, name, email, password, password2 });
    } else {
        User.findOne({ email: email })
        .then(user => {
            if(user){
                errors.push({ msg: 'Email is already registered.' });
                res.render('register', { title: 'Cooking Blog - Register', errors, name, email, password, password2 });
            } else {
                const newUser = new User({
                    name,
                    email,
                    password
                });
                
                bcrypt.genSalt(10, (err, salt) => 
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        
                        newUser.password = hash;
                        
                        newUser.save()
                        .then(user => {
                            req.flash('success_msg', 'You are now registered and can log in.');
                            res.redirect('/login');
                        })
                        .catch(err => console.log(err));
                }))
            }
        });
    }
    }

getLogout = (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out.');
    res.redirect('/login');
    }

module.exports = {
    getLogin,
    postLogin,
    getRegister,
    postRegister,
    getLogout
}