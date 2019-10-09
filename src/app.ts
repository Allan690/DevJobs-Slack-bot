require("dotenv").config();
import express from "express";
import { logger } from "./index";
import bodyParser from "body-parser";
import routes from "./controllers";
const app = express();


const rawBodyBuffer = (
  req: express.Request,
  res: express.Response,
  buf: any,
  encoding: any
) => {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || "utf8");
  }
};

app.use(bodyParser.urlencoded({verify: rawBodyBuffer, extended: true }));
app.use(bodyParser.json({ verify: rawBodyBuffer }));
app.use(express.json());
// set base url for api
routes(app);

app.use('*', (req, res) => res.status(404).json({
  message: 'Not Found. Use /api/v1 to access the api'
}));

app.listen(5000, () => {
  logger.log("Application running at port 5000...");
});

export default app;
