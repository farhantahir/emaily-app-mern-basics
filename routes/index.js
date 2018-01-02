const prefix = '/api';
module.exports = (app) => {
    require('./auth')(app, prefix);
    require('./payments')(app,prefix);
    require('./surveys')(app,prefix);  
    app.get('/api/current_user', (req, res) => {
      res.send(req.user);
    });
};
