const express = require('express');
const hbs = require('hbs'); 
const app = express();
const fs = require('fs');

hbs.registerPartials(__dirname + "/views/partials");
app.set('view engine', 'hbs');


app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log);

    fs.appendFileSync('server.log', log + "\n");
    next();
}); 

// app.use((req, res, next) => {
//     res.render('maintenance');
// });

app.use(express.static(__dirname + "/public"));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home', {
        pageTitle : "Home",
        welcomeMessage : "Welcome to my brand new node site" 
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        pageTitle : "About Us",
    });
});

app.get('/hello', (req, res) => {
    res.render('hello');
});


app.listen(3000, ()=>{
    console.log('Listening on port 3000');
});