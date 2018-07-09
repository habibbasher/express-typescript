import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as expressValidator from 'express-validator';
import * as session from 'express-session';
import * as helmet from 'helmet';
import * as mongoose from 'mongoose';
import * as mongo from 'connect-mongo';
import * as logger from 'morgan';
import * as bluebird from 'bluebird';

import { validateEnvVariables } from './config/env.conf';
import { mongooseConfig } from './config/mongoose.conf';
(<any>mongoose).Promise = bluebird;

import { PostRoutes } from './routes/posts/PostRoutes';
import { UserRoutes } from './routes/users/UserRoutes';

const postRoutes = new PostRoutes();
const userRoutes = new UserRoutes();

class Index {
  // set app to be of type express.Application
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  // application config
  public config(): void {

    validateEnvVariables();
    mongooseConfig(mongoose);
    const MongoStore = mongo(session);

    // express middleware
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    this.app.use(logger('dev'));
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(expressValidator());
    this.app.use(cors());

    // cors
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
      res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS',
      );
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials',
      );
      res.header('Access-Control-Allow-Credentials', 'true');
      next();
    });

    this.app.use(session({
      resave: true,
      saveUninitialized: true,
      secret: process.env.SESSION_SECRET,
      store: new MongoStore({
        url: process.env.MONGO_URI,
        autoReconnect: true
      })
    }));

  }

  // application routes
  public routes(): void {
    const router: express.Router = express.Router();

    this.app.use('/', router);
    this.app.use('/api/v1/posts', postRoutes.router);
    this.app.use('/api/v1/users', userRoutes.router);
  }
}

// export
export default new Index().app;