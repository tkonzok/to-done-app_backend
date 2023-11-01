import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from "./routes/index.js";
import taskRouter from "./routes/taskRouter.js";
import apiRouter from "./routes/apiRouter.js";
import compression from "compression";
import helmet from "helmet";
import RateLimit from "express-rate-limit";

import 'dotenv/config';
import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import mongoose from "mongoose";
mongoose.set("strictQuery", false);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mongoDb = process.env.MONGODB_URI;
mongoose.connect(mongoDb);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
}

const app = express();
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
});

app.set('port', 8080);
app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "pug");

app.use(limiter);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  helmet.contentSecurityPolicy({

    directives: {
      "scipt-src": ["'self'", "code.jquery.com", "code.jsdelivr.net"],
    },
  }),
);

app.use('/', indexRouter);
app.use('/tasks', taskRouter);
app.use('/api', apiRouter);

app.listen(8080, () => console.log("app listening on port 8080!"));