/* const mongoose = require('mongoose'); */
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

//const DB = "mongodb://appDev:Dev2020!@113.161.86.105:2727/isms";
/* const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection successful!')); */

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
