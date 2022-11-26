const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const {isGuest} = require('../middlewares/guards')


router.get('/register', isGuest(), (req, res) => {
    res.render('user/register');
})

router.post('/register',
    body('username', 'Username is required!'),
    body('email', 'Email is required!').isEmail().withMessage('Invalid email!'),
    //.isAlphanumeric().withMessage('Email must contain only english letters and digits!')
    body('password', 'Password is required!').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long!')
    .bail().isAlphanumeric().withMessage('Password must contain only english letters and digits!'),
    body('rePass', 'Repeat password, please!').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords don\'t match!')
        }
        return true
        //.matches(/[a-zA-Z0-9]/) is the same like isAlphanumeric(), but isAlphanumeric works
    }),
    isGuest(),
    async (req, res) => {

        const { errors } = validationResult(req);
        try {

            if (errors.length > 0) {
                const message = errors.map(e=> e.msg).join('\n');
                throw new Error(message)
            }
            console.log(errors);
            await req.auth.register(req.body.email, req.body.username, req.body.password);
            console.log(req.auth);
            res.redirect('/');
        } catch (err) {

            const ctx = {
                errors: err.message.split('\n'),
                userData: {
                    username: req.body.username,
                    email: req.body.email
                }
            }


            res.render('user/register', ctx)
        }

    })

router.get('/login', isGuest(),(req, res) => {
    res.render('user/login');
})
router.post('/login', isGuest(),async (req, res) => {

    try {

        await req.auth.login(req.body.username, req.body.password);
        res.redirect('/');

    } catch (err) {

        const ctx = {
            errors: [err.message],
            userData: {
                username: req.body.username,

            }
        }
        console.log(err.message);
        res.render('user/login', ctx);
    }

})

router.get('/logout', (req, res)=>{
    req.auth.logout();
    res.redirect('/');
})

module.exports = router;