const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const app = express();

mongoose.connect(keys.mongoDBConnection);

require('./models/User');
require('./models/Survey');
require('./services/passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(cookieSession({
  maxAge: 30*24*60*60*1000, // 30days age
  keys: [keys.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

require('./routes/index')(app);

if(process.env.NODE_ENV === "production") {
  // server static files form client/build folder
  app.use(express.static('client/build'));
  // if any react routes like surveys etc comes which this express server has no idea what to do
  // return index html
  const path = require('path');
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
