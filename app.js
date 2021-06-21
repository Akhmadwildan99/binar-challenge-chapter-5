const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts');
const port = 3000

// Gunakan ejs
app.set('view engine', 'ejs');

// Built-in Midleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

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



app.listen(port, () =>{
    console.log(`listen ini berjalan di port ${port}`)
});

