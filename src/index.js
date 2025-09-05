require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '127.0.0.1';

connectDB().then(() => {
  app.listen(PORT, HOST, ()=> console.log(`KYC backend running at http://${process.env.BIND_IP || '172.17.117.243'}:${PORT}`));
}).catch(err=>{
  console.error('DB connect failed', err);
});
