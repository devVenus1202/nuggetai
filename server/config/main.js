require('dotenv').config();

const nodeEnv = process.env.NODE_ENV;

const mongoURI = {
  development: process.env.MONGODB_LOCAL_URI,
  dev: process.env.MONGODB_DEV_URI,
  sandbox_dev: process.env.MONGODB_SANDBOX_DEV_URI,
  sandbox: process.env.MONGODB_SANDBOX_URI,
  staging: process.env.MONGODB_STAGING_URI,
  production: process.env.MONGODB_PROD_URI,
};

module.exports = {
  // Secret key for JWT signing and encryption
  secret: 'secret key',
  // Database connection information
  database: mongoURI[nodeEnv],
  // Setting port for server
  port: 8081,
  // Configuring Mailgun API for sending transactional email
  mailgun_priv_key: 'mailgun private key here',
  // Configuring Mailgun domain for sending transactional email
  mailgun_domain: 'mailgun domain here',
  // Mailchimp API key
  mailchimpApiKey: 'mailchimp api key here',
  // SendGrid API key
  sendgridApiKey: 'sendgrid api key here',
  // Stripe API key
  stripeApiKey: 'stripe api key goes here',
  // necessary in order to run tests in parallel of the main app
  test_port: 3001,
  test_db: 'nugget-test-db',
  test_env: 'test',
};
