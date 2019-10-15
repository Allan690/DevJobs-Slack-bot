import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import routes from './controllers';
const app = express();

const rawBodyBuffer = (
  req: express.Request,
  res: express.Response,
  buf: any,
  encoding: any
) => {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8');
  }
};

if (app.get('env') !== 'test') app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ verify: rawBodyBuffer, extended: true }));
app.use(bodyParser.json({ verify: rawBodyBuffer }));
app.use(express.json());
// set base url for api
routes(app);

app.use('*', (req, res) => res.status(404).json({
  message: 'Not Found. Use /api/v1 to access the api'
}));

export default app;
