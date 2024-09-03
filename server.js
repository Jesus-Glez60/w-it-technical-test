const express = require('express');
const passport = require('passport');
const session = require('express-session');
const { init: initAuth } = require('./auth');
const path = require('path');

const app = express();

const port = process.env.PORT || 8080;

app.disable('x-powered-by');

app.use(express.static(path.join(__dirname, 'public')));

const db = require('./app/models');
db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.set('views',  __dirname + '/app/views');

app.set('view engine', 'pug');

initAuth();
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res) => {
    res.render('login');
    }
);

require('./app/routes/index.routes')(app);

app.use((req, res) => {
    res.status(404).send({ message: 'Route' + req.url + ' Not found.' });
})

app.listen(port, () => {
    console.log('Server is running on port', port);
    });