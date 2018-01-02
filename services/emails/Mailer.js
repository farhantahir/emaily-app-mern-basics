const keys = require('../../config/keys');
const sendGrid = require('sendgrid');
const {mail:Helper} = sendGrid;

class Mailer extends Helper.Mail {
  constructor({ subject, recipients }, content){
    super();
    this.sgAPI = sendGrid(keys.sendGridKey);
    this.from_email = new Helper.Email('no-reply@email.com');
    this.subject = subject;
    this.body = new Helper.Content('text/html',content);
    this.recipients = this.formatAddresses(recipients);
    this.addContent(this.body);
    this.addClickTracking();
    this.addRecipients();
  }
  formatAddresses(recipients){
    return recipients.map(({email}) => {
      return new Helper.Email(email);
    });
  }
  addClickTracking(){
    const trackingSettings  = new Helper.TrackingSettings();
    const clickTracking = new Helper.ClickTracking(true,true);
    trackingSettings.setClickTracking(clickTracking);
  }
  addRecipients(){
    const personalize = new Helper.Personalization();
    this.recipients.map(recipient=>{
        personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  }

  async send() {
    const request = this.sgAPI.emptyRequest({
      method: 'post',
      path:'/v3/mail/send',
      body:this.toJSON()
    });
    const response = await this.sgAPI.API(request);
    return response;
  }
}

module.exports = Mailer;
