const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const webUrl = process.env.WEB_URL;
const sender = process.env.SENDGRID_SENDER;

exports.sendMail = async function({ to, from, subject, text, html }) {
  const msg = {
    to,
    from: sender,
    subject: 'Sending with Twilio SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>'
  };

  await sgMail.send(msg);
};

exports.sendVerifyEmail = async function({ to, token, name }) {
  const msg = {
    to,
    from: sender,
    subject: 'We’re happy you’re with us!',
    templateId: 'd-ebacaf2001aa481c800615ad30db0ae9',
    text: 'Hello plain world!',
    html: '<p>Hello HTML world!</p>',
    dynamic_template_data: {
      name: name,
      link: `${webUrl}/verify-user/${token}`
    }
  };

  await sgMail.send(msg);
};

exports.sendResetPasswordEmail = async function({ to, token, name }) {
  const msg = {
    to,
    from: sender,
    subject: 'Reset your password',
    templateId: 'd-7a51ffedeba04ee0b0d96b2d481b7623',
    text: 'Hello plain world!',
    html: '<p>Hello HTML world!</p>',
    dynamic_template_data: {
      name: name,
      link: `${webUrl}/password-reset/${token}`
    }
  };

  await sgMail.send(msg);
};

exports.sendAccountDeletionEmail = async function({ to, name }) {
  const msg = {
    to,
    from: sender,
    subject: 'We’re sad to see you go!',
    templateId: 'd-d0000d9c1beb4ff7b9710b8a763268a3',
    text: 'Hello plain world!',
    html: '<p>Hello HTML world!</p>',
    dynamic_template_data: {
      name: name
    }
  };
  await sgMail.send(msg);
};
