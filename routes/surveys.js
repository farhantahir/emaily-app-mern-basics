const mongoose = require('mongoose');
const _ = require("lodash");
const Path = require("path-parser");
const {URL} = require("url");
const isAuthenticated = require('../middlewares/isAuthenticated');
const checkCredits = require('../middlewares/checkCredits');
const Mailer = require('../services/emails/Mailer');
const surveyEmailTemplate = require('../services/emails/emailTemplates/surveyEmail');

const Survey = mongoose.model('Survey');

module.exports = (app,prefix="api") => {
  app.post(`${prefix}/surveys`, isAuthenticated, checkCredits, async (req, res) => {
    const {title, subject, body, recipients}  = req.body;
    const recipientsObjects = recipients.split(',').map(recipient => ({ email: recipient.trim() }));
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipientsObjects,
      _user: req.user.id,
      dateSent: Date.now()
    });
    const template = surveyEmailTemplate(survey);
    const mailer = new Mailer(survey, template);
    try {
      await survey.save();
      await mailer.send();
      req.user.credits-=1;
      const user = await req.user.save();
      res.send(user);
    }catch(error){
      res.status(420).send(err);
    }

  });

  app.get(`surveys/:surveyId/:choice`, (req, res) => {
    res.send('Thanks for the response!')
  });

  app.post(`${prefix}/surveys/webhooks`, (req, res)=> {
    const pathParser = new Path("/surveys/:surveyId/:choice");
    _.chain(req.body)
      .map(({url, email}) => {
        const match = pathParser.test(new URL(url).pathname);
        if(match) return {email, surveyId: match.surveyId, choice: match.choice};
      })
      .compact()
      .unionBy("email", "surveyId")
      .each(({surveyId, email, choice}) => {
                Survey.updateOne({
                    _id: surveyId,
                    recipients:{
                      $elemMatch: {
                        email,
                        responded: false,
                      }
                    }
                  },
                  {
                    $inc: {[choice]: 1}, // increament choice that would be yes or no with 1
                    $set: { "recipients.$.responded": true},
                    lastResponded:new Date()
                  }
                ).exec();
      })
      .value();
      res.send({});
  });

  app.get(`${prefix}/surveys/`,isAuthenticated , async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id })
                    .select({recipients: false});
    res.send(surveys);
  });

};
