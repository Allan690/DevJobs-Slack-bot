import crypto from 'crypto';
import { Request } from 'express';
import env from './config/environment';

const timingSafeCompare = require('tsscmp');
const isVerified = (req: Request) => {
  const signature = req.headers['x-slack-signature'];
  const timestamp = req.headers['x-slack-request-timestamp'];
  const hmac = crypto.createHmac('sha256', env.SLACK_SIGNING_SECRET);
  const [version, hash] = (signature as string).split('=');

    // Check if the timestamp is too old
  const fiveMinutesAgo = ~~(Date.now() / 1000) - (60 * 5);
  if (parseInt(timestamp as string) < fiveMinutesAgo) return false;

  hmac.update(`${version}:${timestamp}:${req.rawBody}`);

    // check that the request signature matches expected value
  return timingSafeCompare(hmac.digest('hex'), hash);
};

module.exports = { isVerified };
