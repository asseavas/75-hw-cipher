import express from 'express';
import ciphersRouter from './routes/ciphers';
import cors, {CorsOptions} from 'cors';

const app = express();
const port = 8000;

const whitelist = ['http://localhost:5173']
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (origin && whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions));
app.use(express.json());
app.use('/ciphers', ciphersRouter);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

