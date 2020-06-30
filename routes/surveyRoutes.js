const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url'); // nodejs integrated module (doesn't need to npm installed)
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const requireCredits = require('../middleware/requireCredits');
const Mailer = require('../services/Mailer')
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
  // current user is available on req
  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find(
      { _user: req.user.id },
      { recipients: false }
    );
    res.send(surveys);
  })

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for your feedback!')
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice'); // create model of what is to be extracted

    // req.body contains email, url, & others
    _.chain(req.body)
      .map((event) => {
        const pathname = new URL(event.url).pathname; // extract path from url
        // use model to test the path and
        // if it finds surveyId and choice it puts them in an object
        // otherwise it returns null
        const match = p.test(pathname); // assign test results to match
        if (match) {
          return { email: event.email, surveyId: match.surveyId, choice: match.choice }
        }
      })
      .compact() // removes any 'undefined' objects in the array
      .uniqBy('email', 'surveyId') // remove duplicates
      .each(({surveyId, email, choice}) => {
        Survey.updateOne({
          _id: surveyId,
          recipients: {
            $elemMatch: { email: email, responded: false} // element matching
          }
        },{
          $inc: { [choice]: 1 }, // increment
          $set: {'recipients.$.responded': true }, // set $elemMatch.responded to true
          lastResponded: new Date()
        }).exec(); // execute mongo query
      })
      .value();

    res.send({});
  });


  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    // Send an email
    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      await mailer.send(); // sendgrid (send email)
      await survey.save(); // mongoose
      req.user.credits -= 1;
      const user = await req.user.save(); // mongoose

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
}