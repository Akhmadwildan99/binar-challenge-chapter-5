const express = require('express')
const app = express();
const expressLayouts = require('express-ejs-layouts');
const { body, validationResult, check } = require('express-validator');
const router = require('./utility/router');
const dataUsers = require('./data/dataUser.json');
const {findUserName, findUserPassword, addDataUser} = require('./utility/login');
const port = 8081

// Gunakan ejs
app.set('view engine', 'ejs');

// Built-in Midleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(router);

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
app.post('/game', [
    body('nama').custom((value)=>{
        const findName = findUserName(value);
        if(!findName){
            throw new Error('Username tidak valid!');
        }
        return true;
    }),
    body('password').custom((value)=>{
        const findPassword = findUserPassword(value); 
        if(!findPassword){
            throw new Error('Password tidak valid!');
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
            res.redirect('/game');
        }
    });

// Halaman Sign-up

app.get('/sign-up', (req, res)=>{
    res.render('signup',{
        title: 'Halaman Sign-Up',
        css: 'css/login.css',
        layout: 'layouts/main-layouts'
    });
});

// Proses Sign-UP

app.post('/log_in',  [
    body('nama').custom((value)=>{
        const findName = findUserName(value);
        if(findName){
            throw new Error('Username sudah digunakan!');
        }
        return true;
    }),
    check('email', 'Email tidak valid!').isEmail(),
    check('password')
    .isLength({ min: 5 })
    .withMessage('Password harus berisi minimal lima karakter!')
    .matches(/\d/)
    .withMessage('Harus terdapat karakter angka untuk proteksi!')
    ], 
    (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        // return res.status(400).json({ errors: errors.array() });
        res.render('signup',{
            layout: 'layouts/main-layouts',
            title: 'Halaman Sign-Up',
            css: 'css/login.css',
            errors: errors.array()
        });
    } else {
        addDataUser(req.body);
        res.redirect('/log_in');
    }
}
);

// Rest API

app.get('/dataUsers', (req, res)=>{
    res.status(200)
    .json(dataUsers);
});


app.get('/dataUsers/:nama', (req, res)=>{
    const dataUser = dataUsers.find(user => user.id == req.params.id);
    res.status(200)
    .json(dataUser);
});



app.delete('/dataUsers/:nama', (req, res)=>{
    const dataUser = dataUsers.filter(user => user.nama !== req.params.nama);
    res.status(200)
    .json(dataUser);
});


// error Handling

app.use((err, req, res, next)=>{
    res.status(500);
    res.render('err', {
        title: 'Halaman error',
        css: 'css/error.css',
        layout: 'layouts/main-layouts'
    });
});

app.use((req, res, next)=>{
    res.status(404);
    res.render('notfound', {
        title: 'Halaman error',
        css: 'css/error.css',
        layout: 'layouts/main-layouts'
    });
});



app.listen(port, () =>{
    console.log(`Server ini berjalan di http://localhost:${port}`)
});

