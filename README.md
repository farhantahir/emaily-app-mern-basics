### Install
```zsh
npm install && npm install --prefix client
```
### Development Configuration

Create a file "dev.js" in /config and paste the following configuration keys with appropriate values.
```javascript
module.exports = {
  googleClientID: 'YOUR_GOOGLE_PLUS_ID',
  googleClientSecret: 'YOUR_GOOGLE_PLUS_SECRET_KEY',
  mongoDBConnection:'mongodb://localhost:27017/YOUR_DATABASE_NAME',
  cookieKey:'YOUR_COOKIE_KEY',
  stripePublicKey: 'YOUR_STRIPE_PUBLIC_KEY',
  stripeSecretKey: 'YOUR_STRIPE_SECRET_KEY',
  sendGridKey: 'YOUR_SEND_GRID_API_KEY',
  redirectDomain:'YOUR_LOCAL_DEVELOPMENT_SERVER_ADDRESS'
};
```
### Run the application

To start the application run the following command.
```zsh
npm run dev
```
