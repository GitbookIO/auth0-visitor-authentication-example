const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;
const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string', // retrieve it from the environment or enter it here
  baseURL: 'http://localhost:3000',
  clientID: 'clientId copied from Auth0 application', // retrieve it from the environment or enter it here
  issuerBaseURL: 'issuerBaseURL copied from Auth0 application' // retrieve it from the environment or enter it here
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

const gitbookSignKey = 'gitbook signing key' // retrieve it from the environment or enter it here

app.get('/', (req, res) => {
 if (req.oidc.isAuthenticated()) {
    const token = jwt.sign({}, gitbookSignKey, { expiresIn: '1h' });
    const redirectURL = `https://example-url.gitbook.io/example/?jwt_token=${token}`;
    res.redirect(redirectURL);
 }
 else {
    res.redirect('/login')
 }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});