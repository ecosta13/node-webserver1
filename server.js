const express = require('express');
const hbs =  require('hbs');

const fs = require('fs');

// the PORT env is set by heroku
// otherwise use the default  3000
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname +'/views/partials');
app.set('view engine','nbs');
app.use(express.static(__dirname + '/public'));
console.log('Server Running');
app.use((req, res, next) => {
  var now = new Date().toString();
  console.log(now);
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '/n', (err)=>{
    if (err) {
      console.log('Unable to append to server.log.');
    }
  });
  next();
});

app.use((req,res,next)=> (
  res.render('maintaince.hbs')
))

hbs.registerHelper('getCurrentYear',() => {
  return new Date().getFullYear()
});
app.get('/old', (req,res) => {
  // res.send('<h1>Express is Listening ...</h1>');
  res.send({
    name: 'Terac',
    likes: [
      'strategies',
      'risk control',
      'positionsizing'
    ]
  });
});
app.get('/',(req,res) => {
  // res.send('<h2>Terac Lives Here</h2');
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome - Terac lives here'
  });
});
app.get('/about',(req,res) => {
  // res.send('<h2>Terac Lives Here</h2');
  res.render('about.hbs',{
    pageTitle: 'About Page1'
  });
});
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
app.get('/bad', (req,res) => {
  // res.send('<h1>Express is Listening ...</h1>');
  res.send({
  NobodyHome: 'Out for the day'

  });
});
