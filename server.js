const express = require('express');
const hbs     = require('hbs');


var port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('streamIt', (text) => {
  return text.toUpperCase();
});


app.use((req, res, next) => {
  var now = new Date().toString();

  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  next();
});

// app.use((req,res,next) => {
//   res.render('maintenace.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req,res) => {
    res.render('home.hbs',{
      Title: 'Home Page',
      welcomeMsg:'Welcome to my site'
    });
});

app.get('/about', (req,res) => {
    res.render('about.hbs',{
      Title:'About Page',
    });
});

app.get('/bad', (req,res) => {
    res.send({
      error:'Unable to find the page'
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
