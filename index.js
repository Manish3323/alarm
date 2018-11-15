const express = require('express'),
          app = express(),
          template = require('./views/template'),
          path = require('path'),
          fs = require('fs')
// Serving static files
app.use('/assets', express.static(path.resolve(__dirname, 'assets')));
app.use('/media', express.static(path.resolve(__dirname, 'media')));

// hide powered by express
app.disable('x-powered-by');
// start the server
app.listen(3000);

// our apps data model
// const data = require('./assets/data.json');

let initialState = {
  isFetching: false
}

//SSR function import
const ssr = require('./views/server');

// server rendered home page
app.get('/', (req, res) => {
  const { preloadedState, content}  = ssr(initialState)
  const response = template("Server Rendered Page", preloadedState, content)
  res.setHeader('Cache-Control', 'assets, max-age=604800')
  res.send(response);
});
app.get('/getAlarms',(req, res)=> {
  var filepath = __dirname + '/data/alarms.json';
  console.log(filepath);
  var file = fs.readFileSync(filepath, 'utf8');
  var json = JSON.parse(file);
  console.log(json);
  res.json(json)
})
// Pure client side rendered page
app.get('/client', (req, res) => {
  let response = template('Client Side Rendered page')
  res.setHeader('Cache-Control', 'assets, max-age=604800')
  res.send(response);
});

// tiny trick to stop server during local development

  app.get('/exit', (req, res) => {
    if(process.env.PORT) {
      res.send("Sorry, the server denies your request")
    } else {
      res.send("shutting down")
      process.exit(0)
    }

  });