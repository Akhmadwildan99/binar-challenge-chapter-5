const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts');
const { body, validationResult } = require('express-validator');
const {findUserName, findUserPassword} = require('./utility/login')
const port = 3000

// Gunakan ejs
app.set('view engine', 'ejs');

// Built-in Midleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

// third party midlleware
app.use(expressLayouts);

// Render Halaman pertama

app.get('/', (req, res)=>{
    res.render('landingPage', {
        title: 'Halaman Home Page',
        css: 'css/landingPage.css',
        layout: 'layouts/main-layouts'
    });
});

// Halaman Trial Game
app.get('/game', (req, res)=>{
    res.render('game', {
        title: 'Trial Game',
        css: 'css/game.css',
        layout: 'layouts/main-layouts',
    });
});

// Halaman Log-in
app.get('/log_in', (req, res)=>{
    res.render('login', {
        title: 'Halaman Login',
        css: 'css/login.css',
        layout: 'layouts/main-layouts'
    })
});

// Proses Log in
app.post('/', [
    body('nama').custom((value,)=>{
        const findName = findUserName(value);
        if(!findName){
            throw new Error('USername confirmation does not match name');
        }
        return true;
    }),
    body('password').custom((value)=>{
        const findPassword = findUserPassword(value); 
        if(!findPassword){
            throw new Error('Password confirmation does not match Password');
        }
        return true;
    })
    ],
    (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            // return res.status(400).json({ errors: errors.array() });
            res.render('login',{
                layout: 'layouts/main-layouts',
                title: 'Halaman login',
                css: 'css/login.css',
                errors: errors.array()
            });
        } else {
            // res.send('ok');
            res.redirect('/');
        }
    });



app.listen(port, () =>{
    console.log(`listen ini berjalan di port ${port}`)
});

