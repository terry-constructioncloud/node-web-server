const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const app = express();

app.set('view engine', 'hbs');

app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', `${log}\n`);
  next();
});

app.use((req, res, next) => {
  res.render('maintenance');
});
app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'home page',
    welcome: 'OK',
    currentYear: new Date().getFullYear()
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page',
    currentYear: new Date().getFullYear()
  });
});

app.get('/bad', (req, res) => {
  res.send({
    error: 'error'
  })
})
app.listen(3000, () => {
  console.log('server is up on 3000');
});
