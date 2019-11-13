import axios from 'axios';
import qs from 'qs';
import env from '../../../config/environment';

/**
 * @description acquire OAuth access to for the app
 * @param  {string} code
 */
export async function acquireOAuthAccess(code: string) {
  const res = await axios.post(
    'https://slack.com/api/oauth.access',
    qs.stringify({
      code,
      client_id: env.CLIENT_ID,
      client_secret: env.CLIENT_SECRET,
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );

  if (!res.data.ok) {
    throw new Error(`Could not authorize. ${res.data.error}`);
  }

  return res;
}
