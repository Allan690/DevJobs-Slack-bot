import mongoose from 'mongoose';
import env from '../config/environment';

const options = {
  reconnectTries: 100,
  reconnectInterval: 500,
  poolSize: 10,
  bufferMaxEntries: 0,
  useNewUrlParser: true,
  useCreateIndex: true,
};

/**
 * Establish database connection
 */
const connectDb = () => mongoose.connect(env.DATABASE_URL, options);

export default connectDb;
